"use client";

import { Check, FileText, Link as LinkIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface Message {
  id: string;
  content?: string;
  timestamp: string;
  isSent: boolean;
  type: "text" | "file" | "link";
  fileData?: {
    name: string;
    size: string;
    type: string;
  };
  linkData?: {
    title: string;
    description: string;
    url: string;
  };
  isDelivered?: boolean;
  isRead?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const renderTextMessage = () => (
    <div
      className={cn(
        "flex items-end gap-3 rounded-2xl px-4 py-3",
        message.isSent
          ? "bg-primary text-white"
          : "text-black-800 border border-gray-200 bg-white",
      )}
    >
      <p className="font-sora flex-1 text-sm">{message.content}</p>
      <div className="flex flex-shrink-0 items-center gap-1.5">
        <span
          className={cn(
            "font-sora text-xs",
            message.isSent ? "text-white/80" : "text-gray-500",
          )}
        >
          {message.timestamp}
        </span>
        {message.isSent && (
          <div className="flex items-center gap-0.5">
            <Check
              className={cn(
                "h-3.5 w-3.5",
                message.isSent ? "text-white" : "text-primary",
              )}
              strokeWidth={2.5}
            />
            {message.isRead && (
              <Check
                className={cn(
                  "-ml-2.5 h-3.5 w-3.5",
                  message.isSent ? "text-white" : "text-primary",
                )}
                strokeWidth={2.5}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderFileMessage = () => (
    <div
      className={cn(
        "w-64 rounded-2xl p-4",
        message.isSent
          ? "bg-primary text-white"
          : "text-black-800 border border-gray-200 bg-white",
      )}
    >
      <div className="mb-2 flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
            message.isSent ? "bg-white/20" : "bg-primary/10",
          )}
        >
          <FileText
            className={cn(
              "h-5 w-5",
              message.isSent ? "text-white" : "text-primary",
            )}
          />
        </div>
        <div className="flex-1">
          <p className="font-sora text-sm font-semibold">
            {message.fileData?.name}
          </p>
          <p
            className={cn(
              "font-sora text-xs",
              message.isSent ? "text-white/80" : "text-gray-500",
            )}
          >
            {message.fileData?.size} • {message.fileData?.type}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1.5">
        <span
          className={cn(
            "font-sora text-xs",
            message.isSent ? "text-white/80" : "text-gray-500",
          )}
        >
          {message.timestamp}
        </span>
        {message.isSent && (
          <div className="flex items-center gap-0.5">
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            {message.isRead && (
              <Check
                className="-ml-2.5 h-3.5 w-3.5 text-white"
                strokeWidth={2.5}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderLinkMessage = () => (
    <div
      className={cn(
        "w-72 rounded-2xl p-4",
        message.isSent
          ? "bg-primary text-white"
          : "text-black-800 border border-gray-200 bg-white",
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h4
            className={cn(
              "font-sora mb-1 text-sm font-semibold",
              message.isSent ? "text-white" : "text-black-800",
            )}
          >
            {message.linkData?.title}
          </h4>
          <p
            className={cn(
              "font-sora text-xs",
              message.isSent ? "text-white/80" : "text-gray-600",
            )}
          >
            {message.linkData?.description}
          </p>
        </div>
        <LinkIcon
          className={cn(
            "ml-2 h-4 w-4 flex-shrink-0",
            message.isSent ? "text-white" : "text-gray-400",
          )}
        />
      </div>
      <a
        href={message.linkData?.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "font-sora mb-2 block truncate text-xs underline",
          message.isSent ? "text-white" : "text-primary",
        )}
      >
        {message.linkData?.url}
      </a>
      <div className="flex items-center justify-end gap-1.5">
        <span
          className={cn(
            "font-sora text-xs",
            message.isSent ? "text-white/80" : "text-gray-500",
          )}
        >
          {message.timestamp}
        </span>
        {message.isSent && (
          <div className="flex items-center gap-0.5">
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            {message.isRead && (
              <Check
                className="-ml-2.5 h-3.5 w-3.5 text-white"
                strokeWidth={2.5}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "flex w-full",
        message.isSent ? "justify-end" : "justify-start",
      )}
    >
      <div className="flex flex-col gap-0.5">
        {/* Message Content */}
        {message.type === "text" && renderTextMessage()}
        {message.type === "file" && renderFileMessage()}
        {message.type === "link" && renderLinkMessage()}

        {/* Sent Status Label */}
        {message.isSent && (
          <div className="flex items-center justify-end gap-1">
            <Check className="text-primary h-3 w-3" strokeWidth={2.5} />
            <span className="font-sora text-primary text-xs">Sent</span>
          </div>
        )}
      </div>
    </div>
  );
}
