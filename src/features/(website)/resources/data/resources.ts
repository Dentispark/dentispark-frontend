export interface Resource {
  id: string;
  title: string;
  date: string;
  content: string;
}

// Mock data for resources - in a real app this would come from an API or database
export const resourcesData: Record<string, Resource> = {
  "1": {
    id: "1",
    title: "M7 MBA Programs – What They Are & How to Get In",
    date: "May 23, 2023",
    content:
      "An expert admissions coach details how to get into an elite M7 business school with ways to stand out in your application, with deep-dives into all the M7 programs.",
  },
  "2": {
    id: "2",
    title: "Top Strategies for MBA Interview Success",
    date: "June 15, 2023",
    content:
      "Learn proven techniques from industry leaders to excel in your MBA interviews, including common questions and how to showcase your unique experiences.",
  },
  "3": {
    id: "3",
    title: "Financing Your MBA: Scholarships and Loans Explained",
    date: "July 10, 2023",
    content:
      "A comprehensive guide to understanding the financial aspects of pursuing an MBA, with insights on scholarships, student loans, and budgeting for business school.",
  },
  "4": {
    id: "4",
    title: "M7 MBA Programs – What They Are & How to Get In",
    date: "May 23, 2023",
    content:
      "An expert admissions coach details how to get into an elite M7 business school with ways to stand out in your application, with deep-dives into all the M7 programs.",
  },
  "5": {
    id: "5",
    title: "Mastering the GMAT: Strategies for Success",
    date: "June 15, 2023",
    content:
      "Discover effective study techniques and time management tips to ace the GMAT, enhancing your chances of acceptance into top business schools.",
  },
  "6": {
    id: "6",
    title: "Crafting an Outstanding MBA Resume",
    date: "July 10, 2023",
    content:
      "Learn how to highlight your achievements and experiences to create a compelling resume that captures the attention of admissions committees.",
  },
  "7": {
    id: "7",
    title: "Networking for MBA Success: Building Your Professional Circle",
    date: "August 5, 2023",
    content:
      "Explore the importance of networking in the MBA application process and strategies to connect with alumni and industry professionals.",
  },
};

export function getResourceById(id: string): Resource | null {
  return resourcesData[id] || null;
}
