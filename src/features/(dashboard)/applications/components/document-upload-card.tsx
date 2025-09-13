"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface UploadedFile {
  name: string;
  uploadedAt: Date;
  size: number;
}

interface DocumentUploadCardProps {
  title: string;
  uploadedFile?: UploadedFile;
  onUpload?: (file: File) => void;
  onDelete?: () => void;
}

const DocumentIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M53.415 20.585L39.415 6.585C39.2291 6.39933 39.0085 6.2521 38.7657 6.15173C38.5229 6.05135 38.2627 5.99979 38 6H14C12.9391 6 11.9217 6.42143 11.1716 7.17157C10.4214 7.92172 10 8.93913 10 10V54C10 55.0609 10.4214 56.0783 11.1716 56.8284C11.9217 57.5786 12.9391 58 14 58H50C51.0609 58 52.0783 57.5786 52.8284 56.8284C53.5786 56.0783 54 55.0609 54 54V22C54.0002 21.7373 53.9487 21.4771 53.8483 21.2343C53.7479 20.9915 53.6007 20.7709 53.415 20.585ZM40 44H24C23.4696 44 22.9609 43.7893 22.5858 43.4142C22.2107 43.0391 22 42.5304 22 42C22 41.4696 22.2107 40.9609 22.5858 40.5858C22.9609 40.2107 23.4696 40 24 40H40C40.5304 40 41.0391 40.2107 41.4142 40.5858C41.7893 40.9609 42 41.4696 42 42C42 42.5304 41.7893 43.0391 41.4142 43.4142C41.0391 43.7893 40.5304 44 40 44ZM40 36H24C23.4696 36 22.9609 35.7893 22.5858 35.4142C22.2107 35.0391 22 34.5304 22 34C22 33.4696 22.2107 32.9609 22.5858 32.5858C22.9609 32.2107 23.4696 32 24 32H40C40.5304 32 41.0391 32.2107 41.4142 32.5858C41.7893 32.9609 42 33.4696 42 34C42 34.5304 41.7893 35.0391 41.4142 35.4142C41.0391 35.7893 40.5304 36 40 36ZM38 22V11L49 22H38Z"
      fill="#D3D3D3"
    />
  </svg>
);

export function DocumentUploadCard({
  title,
  uploadedFile,
  onUpload,
  onDelete,
}: DocumentUploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const formatUploadDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Uploaded 1 day ago";
    } else {
      return `Uploaded ${diffDays} days ago`;
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleUploadClick = () => {
    if (onUpload) {
      // This will be handled by the parent component to open the modal
      onUpload(new File([], "placeholder"));
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-sora text-text-color text-xs">{title}</h3>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`border-greys-300 relative rounded-lg border pt-8 text-center transition-all duration-200 ${
          isDragOver
            ? "border-primary bg-primary-50"
            : "border-gray-300 bg-gray-50"
        } ${uploadedFile ? "pb-6" : "pb-6"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <DocumentIcon />

          {uploadedFile && (
            <div className="w-full border-t px-3 pt-3">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 pr-3">
                  <p
                    className="font-sora truncate text-sm text-gray-900"
                    title={uploadedFile.name}
                  >
                    {uploadedFile.name}
                  </p>
                  <p className="font-sora mt-1 text-left text-xs text-gray-500">
                    {formatUploadDate(uploadedFile.uploadedAt)}
                  </p>
                </div>

                {onDelete && (
                  <button
                    onClick={onDelete}
                    className="flex-shrink-0 text-red-500 hover:text-red-700"
                    title="Delete file"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 5H4.16667H17.5M6.66667 5V3.33333C6.66667 2.89131 6.84226 2.46738 7.15482 2.15482C7.46738 1.84226 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84226 12.8452 2.15482C13.1577 2.46738 13.3333 2.89131 13.3333 3.33333V5M15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.39131 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16667 17.1087 4.16667 16.6667V5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {!uploadedFile && (
            <button
              onClick={handleUploadClick}
              className="mt-4 inline-flex items-center rounded-sm bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Upload document
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
