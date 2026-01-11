"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Eraser, Paintbrush, RotateCcw, Check, ZoomIn, ZoomOut, Move } from "lucide-react";

interface ImageEditorProps {
  imageUrl: string;
  originalUrl: string;
  onSave: (editedBlob: Blob) => void;
  onClose: () => void;
}

export function ImageEditor({ imageUrl, originalUrl, onSave, onClose }: ImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  
  const [tool, setTool] = useState<"eraser" | "brush" | "move">("eraser");
  const [brushSize, setBrushSize] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  // 预加载原图
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      originalImageRef.current = img;
    };
    img.src = originalUrl;
  }, [originalUrl]);

  // 加载处理后的图片到canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // 限制最大尺寸以提高性能
      const maxSize = 1200;
      let width = img.width;
      let height = img.height;
      
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      // 保存初始状态
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialState]);
      setHistoryIndex(0);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // 保存当前状态到历史
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(currentState);
      // 限制历史记录数量
      if (newHistory.length > 20) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 19));
  }, [historyIndex]);

  // 撤销
  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const prevIndex = historyIndex - 1;
    const prevState = history[prevIndex];
    if (prevState) {
      ctx.putImageData(prevState, 0, 0);
      setHistoryIndex(prevIndex);
    }
  }, [history, historyIndex]);

  // 获取canvas坐标
  const getCanvasCoords = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  // 计算点到线段的距离
  const pointToLineDistance = useCallback((point: { x: number; y: number }, lineStart: { x: number; y: number }, lineEnd: { x: number; y: number }) => {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // 绘制线段（更平滑的笔触）
  const drawLine = useCallback((from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;

    if (tool === "eraser") {
      // 橡皮擦 - 使用destination-out混合模式
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    } else if (tool === "brush") {
      // 画笔 - 从原图恢复
      const originalImg = originalImageRef.current;
      if (!originalImg) return;

      // 创建临时canvas存储原图对应区域
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);

      // 使用剪切路径恢复原图
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.lineWidth = brushSize;
      ctx.stroke();

      // 获取路径区域并从原图复制
      const minX = Math.max(0, Math.min(from.x, to.x) - brushSize);
      const minY = Math.max(0, Math.min(from.y, to.y) - brushSize);
      const maxX = Math.min(canvas.width, Math.max(from.x, to.x) + brushSize);
      const maxY = Math.min(canvas.height, Math.max(from.y, to.y) + brushSize);
      
      const regionWidth = maxX - minX;
      const regionHeight = maxY - minY;
      
      if (regionWidth > 0 && regionHeight > 0) {
        // 获取当前canvas和原图的该区域数据
        const currentData = ctx.getImageData(minX, minY, regionWidth, regionHeight);
        const originalData = tempCtx.getImageData(minX, minY, regionWidth, regionHeight);
        
        // 在笔触区域内恢复原图像素
        for (let y = 0; y < regionHeight; y++) {
          for (let x = 0; x < regionWidth; x++) {
            const canvasX = minX + x;
            const canvasY = minY + y;
            
            // 计算到线段的距离
            const dist = pointToLineDistance(
              { x: canvasX, y: canvasY },
              from,
              to
            );
            
            if (dist <= brushSize / 2) {
              const i = (y * regionWidth + x) * 4;
              currentData.data[i] = originalData.data[i];
              currentData.data[i + 1] = originalData.data[i + 1];
              currentData.data[i + 2] = originalData.data[i + 2];
              currentData.data[i + 3] = originalData.data[i + 3];
            }
          }
        }
        
        ctx.putImageData(currentData, minX, minY);
      }
    }
    
    ctx.restore();
  }, [tool, brushSize, pointToLineDistance]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === "move") {
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    } else {
      const point = getCanvasCoords(e);
      setLastPoint(point);
      // 画一个点
      drawLine(point, point);
    }
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    if (isDrawing && tool !== "move") {
      saveToHistory();
    }
    setIsDrawing(false);
    setLastPoint(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    if (tool === "move") {
      const dx = e.clientX - lastPanPoint.x;
      const dy = e.clientY - lastPanPoint.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    } else {
      const point = getCanvasCoords(e);
      if (lastPoint) {
        drawLine(lastPoint, point);
      }
      setLastPoint(point);
    }
  };

  // 保存编辑结果
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        onSave(blob);
      }
    }, "image/png");
  };

  // 重置视图
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#FDF8F3] rounded-2xl p-6 max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#3D2E24]">编辑分割结果</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#E5D9CA] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#8B7355]" />
          </button>
        </div>

        {/* 工具栏 */}
        <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-[#F5EDE4] rounded-xl">
          {/* 工具选择 */}
          <div className="flex gap-1">
            <button
              onClick={() => setTool("eraser")}
              className={`p-2.5 rounded-lg transition-colors ${
                tool === "eraser" ? "bg-[#D4845A] text-white" : "hover:bg-[#E5D9CA] text-[#8B7355]"
              }`}
              title="橡皮擦 - 擦除多余部分"
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTool("brush")}
              className={`p-2.5 rounded-lg transition-colors ${
                tool === "brush" ? "bg-[#D4845A] text-white" : "hover:bg-[#E5D9CA] text-[#8B7355]"
              }`}
              title="画笔 - 恢复误删部分"
            >
              <Paintbrush className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTool("move")}
              className={`p-2.5 rounded-lg transition-colors ${
                tool === "move" ? "bg-[#D4845A] text-white" : "hover:bg-[#E5D9CA] text-[#8B7355]"
              }`}
              title="移动 - 拖拽画布"
            >
              <Move className="w-5 h-5" />
            </button>
          </div>

          <div className="w-px h-6 bg-[#E5D9CA]" />

          {/* 画笔大小 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8B7355]">大小:</span>
            <input
              type="range"
              min="5"
              max="100"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-28 accent-[#D4845A]"
            />
            <span className="text-sm text-[#3D2E24] w-8">{brushSize}</span>
          </div>

          <div className="w-px h-6 bg-[#E5D9CA]" />

          {/* 缩放 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
              className="p-1.5 hover:bg-[#E5D9CA] rounded-lg transition-colors text-[#8B7355]"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="text-sm text-[#3D2E24] w-14 text-center hover:bg-[#E5D9CA] rounded px-1 py-0.5"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={() => setZoom(Math.min(4, zoom + 0.25))}
              className="p-1.5 hover:bg-[#E5D9CA] rounded-lg transition-colors text-[#8B7355]"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-[#E5D9CA]" />

          {/* 撤销 */}
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 hover:bg-[#E5D9CA] rounded-lg transition-colors text-[#8B7355] disabled:opacity-50"
            title="撤销"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* 画布区域 */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-hidden rounded-xl relative"
          style={{ 
            background: "repeating-conic-gradient(#d0d0d0 0% 25%, #f0f0f0 0% 50%) 50% / 20px 20px"
          }}
        >
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center",
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              className="max-w-none shadow-lg"
              style={{ 
                cursor: tool === "move" ? "grab" : "crosshair",
              }}
            />
          </div>
        </div>

        {/* 操作提示 */}
        <p className="text-sm text-[#8B7355] mt-3 text-center">
          {tool === "eraser" && "橡皮擦：擦除多余的背景部分"}
          {tool === "brush" && "画笔：恢复误删的人物部分"}
          {tool === "move" && "移动：拖拽画布查看细节"}
        </p>

        {/* 底部按钮 */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#8B7355] hover:bg-[#E5D9CA] rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#D4845A] text-white rounded-lg hover:bg-[#C4956A] transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            保存修改
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
