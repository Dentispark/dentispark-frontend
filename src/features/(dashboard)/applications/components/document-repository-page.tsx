"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { DocumentUploadCard } from "./document-upload-card";
import { DocumentUploadModal } from "./document-upload-modal";
import { useModal } from "@/src/hooks/use-modal";
import { useState } from "react";

interface UploadedFile {
  name: string;
  uploadedAt: Date;
  size: number;
}

export function DocumentRepositoryPage() {
  const router = useRouter();
  const { showModal, hideModal } = useModal();

  // State to track uploaded files for each document type
  const [uploadedFiles, setUploadedFiles] = useState<{
    personalStatement?: UploadedFile;
    transcripts?: UploadedFile;
    workExperience?: UploadedFile;
  }>({});

  const breadcrumbItems = [
    { label: "Application", href: "/applications" },
    { label: "Document Repository", isActive: true },
  ];

  const handleCustomBack = () => {
    router.push("/applications");
  };

  const openUploadModal = (documentType: string) => {
    showModal({
      modalTitle: "",
      bodyContent: (
        <DocumentUploadModal
          documentType={documentType}
          onCancel={hideModal}
          onConfirm={(file: File) => {
            // Create uploaded file object
            const uploadedFile: UploadedFile = {
              name: file.name,
              uploadedAt: new Date(),
              size: file.size,
            };

            // Update the appropriate uploaded file state
            setUploadedFiles((prev) => ({
              ...prev,
              [getDocumentKey(documentType)]: uploadedFile,
            }));

            hideModal();
            console.log(`Uploaded ${documentType}:`, uploadedFile);
          }}
        />
      ),
      action: () => {},
      actionTitle: "",
      className: "rounded-[18px]",
      secondaryAction: hideModal,
      secondaryActionTitle: "Cancel",
      type: "document-upload",
      size: "lg",
      isCustomContent: true,
    });
  };

  const getDocumentKey = (documentType: string): keyof typeof uploadedFiles => {
    switch (documentType) {
      case "Personal Statement":
        return "personalStatement";
      case "Transcripts":
        return "transcripts";
      case "Work Experience":
        return "workExperience";
      default:
        return "personalStatement";
    }
  };

  const showDeleteModal = (documentType: string) => {
    showModal({
      modalTitle: "Deleting a document?",
      modalTitleClassName: "text-center",
      bodyContent:
        "This action is irreversible; once the file is deleted, it cannot be restored.",
      action: () => {
        // Perform the actual deletion
        setUploadedFiles((prev) => ({
          ...prev,
          [getDocumentKey(documentType)]: undefined,
        }));
        console.log(`${documentType} file deleted`);
        // TODO: Implement actual file deletion logic on server
      },
      actionTitle: "Delete",
      secondaryAction: hideModal,
      secondaryActionTitle: "Cancel",
      type: "delete-document",
      size: "md",
      isCustomContent: false,
      isDestructive: true,
    });
  };

  const handleDeleteFile = (documentType: string) => {
    showDeleteModal(documentType);
  };

  const handlePersonalStatementUpload = () => {
    openUploadModal("Personal Statement");
  };

  const handleTranscriptsUpload = () => {
    openUploadModal("Transcripts");
  };

  const handleWorkExperienceUpload = () => {
    openUploadModal("Work Experience");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Breadcrumb items={breadcrumbItems} onBack={handleCustomBack} />
        </motion.div>

        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-color mb-8 text-2xl font-semibold"
        >
          Document Repository
        </motion.h1>

        {/* Document Upload Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 md:grid-cols-3 2xl:grid-cols-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <DocumentUploadCard
              title="Personal Statement"
              uploadedFile={uploadedFiles.personalStatement}
              onUpload={handlePersonalStatementUpload}
              onDelete={() => handleDeleteFile("Personal Statement")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <DocumentUploadCard
              title="Transcripts"
              uploadedFile={uploadedFiles.transcripts}
              onUpload={handleTranscriptsUpload}
              onDelete={() => handleDeleteFile("Transcripts")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <DocumentUploadCard
              title="Work Experience"
              uploadedFile={uploadedFiles.workExperience}
              onUpload={handleWorkExperienceUpload}
              onDelete={() => handleDeleteFile("Work Experience")}
            />
          </motion.div>
        </motion.div>

        {/* Footer spacing */}
        <div className="h-16" />
      </div>
    </div>
  );
}
