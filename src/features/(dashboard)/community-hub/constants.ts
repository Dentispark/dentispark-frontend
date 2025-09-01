import { Comment, Post, SuccessStory } from "./types";

export const mockPosts: Post[] = [
  {
    id: "1",
    author: "Scarlet Ash",
    avatar: "/images/community-avatar.png",
    time: "02:22 AM",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    totalComments: 64,
    comments: [
      {
        id: "1-1",
        author: "Jasper Lane",
        avatar: "/images/community-avatar.png",
        time: "02:22 AM",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "1-2",
        author: "Mason Brooks",
        avatar: "/images/community-avatar.png",
        time: "02:22 AM",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        isMentor: true,
        badge: "SL",
      },
      {
        id: "1-3",
        author: "Emma Wilson",
        avatar: "/images/community-avatar.png",
        time: "02:25 AM",
        content:
          "Thanks for sharing this! I've been struggling with similar challenges and this really helps put things into perspective.",
      },
      {
        id: "1-4",
        author: "Dr. Sarah Mitchell",
        avatar: "/images/community-avatar.png",
        time: "02:28 AM",
        content:
          "Great insights here! As someone who's been in the field for 10+ years, I can definitely relate to these experiences.",
        isMentor: true,
        badge: "DM",
      },
      {
        id: "1-5",
        author: "Alex Chen",
        avatar: "/images/community-avatar.png",
        time: "02:30 AM",
        content: "This is exactly what I needed to hear today. Thank you! 🙏",
      },
      {
        id: "1-6",
        author: "Jordan Smith",
        avatar: "/images/community-avatar.png",
        time: "02:35 AM",
        content:
          "I had a similar experience during my first year. It gets better with time and practice. Keep pushing forward!",
      },
      {
        id: "1-7",
        author: "Lisa Rodriguez",
        avatar: "/images/community-avatar.png",
        time: "02:40 AM",
        content:
          "Would love to connect and discuss this further. Mind if I send you a message?",
      },
      {
        id: "1-8",
        author: "Prof. Michael Johnson",
        avatar: "/images/community-avatar.png",
        time: "02:45 AM",
        content:
          "Excellent points raised here. This is why community support is so crucial in our field. Well articulated!",
        isMentor: true,
      },
    ],
  },
];

export const mockComments: Comment[] = [];

export const mockSuccessStories: SuccessStory[] = [
  {
    id: "1",
    title: "DentiSpark's free UCAT guide helped me score 2700!",
    author: "Neil Sims",
    location: "London, England",
    avatar: "/images/community-avatar.png",
    bgColor: "bg-secondary-50",
  },
  {
    id: "2",
    title: "DentiSpark's free UCAT guide helped me score 2700!",
    author: "Emma Johnson",
    location: "CTO, Tech Innovators",
    avatar: "/images/community-avatar.png",
    bgColor: "bg-[#FDF0E6]",
  },
  {
    id: "3",
    title: "DentiSpark's free UCAT guide helped me score 2700!",
    author: "Emma Johnson",
    location: "CTO, Tech Innovators",
    avatar: "/images/community-avatar.png",
    bgColor: "bg-[#E9F9EF]",
  },
];
