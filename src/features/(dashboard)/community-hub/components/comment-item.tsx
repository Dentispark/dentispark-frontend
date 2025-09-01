import { Comment } from "../types";
import Image from "next/image";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex space-x-3">
      <div className="relative flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
          <span className="text-sm font-medium text-white">
            {comment.avatar ? (
              <Image
                src={comment.avatar}
                alt={comment.author}
                width={1008}
                height={1008}
                className="mr-auto h-[48px] w-[48px] rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-white">
                {comment.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </span>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-4">
        {/* Comment Content */}
        <div>
          <div className="mb-1 flex items-center space-x-2">
            <p className="font-sora text-base font-semibold text-[#242424]">
              {comment.author}
            </p>
            {comment.isMentor && (
              <span className="bg-primary-100 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                Mentor
              </span>
            )}
            <p className="font-sora text-xs text-gray-500">{comment.time}</p>
          </div>
          {comment.content && (
            <p className="font-sora bg-greys-100 rounded-[24px] p-3 text-sm leading-relaxed text-[#585858]">
              {comment.content}
            </p>
          )}
          {comment.id === "5" && (
            <div className="mt-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-4">
              <div className="h-20 w-32 rounded-lg bg-black"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
