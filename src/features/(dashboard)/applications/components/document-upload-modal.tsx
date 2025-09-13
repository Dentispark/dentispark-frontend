"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DocumentUploadModalProps {
  documentType: string;
  onCancel: () => void;
  onConfirm: (file: File) => void;
}

type UploadState = "initial" | "uploading" | "uploaded";

export function DocumentUploadModal({
  documentType, // eslint-disable-line @typescript-eslint/no-unused-vars
  onCancel,
  onConfirm,
}: DocumentUploadModalProps) {
  const [uploadState, setUploadState] = useState<UploadState>("initial");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than 5MB. Current size: ${formatFileSize(file.size)}`;
    }

    // Check file type
    const allowedTypes = [".pdf", ".doc", ".docx", ".png"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return "Only PDF, DOC, DOCX, and PNG files are allowed.";
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    // Clear previous error
    setError(null);

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setUploadState("uploading");

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        setUploadProgress(100);
        setTimeout(() => {
          setUploadState("uploaded");
          clearInterval(interval);
        }, 500);
      } else {
        setUploadProgress(Math.round(progress));
      }
    }, 200);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
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

  const handleClickToUpload = () => {
    setError(null); // Clear any existing error
    fileInputRef.current?.click();
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onConfirm(selectedFile);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    setUploadState("initial");
    setUploadProgress(0);
    setError(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
  };

  const UploadBox = () => {
    return (
      <div
        className={`border-greys-300 relative rounded-[24px] border border-dashed bg-white p-8 text-center transition-all duration-200 ${
          isDragOver ? "border-primary bg-primary-50" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center space-y-4">
          <svg
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" width="48" height="48" rx="24" fill="#E7F7F1" />
            <path
              d="M32.7959 19.455L27.5459 14.205C27.4415 14.1004 27.3174 14.0174 27.1808 13.9608C27.0442 13.9042 26.8978 13.875 26.75 13.875H17.75C17.2527 13.875 16.7758 14.0725 16.4242 14.4242C16.0725 14.7758 15.875 15.2527 15.875 15.75V32.25C15.875 32.7473 16.0725 33.2242 16.4242 33.5758C16.7758 33.9275 17.2527 34.125 17.75 34.125H31.25C31.7473 34.125 32.2242 33.9275 32.5758 33.5758C32.9275 33.2242 33.125 32.7473 33.125 32.25V20.25C33.125 19.9519 33.0066 19.6659 32.7959 19.455ZM29.6562 19.5H27.5V17.3438L29.6562 19.5ZM18.125 31.875V16.125H25.25V20.625C25.25 20.9234 25.3685 21.2095 25.5795 21.4205C25.7905 21.6315 26.0766 21.75 26.375 21.75H30.875V31.875H18.125ZM27.5459 25.0791C27.7573 25.2904 27.876 25.5771 27.876 25.8759C27.876 26.1748 27.7573 26.4615 27.5459 26.6728C27.3346 26.8842 27.0479 27.0029 26.7491 27.0029C26.4502 27.0029 26.1635 26.8842 25.9522 26.6728L25.625 26.3438V29.25C25.625 29.5484 25.5065 29.8345 25.2955 30.0455C25.0845 30.2565 24.7984 30.375 24.5 30.375C24.2016 30.375 23.9155 30.2565 23.7045 30.0455C23.4935 29.8345 23.375 29.5484 23.375 29.25V26.3438L23.0459 26.6737C22.8346 26.8851 22.5479 27.0038 22.2491 27.0038C21.9502 27.0038 21.6635 26.8851 21.4522 26.6737C21.2408 26.4624 21.1221 26.1758 21.1221 25.8769C21.1221 25.578 21.2408 25.2913 21.4522 25.08L23.7022 22.83C23.8067 22.7251 23.9309 22.6419 24.0676 22.5851C24.2044 22.5283 24.351 22.4991 24.4991 22.4991C24.6471 22.4991 24.7937 22.5283 24.9305 22.5851C25.0672 22.6419 25.1914 22.7251 25.2959 22.83L27.5459 25.0791Z"
              fill="#12AC75"
            />
          </svg>

          <div className="space-y-2">
            <p className="font-sora text-sm text-gray-600">
              <button
                onClick={handleClickToUpload}
                className="text-primary hover:underline"
              >
                Click here
              </button>{" "}
              to upload your file or drag.
            </p>
            <p className="font-sora text-xs text-gray-500">
              Supports: PDF, DOCx, PNG (5mb each)
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          accept=".pdf,.doc,.docx,.png"
          onChange={handleFileChange}
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {uploadState === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <UploadBox />

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-200 bg-red-50 p-3"
              >
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="ml-2 text-sm text-red-600">{error}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {uploadState === "uploading" && selectedFile && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <UploadBox />

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">
                Uploading file
              </p>

              <div className="flex items-center space-x-3 rounded-[24px] border border-[#EBEBEB] bg-white p-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 17V11L7 13" fill="#12AC75" />
                  <path
                    d="M9 17V11L7 13"
                    stroke="#12AC75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11L11 13"
                    stroke="#12AC75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                    stroke="#12AC75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                    stroke="#12AC75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sora text-xs text-gray-900">
                      {selectedFile.name}
                    </span>
                    <button
                      onClick={handleDeleteFile}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 5.97656C17.67 5.64656 14.32 5.47656 10.98 5.47656C9 5.47656 7.02 5.57656 5.04 5.77656L3 5.97656"
                          fill="#2E2E2E"
                        />
                        <path
                          d="M21 5.97656C17.67 5.64656 14.32 5.47656 10.98 5.47656C9 5.47656 7.02 5.57656 5.04 5.77656L3 5.97656"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.8504 9.14062L18.2004 19.2106C18.0904 20.7806 18.0004 22.0006 15.2104 22.0006H8.79039C6.00039 22.0006 5.91039 20.7806 5.80039 19.2106L5.15039 9.14062"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.3301 16.5H13.6601"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 12.5H14.5"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="my-3 flex items-center space-x-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sora text-xs text-gray-500">
                      {formatFileSize(selectedFile.size)}
                    </span>
                    <span className="font-sora text-xs text-gray-500">
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled
                className="cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-500"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        )}

        {uploadState === "uploaded" && selectedFile && (
          <motion.div
            key="uploaded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <UploadBox />

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">
                Uploading file
              </p>

              <div className="flex items-center space-x-3 rounded-[24px] border border-[#EBEBEB] bg-white p-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 17V11L7 13" fill="#12AC75" />
                  <path
                    d="M9 17V11L7 13"
                    stroke="#12AC75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11L11 13"
                    stroke="#12AC75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                    stroke="#12AC75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                    stroke="#12AC75"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sora text-xs text-gray-900">
                      {selectedFile.name}
                    </span>
                    <button
                      onClick={handleDeleteFile}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 5.97656C17.67 5.64656 14.32 5.47656 10.98 5.47656C9 5.47656 7.02 5.57656 5.04 5.77656L3 5.97656"
                          fill="#2E2E2E"
                        />
                        <path
                          d="M21 5.97656C17.67 5.64656 14.32 5.47656 10.98 5.47656C9 5.47656 7.02 5.57656 5.04 5.77656L3 5.97656"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.8504 9.14062L18.2004 19.2106C18.0904 20.7806 18.0004 22.0006 15.2104 22.0006H8.79039C6.00039 22.0006 5.91039 20.7806 5.80039 19.2106L5.15039 9.14062"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.3301 16.5H13.6601"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 12.5H14.5"
                          stroke="#2E2E2E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="my-3 flex items-center space-x-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <div className="bg-primary h-2 w-full rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sora text-xs text-gray-500">
                      {formatFileSize(selectedFile.size)}
                    </span>
                    <span className="font-sora text-xs text-gray-500">
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-primary hover:bg-primary-600 rounded-lg px-4 py-2 text-sm font-medium text-white"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
