"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useModalStore } from "@/src/store/modal-store";
import { ChatMessage, Message } from "./chat-message";
import { ChatDateSeparator } from "./chat-date-separator";
import { ChatInput } from "./chat-input";
import { RatingReviewModal } from "./rating-review-modal";

interface StudentMessagingPageProps {
  className?: string;
  studentId?: string;
}

// Mock student data - will be replaced with API data later
const MOCK_STUDENT = {
  id: "1",
  name: "Daniel Sarabia",
  avatar: "/images/latest-booking.png",
  isOnline: true,
};

// Mock messages data
const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hey x! How are you?",
    timestamp: "10:25",
    isSent: false,
    type: "text",
  },
  {
    id: "2",
    content: "Awesome. Simply awesome, my friend.",
    timestamp: "11:25",
    isSent: true,
    type: "text",
    isRead: true,
  },
  {
    id: "3",
    timestamp: "11:25",
    isSent: true,
    type: "file",
    fileData: {
      name: "Account_report.docx",
      size: "2.5gb",
      type: "docs",
    },
    isRead: true,
  },
  {
    id: "4",
    content: "Awesome. Simply awesome, my friend.",
    timestamp: "11:25",
    isSent: false,
    type: "text",
  },
  {
    id: "5",
    timestamp: "11:25",
    isSent: true,
    type: "link",
    linkData: {
      title: "External Link Title",
      description: "External link description",
      url: "https://www.externallink.com",
    },
    isRead: true,
  },
  {
    id: "6",
    content: "Awesome. Simply awesome, my friend.",
    timestamp: "11:25",
    isSent: false,
    type: "text",
  },
];

export function StudentMessagingPage({
  className,
  studentId = "1",
}: StudentMessagingPageProps) {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const breadcrumbItems = [
    { label: "Student matching", href: "/mentor/student-matching" },
    {
      label: "Student's profile",
      href: `/mentor/student-matching/${studentId}`,
    },
    { label: "Messaging", isActive: true },
  ];

  const handleViewProfile = () => {
    router.push(`/mentor/student-matching/${studentId}`);
  };

  const handleRateStudent = () => {
    openModal({
      modalTitle: "Rating and Review",
      modalTitleClassName: "font-sora text-center",
      bodyContent: (
        <RatingReviewModal
          studentName={MOCK_STUDENT.name}
          onSubmit={(rating, review) => {
            console.log("Rating:", rating, "Review:", review);
            // TODO: Implement API call to submit rating and review
            closeModal();
          }}
          onCancel={closeModal}
        />
      ),
      action: () => {
        // This won't be called since we're using custom content
      },
      actionTitle: "Submit",
      type: "rate-student",
      size: "md",
      isCustomContent: true,
    });
  };

  const handleSendMessage = (content: string, files?: File[]) => {
    // Send text message
    if (content.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isSent: true,
        type: "text",
        isRead: false,
      };
      setMessages([...messages, newMessage]);
    }

    // Send file messages
    if (files && files.length > 0) {
      const fileMessages: Message[] = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isSent: true,
        type: "file",
        fileData: {
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type.split("/")[1] || "file",
        },
        isRead: false,
      }));
      setMessages([...messages, ...fileMessages]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleAttachFile = () => {
    console.log("Attach file");
    // TODO: Implement file attachment logic
  };

  return (
    <div className={cn("min-h-screen bg-white py-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <Breadcrumb items={breadcrumbItems} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="border-greys-300 flex items-center justify-between border-b pb-2"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={MOCK_STUDENT.avatar}
                alt={MOCK_STUDENT.name}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-4">
              <h1 className="font-sora text-black-800 text-lg font-semibold">
                {MOCK_STUDENT.name}
              </h1>
              {MOCK_STUDENT.isOnline && (
                <div className="border-success-200 bg-success-50 bg-success-200/20 flex items-center gap-2 rounded-full border p-1.5">
                  <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                  <span className="text-primary font-sora text-xs">Online</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleRateStudent}
              variant="outline"
              className="font-sora border-greys-300 text-greys-1000 hover:text-greys-1000 h-10 rounded-lg hover:bg-white"
            >
              Rate student
            </Button>
            <Button
              onClick={handleViewProfile}
              className="bg-primary hover:bg-primary/90 font-sora h-10 rounded-lg text-white"
            >
              View profile
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-1 flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-greys-50 flex-1 overflow-y-auto p-6"
          >
            <div className="mx-auto max-w-4xl space-y-4">
              <ChatDateSeparator date="19 August" />

              <ChatMessage message={messages[0]} />
              <ChatMessage message={messages[1]} />
              <ChatMessage message={messages[2]} />

              <ChatDateSeparator date="Today 12:12 AM" />

              <ChatMessage message={messages[3]} />
              <ChatMessage message={messages[4]} />
              <ChatMessage message={messages[5]} />
            </div>
          </motion.div>

          <ChatInput
            onSendMessage={handleSendMessage}
            onAttachFile={handleAttachFile}
          />
        </div>
      </motion.div>
    </div>
  );
}
