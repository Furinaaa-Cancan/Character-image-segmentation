"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Loader2, X, ImageIcon, Trash2, FileArchive, FolderOpen, Settings, Edit2, Sparkles, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ImageEditor } from "@/components/ImageEditor";
import Link from "next/link";

type ExportFormat = "png" | "jpg";

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
  const [progress, setProgress] = useState({ current: 0, total: 0, stage: "" });
  const [exportFormat, setExportFormat] = useState<ExportFormat>("png");
  const [packAsZip, setPackAsZip] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const validateImage = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(img.src); resolve(true); };
      img.onerror = () => { URL.revokeObjectURL(img.src); resolve(false); };
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const addImageFile = useCallback((file: File, fileName?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return { id, file, name: fileName || file.name, preview: URL.createObjectURL(file), status: "pending" as const };
  }, []);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const newImages: ImageFile[] = [];
    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|bmp)$/i.test(file.name)) {
        if (await validateImage(file)) newImages.push(addImageFile(file));
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
      if (await validateImage(imageFile)) newImages.push(addImageFile(imageFile, filename.split('/').pop()));
    }
    setImages((prev) => [...prev, ...newImages]);
  }, [addImageFile, validateImage]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length === 1 && files[0].name.endsWith('.zip')) await handleZipUpload(files);
    else handleFileSelect(files);
  }, [handleFileSelect, handleZipUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) { URL.revokeObjectURL(img.preview); if (img.processed) URL.revokeObjectURL(img.processed); }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach((img) => { URL.revokeObjectURL(img.preview); if (img.processed) URL.revokeObjectURL(img.processed); });
    setImages([]);
  }, [images]);

  const processImages = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    const pendingImages = images.filter(img => img.status === "pending");
    setProgress({ current: 0, total: pendingImages.length, stage: "正在加载AI模型..." });
    const { removeBackground } = await import("@imgly/background-removal");
    let completed = 0;
    for (const img of pendingImages) {
      setProgress(p => ({ ...p, stage: `正在处理: ${img.name}` }));
      setImages((prev) => prev.map((item) => item.id === img.id ? { ...item, status: "processing" } : item));
      try {
        const blob = await removeBackground(img.file, {
          progress: (key, current, total) => {
            if (key === "compute:inference") setProgress(p => ({ ...p, stage: `AI分析中: ${img.name}` }));
            else if (key === "fetch:weights") setProgress(p => ({ ...p, stage: `下载模型: ${Math.round((current/total)*100)}%` }));
          },
        });
        const processedUrl = URL.createObjectURL(blob);
        setImages((prev) => prev.map((item) => item.id === img.id ? { ...item, status: "done", processed: processedUrl, processedBlob: blob } : item));
      } catch (error) {
        console.error("Processing error:", error);
        setImages((prev) => prev.map((item) => item.id === img.id ? { ...item, status: "error", error: "处理失败" } : item));
      }
      completed++;
      setProgress({ current: completed, total: pendingImages.length, stage: "处理完成" });
    }
    setIsProcessing(false);
  };

  const convertToFormat = async (blob: Blob, format: ExportFormat): Promise<Blob> => {
    if (format === "png") return blob;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        if (format === "jpg") { ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((newBlob) => resolve(newBlob || blob), "image/jpeg", 0.95);
      };
      img.src = URL.createObjectURL(blob);
    });
  };

  const downloadSingle = async (img: ImageFile) => {
    if (!img.processedBlob) return;
    const { saveAs } = await import("file-saver");
    const convertedBlob = await convertToFormat(img.processedBlob, exportFormat);
    saveAs(convertedBlob, `${img.name.split(".")[0]}_分割.${exportFormat}`);
  };

  const downloadAll = async () => {
    const processedImages = images.filter((img) => img.processedBlob);
    if (processedImages.length === 0) return;
    const { saveAs } = await import("file-saver");
    if (!packAsZip && processedImages.length === 1) { downloadSingle(processedImages[0]); return; }
    if (!packAsZip) {
      for (const img of processedImages) {
        if (img.processedBlob) {
          const convertedBlob = await convertToFormat(img.processedBlob, exportFormat);
          saveAs(convertedBlob, `${img.name.split(".")[0]}_分割.${exportFormat}`);
        }
      }
      return;
    }
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const img of processedImages) {
      if (img.processedBlob) {
        const convertedBlob = await convertToFormat(img.processedBlob, exportFormat);
        zip.file(`${img.name.split(".")[0]}_分割.${exportFormat}`, convertedBlob);
      }
    }
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "人物轮廓分割结果.zip");
  };

  const processedCount = images.filter((img) => img.status === "done").length;
  const pendingCount = images.filter((img) => img.status === "pending").length;
  const errorCount = images.filter((img) => img.status === "error").length;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%)" }}>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FDF8F3]/80 border-b border-[#E5D9CA]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4845A] to-[#C4956A] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">PC</span>
            </motion.div>
            <span className="text-lg font-semibold text-[#3D2E24]">PosterCraft</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[#8B7355] hover:text-[#D4845A] transition-colors">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">返回首页</span>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4845A]/10 to-[#C4956A]/10 border border-[#D4845A]/20 mb-4">
            <Sparkles className="w-4 h-4 text-[#D4845A]" />
            <span className="text-sm text-[#D4845A] font-medium">AI驱动</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-3">智能人物轮廓分割</h1>
          <p className="text-[#8B7355] max-w-md mx-auto">上传人像照片，AI自动精准分割人物轮廓，支持批量处理</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragOver ? "border-[#D4845A] bg-[#D4845A]/5 scale-[1.02]" : "border-[#E5D9CA] hover:border-[#D4845A]/50 hover:bg-[#FFFCF8]"}`}>
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#D4845A]/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#C4956A]/5 blur-3xl" />
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => handleFileSelect(e.target.files)} className="hidden" />
            <input ref={folderInputRef} type="file" accept="image/*" multiple {...({ webkitdirectory: "true", directory: "true" } as React.InputHTMLAttributes<HTMLInputElement>)} onChange={(e) => handleFileSelect(e.target.files)} className="hidden" />
            <input ref={zipInputRef} type="file" accept=".zip" onChange={(e) => handleZipUpload(e.target.files)} className="hidden" />
            <motion.div animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300 }}>
              <Upload className={`w-14 h-14 mx-auto mb-5 transition-colors ${isDragOver ? "text-[#D4845A]" : "text-[#C4956A]"}`} />
            </motion.div>
            <p className="text-xl text-[#3D2E24] font-medium mb-2">{isDragOver ? "松开鼠标上传" : "拖拽图片或ZIP文件到此处"}</p>
            <p className="text-[#8B7355] mb-6">或点击下方按钮选择文件</p>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 bg-gradient-to-br from-[#D4845A] to-[#C4956A] text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-md shadow-[#D4845A]/20">
                <ImageIcon className="w-4 h-4" />选择图片
              </motion.button>
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => folderInputRef.current?.click()}
                className="px-5 py-2.5 bg-[#FFFCF8] text-[#3D2E24] rounded-xl text-sm font-medium flex items-center gap-2 border border-[#E5D9CA] shadow-sm">
                <FolderOpen className="w-4 h-4" />选择文件夹
              </motion.button>
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => zipInputRef.current?.click()}
                className="px-5 py-2.5 bg-[#FFFCF8] text-[#3D2E24] rounded-xl text-sm font-medium flex items-center gap-2 border border-[#E5D9CA] shadow-sm">
                <FileArchive className="w-4 h-4" />上传ZIP
              </motion.button>
            </div>
            <p className="text-xs text-[#8B7355] mt-5">支持 JPG、PNG、WebP 格式，单张最大 10MB</p>
          </div>
        </motion.div>

        <AnimatePresence>
          {isProcessing && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-8">
              <div className="bg-gradient-to-r from-[#FFFCF8] to-[#F5EDE4] rounded-2xl p-6 border border-[#E5D9CA] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4845A]/10 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-[#D4845A] animate-spin" />
                    </div>
                    <div>
                      <p className="text-[#3D2E24] font-medium">{progress.stage || "处理中..."}</p>
                      <p className="text-xs text-[#8B7355]">首次使用需下载AI模型(~40MB)</p>
                    </div>
                  </div>
                  <span className="text-[#D4845A] font-semibold">{progress.current}/{progress.total}</span>
                </div>
                <div className="w-full h-2.5 bg-[#E5D9CA] rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-[#D4845A] to-[#C4956A] rounded-full" initial={{ width: 0 }} animate={{ width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5 p-4 bg-[#FFFCF8] rounded-xl border border-[#E5D9CA]">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#8B7355]" /><span className="text-sm text-[#8B7355]">全部 {images.length}</span></div>
                  {pendingCount > 0 && <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#D4A84B]" /><span className="text-sm text-[#8B7355]">待处理 {pendingCount}</span></div>}
                  {processedCount > 0 && <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#8FA67A]" /><span className="text-sm text-[#8B7355]">已完成 {processedCount}</span></div>}
                  {errorCount > 0 && <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C97066]" /><span className="text-sm text-[#8B7355]">失败 {errorCount}</span></div>}
                </div>
                <button onClick={clearAll} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#8B7355] hover:text-[#C97066] hover:bg-[#C97066]/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />清空全部
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.03 }} className="relative group">
                    <div className={`aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 ${img.status === "done" ? "border-[#8FA67A]/50 shadow-md" : img.status === "error" ? "border-[#C97066]/50" : img.status === "processing" ? "border-[#D4845A]/50" : "border-[#E5D9CA]"}`}>
                      <div className="absolute inset-0" style={{ background: img.processed ? "repeating-conic-gradient(#f0f0f0 0% 25%, #ffffff 0% 50%) 50% / 12px 12px" : "#F5EDE4" }} />
                      <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${img.processed || img.preview})` }} />
                      {img.status === "processing" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
                          <Loader2 className="w-8 h-8 text-white animate-spin mb-2" /><span className="text-white text-xs">处理中...</span>
                        </motion.div>
                      )}
                      {img.status === "error" && (
                        <div className="absolute inset-0 bg-[#C97066]/20 flex flex-col items-center justify-center">
                          <AlertCircle className="w-8 h-8 text-[#C97066] mb-2" /><span className="text-[#C97066] text-xs font-medium">{img.error}</span>
                        </div>
                      )}
                      {img.status === "done" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 left-2">
                          <div className="w-7 h-7 rounded-full bg-[#8FA67A] flex items-center justify-center shadow-md"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                        </motion.div>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      {img.processed && (
                        <>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setEditingImage(img)} className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center text-[#3D2E24] shadow-md" title="编辑"><Edit2 className="w-4 h-4" /></motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => downloadSingle(img)} className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center text-[#3D2E24] shadow-md" title="下载"><Download className="w-4 h-4" /></motion.button>
                        </>
                      )}
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => removeImage(img.id)} className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center text-[#C97066] shadow-md" title="删除"><X className="w-4 h-4" /></motion.button>
                    </div>
                    <p className="mt-2 text-xs text-[#8B7355] truncate px-1">{img.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {processedCount > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <button onClick={() => setShowSettings(!showSettings)} className="flex items-center gap-2 text-[#8B7355] hover:text-[#3D2E24] transition-colors mb-3">
              <Settings className="w-4 h-4" />导出设置
              <motion.span animate={{ rotate: showSettings ? 180 : 0 }} className="text-xs">▼</motion.span>
            </button>
            <AnimatePresence>
              {showSettings && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-5 bg-[#FFFCF8] rounded-xl border border-[#E5D9CA] space-y-4">
                  <div>
                    <label className="block text-sm text-[#3D2E24] mb-2">导出格式</label>
                    <div className="flex gap-2">
                      {(["png", "jpg"] as ExportFormat[]).map((fmt) => (
                        <button key={fmt} onClick={() => setExportFormat(fmt)} className={`px-4 py-2 rounded-lg text-sm transition-colors ${exportFormat === fmt ? "bg-[#D4845A] text-white" : "bg-white text-[#3D2E24] border border-[#E5D9CA]"}`}>
                          {fmt.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="packZip" checked={packAsZip} onChange={(e) => setPackAsZip(e.target.checked)} className="w-4 h-4 accent-[#D4845A]" />
                    <label htmlFor="packZip" className="text-sm text-[#3D2E24]">打包为ZIP文件</label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {images.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton size="lg" onClick={processImages} disabled={isProcessing || images.every((img) => img.status === "done")}>
              {isProcessing ? (<><Loader2 className="w-5 h-5 animate-spin" />处理中...</>) : (<><ImageIcon className="w-5 h-5" />开始分割</>)}
            </MagneticButton>
            {processedCount > 0 && (
              <MagneticButton variant="ghost" size="lg" onClick={downloadAll}>
                <Download className="w-5 h-5" />{packAsZip ? "下载ZIP" : `下载${processedCount}个文件`}
              </MagneticButton>
            )}
          </motion.div>
        )}

        {images.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-[#E5D9CA] mx-auto mb-4" />
            <p className="text-[#8B7355]">上传图片开始人物轮廓分割</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {editingImage && editingImage.processed && (
          <ImageEditor
            imageUrl={editingImage.processed}
            originalUrl={editingImage.preview}
            onSave={(editedBlob) => {
              const editedUrl = URL.createObjectURL(editedBlob);
              setImages((prev) => prev.map((img) => img.id === editingImage.id ? { ...img, processed: editedUrl, processedBlob: editedBlob } : img));
              setEditingImage(null);
            }}
            onClose={() => setEditingImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
