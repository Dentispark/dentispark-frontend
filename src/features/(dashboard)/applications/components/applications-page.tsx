"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ApplicationCard } from "./application-card";

// Icons
const ChecklistIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M32.38 4H15.62C8.34 4 4 8.34 4 15.62V32.38C4 39.66 8.34 44 15.62 44H32.38C39.66 44 44 39.66 44 32.38V15.62C44 8.34 39.66 4 32.38 4Z"
      fill="#2A50FA"
    />
    <path
      d="M36.6211 17.7422C36.6211 18.5622 35.9611 19.2422 35.1211 19.2422H24.6211C23.8011 19.2422 23.1211 18.5622 23.1211 17.7422C23.1211 16.9222 23.8011 16.2422 24.6211 16.2422H35.1211C35.9611 16.2422 36.6211 16.9222 36.6211 17.7422Z"
      fill="#2A50FA"
    />
    <path
      d="M19.9411 15.7972L15.4411 20.2972C15.1411 20.5972 14.7611 20.7372 14.3811 20.7372C14.0011 20.7372 13.6011 20.5972 13.3211 20.2972L11.8211 18.7972C11.2211 18.2172 11.2211 17.2572 11.8211 16.6772C12.4011 16.0972 13.3411 16.0972 13.9411 16.6772L14.3811 17.1172L17.8211 13.6772C18.4011 13.0972 19.3411 13.0972 19.9411 13.6772C20.5211 14.2572 20.5211 15.2172 19.9411 15.7972Z"
      fill="#2A50FA"
    />
    <path
      d="M36.6211 31.7422C36.6211 32.5622 35.9611 33.2422 35.1211 33.2422H24.6211C23.8011 33.2422 23.1211 32.5622 23.1211 31.7422C23.1211 30.9222 23.8011 30.2422 24.6211 30.2422H35.1211C35.9611 30.2422 36.6211 30.9222 36.6211 31.7422Z"
      fill="#2A50FA"
    />
    <path
      d="M19.9411 29.7972L15.4411 34.2972C15.1411 34.5972 14.7611 34.7372 14.3811 34.7372C14.0011 34.7372 13.6011 34.5972 13.3211 34.2972L11.8211 32.7972C11.2211 32.2172 11.2211 31.2572 11.8211 30.6772C12.4011 30.0972 13.3411 30.0972 13.9411 30.6772L14.3811 31.1172L17.8211 27.6772C18.4011 27.0972 19.3411 27.0972 19.9411 27.6772C20.5211 28.2572 20.5211 29.2172 19.9411 29.7972Z"
      fill="#2A50FA"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    width="49"
    height="48"
    viewBox="0 0 49 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M31.332 26.3H26.992C23.432 26.3 20.532 23.42 20.532 19.84V15.5C20.532 14.68 19.872 14 19.032 14H12.692C8.07203 14 4.33203 17 4.33203 22.36V35.64C4.33203 41 8.07203 44 12.692 44H24.472C29.092 44 32.832 41 32.832 35.64V27.8C32.832 26.96 32.152 26.3 31.332 26.3Z"
      fill="#12AC75"
    />
    <path
      d="M35.9716 4H32.0316H29.8516H24.1916C19.6716 4 16.0116 6.88 15.8516 12.02C15.9716 12.02 16.0716 12 16.1916 12H21.8516H24.0316H27.9716C32.5916 12 36.3316 15 36.3316 20.36V24.3V29.72V33.66C36.3316 33.78 36.3116 33.88 36.3116 33.98C40.7716 33.84 44.3316 30.88 44.3316 25.66V21.72V16.3V12.36C44.3316 7 40.5916 4 35.9716 4Z"
      fill="#12AC75"
    />
    <path
      d="M24.2933 14.3034C23.6733 13.6834 22.6133 14.1034 22.6133 14.9634V20.2034C22.6133 22.4034 24.4733 24.2034 26.7533 24.2034C28.1733 24.2234 30.1533 24.2234 31.8533 24.2234C32.7133 24.2234 33.1533 23.2234 32.5533 22.6234C30.3733 20.4434 26.4933 16.5434 24.2933 14.3034Z"
      fill="#12AC75"
    />
  </svg>
);

