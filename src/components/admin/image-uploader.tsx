"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { toast } from "sonner";

export function ImageUploader({
  value,
  onChange,
  folder,
  aspect = "aspect-video",
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  aspect?: string;
  label?: string;
}) {
  const [isUploading, setIsUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const result = await adminApi.upload(file, folder);
      onChange(result.url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>{label}</label>}
      <div
        className={`relative ${aspect} w-full rounded-xl overflow-hidden group cursor-pointer`}
        style={{ background: "var(--surface-hover)", border: "1px dashed var(--border)" }}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <>
            <Image src={value} alt="" fill sizes="400px" className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <span className="text-white text-xs font-medium">Click to replace</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange(""); }}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ color: "var(--text-muted)" }}>
            {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            <span className="text-xs">{isUploading ? "Uploading..." : "Click to upload image"}</span>
          </div>
        )}
        {isUploading && value && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
