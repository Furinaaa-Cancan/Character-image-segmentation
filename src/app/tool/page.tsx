"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Loader2, X, ImageIcon, Trash2, FileArchive, ArrowLeft, FolderOpen, Settings } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";

type ExportFormat = "png" | "jpg" | "pdf";

interface ImageFile {
  id: string;
  file: File;
  name: string;
  preview: string;
  processed?: string;
  processedBlob?: Blob;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export default function ToolPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [exportFormat, setExportFormat] = useState<ExportFormat>("png");
  const [packAsZip, setPackAsZip] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const validateImage = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(true);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const addImageFile = useCallback((file: File, fileName?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const name = fileName || file.name;
    return {
      id,
      file,
      name,
      preview: URL.createObjectURL(file),
      status: "pending" as const,
    };
  }, []);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return;
    
    const newImages: ImageFile[] = [];
    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|bmp)$/i.test(file.name)) {
        const isValid = await validateImage(file);
        if (isValid) {
          newImages.push(addImageFile(file));
        } else {
          console.warn(`跳过无效图片: ${file.name}`);
        }
      }
    }
    
    setImages((prev) => [...prev, ...newImages]);
  }, [addImageFile, validateImage]);

  const handleZipUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.name.endsWith('.zip')) return;

    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(file);
    const newImages: ImageFile[] = [];

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];
    
    for (const [filename, zipEntry] of Object.entries(zip.files)) {
      if (zipEntry.dir) continue;
      const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
      if (!imageExtensions.includes(ext)) continue;

      const blob = await zipEntry.async('blob');
      const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : `image/${ext.slice(1)}`;
      const imageFile = new File([blob], filename.split('/').pop() || filename, { type: mimeType });
      
      // 验证图片是否有效
      const isValid = await validateImage(imageFile);
      if (isValid) {
        newImages.push(addImageFile(imageFile, filename.split('/').pop()));
      }
    }

    setImages((prev) => [...prev, ...newImages]);
  }, [addImageFile, validateImage]);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length === 1 && files[0].name.endsWith('.zip')) {
        await handleZipUpload(files);
      } else {
        handleFileSelect(files);
      }
    },
    [handleFileSelect, handleZipUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.preview);
        if (img.processed) URL.revokeObjectURL(img.processed);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.preview);
      if (img.processed) URL.revokeObjectURL(img.processed);
    });
    setImages([]);
  }, [images]);

  const processImages = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    const pendingImages = images.filter(img => img.status === "pending");
    setProgress({ current: 0, total: pendingImages.length });

    const { removeBackground } = await import("@imgly/background-removal");

    let completed = 0;
    for (const img of pendingImages) {
      setImages((prev) =>
        prev.map((item) =>
          item.id === img.id ? { ...item, status: "processing" } : item
        )
      );

      try {
        const blob = await removeBackground(img.file, {
          progress: (key, current, total) => {
            console.log(`Processing ${key}: ${current}/${total}`);
          },
        });

        const processedUrl = URL.createObjectURL(blob);

        setImages((prev) =>
          prev.map((item) =>
            item.id === img.id
              ? { ...item, status: "done", processed: processedUrl, processedBlob: blob }
              : item
          )
        );
      } catch (error) {
        console.error("Processing error:", error);
        setImages((prev) =>
          prev.map((item) =>
            item.id === img.id
              ? { ...item, status: "error", error: "处理失败" }
              : item
          )
        );
      }
      
      completed++;
      setProgress({ current: completed, total: pendingImages.length });
    }

    setIsProcessing(false);
  };

  const convertToFormat = async (blob: Blob, format: ExportFormat): Promise<Blob> => {
    if (format === "png") return blob;
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        
        if (format === "jpg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((newBlob) => {
          resolve(newBlob || blob);
        }, format === "jpg" ? "image/jpeg" : "image/png", 0.95);
      };
      img.src = URL.createObjectURL(blob);
    });
  };

  const downloadSingle = async (img: ImageFile) => {
    if (!img.processedBlob) return;
    
    const { saveAs } = await import("file-saver");
    const convertedBlob = await convertToFormat(img.processedBlob, exportFormat);
    const ext = exportFormat === "jpg" ? "jpg" : "png";
    saveAs(convertedBlob, `${img.name.split(".")[0]}_分割.${ext}`);
  };

  const downloadAll = async () => {
    const processedImages = images.filter((img) => img.processedBlob);
    if (processedImages.length === 0) return;

    const { saveAs } = await import("file-saver");
    const ext = exportFormat === "jpg" ? "jpg" : "png";

    if (!packAsZip && processedImages.length === 1) {
      downloadSingle(processedImages[0]);
      return;
    }

    if (!packAsZip) {
      // 逐个下载
      for (const img of processedImages) {
        if (img.processedBlob) {
          const convertedBlob = await convertToFormat(img.processedBlob, exportFormat);
          saveAs(convertedBlob, `${img.name.split(".")[0]}_分割.${ext}`);
        }
      }
      return;
    }

    // 打包ZIP
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    
    for (const img of processedImages) {
      if (img.processedBlob) {
        const convertedBlob = await convertToFormat(img.processedBlob, exportFormat);
        zip.file(`${img.name.split(".")[0]}_分割.${ext}`, convertedBlob);
      }
    }
    
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "人物轮廓分割结果.zip");
  };

  const processedCount = images.filter((img) => img.status === "done").length;

  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: "#FDF8F3" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* 返回按钮 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#3D2E24] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </Link>
        </motion.div>

        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-3">
            AI人物轮廓分割
          </h1>
          <p className="text-[#8B7355]">
            上传人像照片，AI自动分割人物轮廓，支持批量处理
          </p>
        </motion.div>

        {/* 上传区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-[#E5D9CA] rounded-2xl p-10 text-center transition-colors hover:border-[#D4845A] hover:bg-[#FFFCF8]"
          >
            {/* 隐藏的input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
            <input
              ref={folderInputRef}
              type="file"
              accept="image/*"
              multiple
              {...({ webkitdirectory: "true", directory: "true" } as React.InputHTMLAttributes<HTMLInputElement>)}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
            <input
              ref={zipInputRef}
              type="file"
              accept=".zip"
              onChange={(e) => handleZipUpload(e.target.files)}
              className="hidden"
            />
            
            <Upload className="w-12 h-12 text-[#C4956A] mx-auto mb-4" />
            <p className="text-lg text-[#3D2E24] font-medium mb-4">
              拖拽图片或ZIP文件到此处
            </p>
            
            {/* 三个上传按钮 */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#F5EDE4] hover:bg-[#E5D9CA] text-[#3D2E24] rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                选择图片
              </button>
              <button
                onClick={() => folderInputRef.current?.click()}
                className="px-4 py-2 bg-[#F5EDE4] hover:bg-[#E5D9CA] text-[#3D2E24] rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                选择文件夹
              </button>
              <button
                onClick={() => zipInputRef.current?.click()}
                className="px-4 py-2 bg-[#F5EDE4] hover:bg-[#E5D9CA] text-[#3D2E24] rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                <FileArchive className="w-4 h-4" />
                上传ZIP
              </button>
            </div>
            
            <p className="text-xs text-[#8B7355] mt-4">
              支持 JPG、PNG、WebP 格式
            </p>
          </div>
        </motion.div>

        {/* 处理进度 */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-[#F5EDE4] rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#3D2E24] font-medium">处理中...</span>
              <span className="text-[#8B7355] text-sm">{progress.current}/{progress.total}</span>
            </div>
            <div className="w-full h-2 bg-[#E5D9CA] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#D4845A] transition-all duration-300"
                style={{ width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* 图片列表 */}
        <AnimatePresence>
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              {/* 操作栏 */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#8B7355]">
                  已选择 {images.length} 张图片
                  {processedCount > 0 && `，已完成 ${processedCount} 张`}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#8B7355] hover:text-[#C97066] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    清空
                  </button>
                </div>
              </div>

              {/* 图片网格 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#F5EDE4] border border-[#E5D9CA]">
                      {/* 显示处理后的图片或原图 */}
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${img.processed || img.preview})`,
                          backgroundColor: img.processed ? "transparent" : undefined,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                      
                      {/* 处理中遮罩 */}
                      {img.status === "processing" && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      )}
                      
                      {/* 错误状态 */}
                      {img.status === "error" && (
                        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                          <span className="text-red-600 text-sm">{img.error}</span>
                        </div>
                      )}
                      
                      {/* 完成标记 */}
                      {img.status === "done" && (
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#8FA67A] flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>

                    {/* 悬停操作 */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.processed && (
                        <button
                          onClick={() => downloadSingle(img)}
                          className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center text-[#3D2E24] hover:bg-white"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeImage(img.id)}
                        className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center text-[#C97066] hover:bg-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 文件名 */}
                    <p className="mt-2 text-xs text-[#8B7355] truncate">
                      {img.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 导出设置 */}
        {processedCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 text-[#8B7355] hover:text-[#3D2E24] transition-colors mb-3"
            >
              <Settings className="w-4 h-4" />
              导出设置
            </button>
            
            {showSettings && (
              <div className="p-4 bg-[#F5EDE4] rounded-xl space-y-4">
                <div>
                  <label className="block text-sm text-[#3D2E24] mb-2">导出格式</label>
                  <div className="flex gap-2">
                    {(["png", "jpg"] as ExportFormat[]).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setExportFormat(fmt)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          exportFormat === fmt
                            ? "bg-[#D4845A] text-white"
                            : "bg-white text-[#3D2E24] hover:bg-[#E5D9CA]"
                        }`}
                      >
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="packZip"
                    checked={packAsZip}
                    onChange={(e) => setPackAsZip(e.target.checked)}
                    className="w-4 h-4 accent-[#D4845A]"
                  />
                  <label htmlFor="packZip" className="text-sm text-[#3D2E24]">
                    打包为ZIP文件
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 操作按钮 */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              size="lg"
              onClick={processImages}
              disabled={isProcessing || images.every((img) => img.status === "done")}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  开始分割
                </>
              )}
            </MagneticButton>

            {processedCount > 0 && (
              <MagneticButton variant="ghost" size="lg" onClick={downloadAll}>
                <Download className="w-5 h-5" />
                {packAsZip ? "下载ZIP" : `下载${processedCount}个文件`}
              </MagneticButton>
            )}
          </motion.div>
        )}

        {/* 空状态 */}
        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <ImageIcon className="w-16 h-16 text-[#E5D9CA] mx-auto mb-4" />
            <p className="text-[#8B7355]">上传图片开始人物轮廓分割</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
