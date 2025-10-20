"use client";

interface ChatDateSeparatorProps {
  date: string;
}

export function ChatDateSeparator({ date }: ChatDateSeparatorProps) {
  return (
    <div className="flex items-center justify-center py-4">
      <span className="font-sora bg-greys-100 text-greys-700 rounded-full px-4 py-1.5 text-xs font-medium">
        {date}
      </span>
    </div>
  );
}
