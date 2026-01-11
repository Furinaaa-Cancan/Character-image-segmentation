"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Eraser, Paintbrush, RotateCcw, Check, ZoomIn, ZoomOut } from "lucide-react";

interface ImageEditorProps {
  imageUrl: string;
  originalUrl: string;
  onSave: (editedBlob: Blob) => void;
  onClose: () => void;
}

export function ImageEditor({ imageUrl, originalUrl, onSave, onClose }: ImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<"eraser" | "brush">("eraser");
  const [brushSize, setBrushSize] = useState(20);
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // 加载图片到canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
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
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // 撤销
  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prevState = history[historyIndex - 1];
    ctx.putImageData(prevState, 0, 0);
    setHistoryIndex(historyIndex - 1);
  }, [history, historyIndex]);

  // 获取canvas坐标
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // 绘制
  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);

    if (tool === "eraser") {
      // 橡皮擦 - 清除为透明
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // 画笔 - 从原图恢复
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = originalUrl;
      
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(tempCanvas, 0, 0);
      ctx.restore();
    }
  }, [isDrawing, tool, brushSize, originalUrl]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    draw(e);
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
        className="bg-[#FDF8F3] rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
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
        <div className="flex items-center gap-4 mb-4 p-3 bg-[#F5EDE4] rounded-xl">
          {/* 工具选择 */}
          <div className="flex gap-2">
            <button
              onClick={() => setTool("eraser")}
              className={`p-2 rounded-lg transition-colors ${
                tool === "eraser" ? "bg-[#D4845A] text-white" : "hover:bg-[#E5D9CA] text-[#8B7355]"
              }`}
              title="橡皮擦 - 擦除多余部分"
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTool("brush")}
              className={`p-2 rounded-lg transition-colors ${
                tool === "brush" ? "bg-[#D4845A] text-white" : "hover:bg-[#E5D9CA] text-[#8B7355]"
              }`}
              title="画笔 - 恢复误删部分"
            >
              <Paintbrush className="w-5 h-5" />
            </button>
          </div>

          <div className="w-px h-6 bg-[#E5D9CA]" />

          {/* 画笔大小 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8B7355]">大小:</span>
            <input
              type="range"
              min="5"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-24 accent-[#D4845A]"
            />
            <span className="text-sm text-[#3D2E24] w-8">{brushSize}</span>
          </div>

          <div className="w-px h-6 bg-[#E5D9CA]" />

          {/* 缩放 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              className="p-1.5 hover:bg-[#E5D9CA] rounded-lg transition-colors text-[#8B7355]"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-[#3D2E24] w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.25))}
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
        <div className="flex-1 overflow-auto bg-[#E5D9CA]/30 rounded-xl p-4 flex items-center justify-center"
          style={{ 
            backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            className="max-w-full max-h-full cursor-crosshair"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: "center"
            }}
          />
        </div>

        {/* 操作提示 */}
        <p className="text-sm text-[#8B7355] mt-3 text-center">
          {tool === "eraser" ? "使用橡皮擦擦除多余的背景部分" : "使用画笔恢复误删的人物部分"}
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