const MentorshipIcon = () => (
  <svg
    width="49"
    height="48"
    viewBox="0 0 49 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M18.668 4C13.428 4 9.16797 8.26 9.16797 13.5C9.16797 18.64 13.188 22.8 18.428 22.98C18.588 22.96 18.748 22.96 18.868 22.98C18.908 22.98 18.928 22.98 18.968 22.98C18.988 22.98 18.988 22.98 19.008 22.98C24.128 22.8 28.148 18.64 28.168 13.5C28.168 8.26 23.908 4 18.668 4Z"
      fill="#D32F2F"
    />
    <path
      d="M28.8298 28.2978C23.2498 24.5778 14.1498 24.5778 8.52984 28.2978C5.98984 29.9978 4.58984 32.2978 4.58984 34.7578C4.58984 37.2178 5.98984 39.4978 8.50984 41.1778C11.3098 43.0578 14.9898 43.9978 18.6698 43.9978C22.3498 43.9978 26.0298 43.0578 28.8298 41.1778C31.3498 39.4778 32.7498 37.1978 32.7498 34.7178C32.7298 32.2578 31.3498 29.9778 28.8298 28.2978Z"
      fill="#D32F2F"
    />
    <path
      opacity="0.4"
      d="M40.6467 14.6763C40.9667 18.5563 38.2067 21.9563 34.3867 22.4163C34.3667 22.4163 34.3667 22.4163 34.3467 22.4163H34.2867C34.1667 22.4163 34.0467 22.4163 33.9467 22.4563C32.0067 22.5563 30.2267 21.9363 28.8867 20.7963C30.9467 18.9563 32.1267 16.1963 31.8867 13.1963C31.7467 11.5763 31.1867 10.0963 30.3467 8.83629C31.1067 8.45629 31.9867 8.21629 32.8867 8.13629C36.8067 7.79629 40.3067 10.7163 40.6467 14.6763Z"
      fill="#D32F2F"
    />
    <path
      d="M44.6484 33.1808C44.4884 35.1208 43.2484 36.8008 41.1684 37.9408C39.1684 39.0408 36.6484 39.5608 34.1484 39.5008C35.5884 38.2008 36.4284 36.5808 36.5884 34.8608C36.7884 32.3808 35.6084 30.0008 33.2484 28.1008C31.9084 27.0408 30.3484 26.2008 28.6484 25.5808C33.0684 24.3008 38.6284 25.1608 42.0484 27.9208C43.8884 29.4008 44.8284 31.2608 44.6484 33.1808Z"
      fill="#D32F2F"
    />
  </svg>
);

export function ApplicationsPage() {
  const router = useRouter();

  const handleApplicationChecklistClick = () => {
    // TODO: Navigate to application checklist page or open modal
    console.log("Navigate to application checklist");
  };

  const handleDocumentRepositoryClick = () => {
    router.push("/applications/document-repository");
  };

  const handleMentorshipClick = () => {
    router.push("/mentorship");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-text-color mb-8 text-2xl font-semibold"
        >
          Applications
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <ApplicationCard
            icon={<ChecklistIcon />}
            title="Application Checklist"
            titleColor="text-secondary-600"
            description="Complete your tasks to stay on track!"
            backgroundColor="bg-secondary-50"
            onClick={handleApplicationChecklistClick}
          />

          <ApplicationCard
            icon={<DocumentIcon />}
            title="Document repository"
            titleColor="text-primary"
            description="Upload your documents to the repository"
            backgroundColor="bg-primary-100"
            onClick={handleDocumentRepositoryClick}
          />

          <ApplicationCard
            icon={<MentorshipIcon />}
            title="Mentorship"
            titleColor="text-error-600"
            description="Check for personalized mentors"
            backgroundColor="bg-error-50"
            onClick={handleMentorshipClick}
          />
        </motion.div>

        {/* Footer spacing */}
        <div className="h-16" />
      </div>
    </div>
  );
}
