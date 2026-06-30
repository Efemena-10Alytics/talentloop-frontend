"use client";

import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { EnrollmentDocument } from "@/hooks/useEnrollmentData";

type Category = "cv" | "cover_letter" | "other";

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "cv", label: "CV" },
  { value: "cover_letter", label: "Cover Letter" },
  { value: "other", label: "Other" },
];

interface FileUploadSectionProps {
  onUploaded: (doc: EnrollmentDocument) => void;
}

export default function FileUploadSection({ onUploaded }: FileUploadSectionProps) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState<Category>("cv");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", category);

      const res = await fetch("/api/enrollment/documents", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();

      if (!res.ok) {
        toast({ variant: "error", title: "Upload failed", description: json.message || "An error occurred" });
        return;
      }

      toast({ variant: "success", title: "Uploaded!", description: `${file.name} uploaded successfully` });
      onUploaded(json.data);
      setSelectedFile(null);
    } catch {
      toast({ variant: "error", title: "Upload failed", description: "An error occurred" });
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div className="space-y-4">
      {/* Category selector */}
      <div className="flex items-center gap-3">
        <span className="text-[#95ACCB] font-mona-sans text-sm">Category:</span>
        <div className="flex gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value)}
              className="px-4 py-1.5 rounded-[100px] text-sm font-mona-sans transition-all"
              style={{
                background: category === opt.value ? "#A2CE3A" : "rgba(21,99,116,0.15)",
                border: category === opt.value ? "none" : "1px solid rgba(255,255,255,0.1)",
                color: category === opt.value ? "#121212" : "#95ACCB",
                fontWeight: category === opt.value ? 600 : 400,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={`rounded-[10px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
          isDragging ? "bg-[#1a2229]" : "bg-[#151A20]"
        }`}
        style={{ height: "200px", border: `2px dashed ${isDragging ? "#A2CE3A" : "#546881"}` }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <div className="text-center px-4">
          <div className="text-5xl mb-3">📂</div>
          {selectedFile ? (
            <p className="text-white font-mona-sans text-sm font-medium mb-1">{selectedFile.name}</p>
          ) : (
            <p className="text-[#7e848a] font-sora text-base mb-1">Drop files here or click to browse</p>
          )}
          <p className="text-[#7e848a] font-sora text-xs">CV, Cover Letter, or any career document · Max 10MB · PDF, DOCX</p>
        </div>
      </div>

      {/* Upload button */}
      {selectedFile && (
        <button
          onClick={() => upload(selectedFile)}
          disabled={uploading}
          className="w-full h-11 rounded-lg font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "#A2CE3A", color: "#121212" }}
        >
          {uploading ? "Uploading..." : `Upload as ${CATEGORY_OPTIONS.find(o => o.value === category)?.label}`}
        </button>
      )}
    </div>
  );
}
