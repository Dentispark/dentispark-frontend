"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Post } from "../types";
import { CommentItem } from "./comment-item";
import Image from "next/image";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Handle comment submission logic here
      setNewComment("");

      return {};
    }
  };

  const displayedComments = showAllComments
    ? post.comments
    : post.comments.slice(0, 2); // Show first 2 comments by default

  return (
    <div className="space-y-6">
      {/* Main Post */}
      <div className="flex space-x-3">
        <div className="relative flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
            {post.avatar ? (
              <Image
                src={post.avatar}
                alt={post.author}
                width={1008}
                height={1008}
                className="h-[48px] w-[48px] rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-white">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>
          {post.badge && (
            <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-600">
              <span className="text-xs font-bold text-white">{post.badge}</span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center space-x-2">
            <p className="font-sora text-base font-semibold text-[#242424]">
              {post.author}
            </p>
            {post.isMentor && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Mentor
              </span>
            )}
            <p className="font-sora text-xs text-gray-500">{post.time}</p>
          </div>
          <p className="font-sora bg-greys-100 rounded-[24px] p-3 text-sm leading-relaxed text-[#585858]">
            {post.content}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="ml-[60px] space-y-4">
        {displayedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}

        {/* Show more comments button */}
        {post.comments.length > 2 && !showAllComments && (
          <div className="text-center">
            <button
              onClick={() => setShowAllComments(true)}
              className="font-sora mx-auto my-8 rounded-lg border px-16 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              See all {post.totalComments} comments
            </button>
          </div>
        )}

        {/* Reply to post input */}
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-800">
              <Image
                src={post.avatar}
                alt={post.author}
                width={1008}
                height={1008}
                className="h-[32px] w-[32px] rounded-full object-cover"
              />
              <span className="text-sm font-medium text-white">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            <Input
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 rounded-full border-gray-200 bg-white pr-12 text-sm focus:bg-white"
            />
            <Button
              variant={"outline"}
              onClick={handleSubmitComment}
              className="size-10 rounded-full"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2199 19.6293C11.0399 19.6293 9.36988 18.7993 8.04988 14.8293L7.32988 12.6693L5.16988 11.9493C1.20988 10.6293 0.379883 8.95934 0.379883 7.77934C0.379883 6.60934 1.20988 4.92934 5.16988 3.59934L13.6599 0.769339C15.7799 0.0593387 17.5499 0.269339 18.6399 1.34934C19.7299 2.42934 19.9399 4.20934 19.2299 6.32934L16.3999 14.8193C15.0699 18.7993 13.3999 19.6293 12.2199 19.6293ZM5.63988 5.02934C2.85988 5.95934 1.86988 7.05934 1.86988 7.77934C1.86988 8.49934 2.85988 9.59934 5.63988 10.5193L8.15988 11.3593C8.37988 11.4293 8.55988 11.6093 8.62988 11.8293L9.46988 14.3493C10.3899 17.1293 11.4999 18.1193 12.2199 18.1193C12.9399 18.1193 14.0399 17.1293 14.9699 14.3493L17.7999 5.85934C18.3099 4.31934 18.2199 3.05934 17.5699 2.40934C16.9199 1.75934 15.6599 1.67934 14.1299 2.18934L5.63988 5.02934Z"
                  fill="#12AC75"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
