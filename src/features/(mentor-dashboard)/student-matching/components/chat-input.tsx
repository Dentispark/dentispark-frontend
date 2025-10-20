"use client";

import { useState, useRef } from "react";
import { Paperclip, Send, Smile, X, FileText } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface AttachedFile {
  id: string;
  file: File;
  preview?: string;
}

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  onAttachFile?: () => void;
}

export function ChatInput({ onSendMessage, onAttachFile }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachedFiles.length > 0) {
      const files = attachedFiles.map((af) => af.file);
      onSendMessage(message, files);
      setMessage("");
      setAttachedFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachedFiles: AttachedFile[] = files.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      file,
    }));
    setAttachedFiles([...attachedFiles, ...newAttachedFiles]);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAttachClick = () => {
    if (onAttachFile) {
      onAttachFile();
    }
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles(attachedFiles.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="border-greys-300 mx-auto mt-10 w-full max-w-5xl bg-white">
      <form onSubmit={handleSubmit}>
        {/* Attached Files Preview */}
        {attachedFiles.length > 0 && (
          <div className="mb-4 space-y-2">
            {attachedFiles.map((attachedFile) => (
              <div
                key={attachedFile.id}
                className="bg-greys-50 flex items-center justify-between rounded-lg border border-gray-200 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                    <FileText className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-sora text-black-800 text-sm font-medium">
                      {attachedFile.file.name}
                    </p>
                    <p className="font-sora text-greys-600 text-xs">
                      {formatFileSize(attachedFile.file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(attachedFile.id)}
                  className="text-greys-600 hover:text-error-500 flex-shrink-0 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="bg-greys-50 flex items-start gap-4 rounded-[24px] border border-gray-200 px-6 py-4 shadow-sm">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />

          <button
            type="button"
            onClick={handleAttachClick}
            className="text-black-800 hover:text-black-900 flex-shrink-0 transition-colors"
          >
            <Paperclip className="h-6 w-6" />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="font-sora flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />

          <div className="mt-20 flex items-center gap-2">
            <button
              type="button"
              className="border-greys-300 hover:bg-greys-100 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border bg-white transition-colors"
            >
              <Smile className="text-greys-600 h-5 w-5" />
            </button>

            <Button
              type="submit"
              disabled={!message.trim() && attachedFiles.length === 0}
              className="bg-primary hover:bg-primary/90 flex h-12 flex-shrink-0 items-center gap-2 rounded-full px-6 py-3 text-white disabled:opacity-50"
            >
              <span className="font-sora text-base font-medium">Send</span>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
