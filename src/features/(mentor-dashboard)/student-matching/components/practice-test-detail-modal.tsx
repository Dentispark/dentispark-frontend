"use client";

import { Calendar, Clock } from "lucide-react";

interface PracticeTestDetailModalProps {
  test: {
    title: string;
    category: string;
  };
  score?: number;
  date?: string;
  time?: string;
  fileName?: string;
  onClose: () => void;
}

export function PracticeTestDetailModal({
  test,
  score = 300,
  date = "09/09/2025",
  time = "14:22",
  fileName = "Certification.pdf",
}: PracticeTestDetailModalProps) {
  const handleViewFile = () => {
    console.log("View file:", fileName);
    // TODO: Implement file viewing logic
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="space-y-6 px-2 py-4">
        {/* Header */}
        <div>
          <h2 className="font-sora text-black-800 mb-2 text-xl font-semibold">
            Practice Test Score Details
          </h2>
          <p className="font-sora text-black-800 text-base font-medium">
            {test.category} - {test.title}
          </p>
        </div>

        {/* Score and Time Inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Practice Test Score */}
          <div className="md:col-span-1">
            <label className="font-sora mb-2 block text-sm font-medium text-gray-700">
              Practice Test Score
            </label>
            <input
              type="number"
              value={score}
              readOnly
              className="font-sora focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-xs focus:ring-1 focus:outline-none"
            />
          </div>

          {/* Time Stamp - Date */}
          <div className="md:col-span-1">
            <label className="font-sora mb-2 block text-sm font-medium text-gray-700">
              Time Stamp
            </label>
            <div className="relative">
              <input
                type="text"
                value={date}
                readOnly
                className="font-sora focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-xs focus:ring-1 focus:outline-none"
              />
              <Calendar className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Time Stamp - Time */}
          <div className="md:col-span-1">
            <label className="font-sora mb-2 block text-sm font-medium text-gray-700">
              &nbsp;
            </label>
            <div className="relative">
              <input
                type="text"
                value={time}
                readOnly
                className="font-sora focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-xs focus:ring-1 focus:outline-none"
              />
              <Clock className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Uploaded File */}
        <div>
          <label className="font-sora mb-2 block text-sm font-medium text-gray-700">
            Uploaded file
          </label>
          <div className="border-greys-300 bg-greys-50 flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              {/* PDF Icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.0005 0L36.6665 6.66699V38.7373C36.6664 39.4347 36.1012 40 35.4038 40H4.59619C3.89885 39.9999 3.33358 39.4346 3.3335 38.7373V1.2627C3.33358 0.565357 3.89885 6.95917e-05 4.59619 0H30.0005Z"
                  fill="#FBEAEA"
                />
                <path
                  d="M36.6667 6.66699H29.9998V0L36.6667 6.66699Z"
                  fill="#EB9F9F"
                />
                <rect
                  x="1.66699"
                  y="16.666"
                  width="36.6667"
                  height="16.6667"
                  rx="1.26285"
                  fill="#D32F2F"
                />
                <path
                  d="M10.7356 28.6736V21.3262H13.4909C14.0554 21.3262 14.5289 21.4314 14.9116 21.6419C15.2967 21.8524 15.5873 22.1418 15.7834 22.5101C15.9819 22.876 16.0812 23.2922 16.0812 23.7586C16.0812 24.2298 15.9819 24.6483 15.7834 25.0143C15.5849 25.3802 15.2919 25.6684 14.9044 25.8789C14.517 26.087 14.0398 26.191 13.473 26.191H11.6469V25.0968H13.2936C13.6236 25.0968 13.8939 25.0394 14.1044 24.9246C14.3149 24.8098 14.4703 24.6519 14.5708 24.451C14.6736 24.2501 14.725 24.0193 14.725 23.7586C14.725 23.4979 14.6736 23.2683 14.5708 23.0698C14.4703 22.8712 14.3137 22.717 14.1008 22.607C13.8903 22.4945 13.6189 22.4383 13.2864 22.4383H12.0666V28.6736H10.7356Z"
                  fill="white"
                />
                <path
                  d="M19.7271 28.6736H17.2373V21.3262H19.7773C20.5068 21.3262 21.1335 21.4733 21.6573 21.7675C22.1834 22.0592 22.5876 22.479 22.8699 23.0267C23.1521 23.5744 23.2932 24.2298 23.2932 24.9927C23.2932 25.7581 23.1509 26.4158 22.8663 26.9659C22.5841 27.516 22.1763 27.9382 21.6429 28.2324C21.1119 28.5266 20.4733 28.6736 19.7271 28.6736ZM18.5683 27.522H19.6625C20.1744 27.522 20.6013 27.4287 20.9433 27.2422C21.2853 27.0532 21.5424 26.7722 21.7147 26.3991C21.8869 26.0236 21.973 25.5548 21.973 24.9927C21.973 24.4307 21.8869 23.9643 21.7147 23.5936C21.5424 23.2204 21.2877 22.9418 20.9505 22.7576C20.6156 22.5711 20.1995 22.4778 19.702 22.4778H18.5683V27.522Z"
                  fill="white"
                />
                <path
                  d="M24.5579 28.6736V21.3262H29.2648V22.4419H25.8889V24.4367H28.9419V25.5524H25.8889V28.6736H24.5579Z"
                  fill="white"
                />
              </svg>

              <span className="font-sora text-black-800 text-xs font-medium">
                {fileName}
              </span>
            </div>
            <button
              onClick={handleViewFile}
              className="text-primary font-sora text-sm font-medium hover:underline"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
