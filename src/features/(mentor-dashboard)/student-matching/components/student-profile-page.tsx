"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { useModalStore } from "@/src/store/modal-store";
import { SuggestSlotForm } from "./suggest-slot-form";
import { AcceptBookingModal } from "./accept-booking-modal";
import { PracticeTestDetailModal } from "./practice-test-detail-modal";

interface StudentProfilePageProps {
  className?: string;
}

// Mock student data - will be replaced with API data later
const MOCK_STUDENT = {
  id: "1",
  name: "Daniel Sarabia",
  year: "Year 12",
  avatar: "/images/latest-booking.png",
  preferredSchool: "Bristol University",
  ucatScore: "2640",
  aLevelScore: "AAA",
  booking: {
    title: "UCAT Student",
    date: "Wed, 12th July, 2025 | 5pm",
  },
  goals: `As a Year 12 student aspiring to study Dental Science at the University of Bristol, my goal is to excel academically while gaining practical experience in the field of dentistry. I aim to achieve top grades in my A-levels, particularly in Biology and Chemistry, to meet the university's entry requirements. Additionally, I plan to engage in relevant extracurricular activities, such as volunteering at local dental clinics and participating in workshops, to enhance my understanding of oral health and patient care.`,
  whyDentistry: `I aspire to study dentistry because I am deeply passionate about improving people's lives through oral health. The ability to alleviate pain, restore smiles, and enhance confidence in others is incredibly fulfilling. I am drawn to the intricate blend of science and artistry that dentistry offers, allowing me to...`,
  practiceTests: [
    {
      id: "1",
      title: "Practice Question 1",
      category: "Verbal Reasoning",
    },
    {
      id: "2",
      title: "Practice Question 2",
      category: "Verbal Reasoning",
    },
  ],
};

export function StudentProfilePage({ className }: StudentProfilePageProps) {
  const router = useRouter();
  const [showFullGoals, setShowFullGoals] = useState(false);
  const [showFullWhy, setShowFullWhy] = useState(false);
  const { openModal, closeModal } = useModalStore();

  const breadcrumbItems = [
    { label: "Student matching", href: "/mentor/student-matching" },
    { label: "Student's profile", isActive: true },
  ];

  const handleAcceptBooking = () => {
    openModal({
      modalTitle: "",
      bodyContent: (
        <AcceptBookingModal
          student={{
            name: MOCK_STUDENT.name,
            year: MOCK_STUDENT.year,
            avatar: MOCK_STUDENT.avatar,
          }}
          booking={{
            title: MOCK_STUDENT.booking.title,
            date: MOCK_STUDENT.booking.date,
          }}
          onAccept={() => {
            console.log("Booking accepted");
            // TODO: Implement API call to accept booking
            closeModal();
          }}
          onSuggestNewSlot={() => {
            closeModal();
            // Open suggest slot modal after a brief delay
            setTimeout(() => {
              handleSuggestNewSlot();
            }, 100);
          }}
        />
      ),
      action: () => {
        // This won't be called since we're using custom content
      },
      actionTitle: "Accept",
      type: "accept-booking",
      size: "md",
      isCustomContent: true,
    });
  };

  const handleSuggestNewSlot = () => {
    openModal({
      modalTitle: "Suggest New slot",
      bodyContent: (
        <SuggestSlotForm
          onSubmit={(data) => {
            console.log("Slot suggested:", data);
            // TODO: Implement API call to suggest new slot
            closeModal();
          }}
          onCancel={closeModal}
        />
      ),
      action: () => {
        // This won't be called since we're using custom content
      },
      actionTitle: "Apply",
      type: "suggest-slot",
      size: "2xl",
      isCustomContent: true,
    });
  };

  const handleSendMessage = () => {
    router.push(`/mentor/student-matching/${MOCK_STUDENT.id}/messaging`);
  };

  const handleViewPracticeTest = (test: {
    id: string;
    title: string;
    category: string;
  }) => {
    openModal({
      modalTitle: "",
      bodyContent: <PracticeTestDetailModal test={test} onClose={closeModal} />,
      action: () => {
        // This won't be called since we're using custom content
      },
      actionTitle: "Close",
      type: "practice-test-detail",
      size: "lg",
      isCustomContent: true,
    });
  };

  return (
    <div className={cn("min-h-screen bg-white py-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Content - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Student Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center gap-6">
                <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={MOCK_STUDENT.avatar}
                    alt={MOCK_STUDENT.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="font-sora text-black-800 mb-2 text-3xl font-bold">
                    {MOCK_STUDENT.name}
                  </h1>
                  <p className="text-black-400 font-sora text-base">
                    {MOCK_STUDENT.year}
                  </p>
                </div>
              </div>

              {/* Student Info Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="font-sora text-black-800 text-sm font-semibold">
                    Preferred School
                  </span>
                  <p className="text-black-400 border-greys-300 bg-greys-100 font-sora rounded-full border p-2 text-sm">
                    {MOCK_STUDENT.preferredSchool}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-sora text-black-800 text-sm font-semibold">
                    UCAT Score
                  </span>
                  <p className="text-black-400 border-greys-300 bg-greys-100 font-sora rounded-full border p-2 text-sm">
                    {MOCK_STUDENT.ucatScore}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-sora text-black-800 text-sm font-semibold">
                    A-Level Score
                  </span>
                  <p className="text-black-400 border-greys-300 bg-greys-100 font-sora rounded-full border p-2 text-sm">
                    {MOCK_STUDENT.aLevelScore}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Goals Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="font-sora text-black-800 mb-4 text-xl font-semibold">
                Goals
              </h2>
              <p className="text-black-600 font-sora text-sm leading-relaxed">
                {showFullGoals
                  ? MOCK_STUDENT.goals
                  : `${MOCK_STUDENT.goals.substring(0, 300)}...`}
              </p>
              {!showFullGoals && (
                <button
                  onClick={() => setShowFullGoals(true)}
                  className="text-primary font-sora mt-2 text-sm font-medium hover:underline"
                >
                  Read more
                </button>
              )}
            </motion.div>

            {/* Why Dentistry Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h2 className="font-sora text-black-800 mb-4 text-xl font-semibold">
                Why dentistry?
              </h2>
              <p className="text-black-600 font-sora text-sm leading-relaxed">
                {showFullWhy
                  ? MOCK_STUDENT.whyDentistry
                  : MOCK_STUDENT.whyDentistry}
              </p>
              {!showFullWhy && MOCK_STUDENT.whyDentistry.length > 250 && (
                <button
                  onClick={() => setShowFullWhy(true)}
                  className="text-primary font-sora mt-2 text-sm font-medium hover:underline"
                >
                  Read more
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="space-y-6 rounded-[24px] border p-6 lg:col-span-1">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="">
                <div className="mb-8 rounded-[16px] border p-4">
                  <h3 className="font-sora text-black-800 mb-2 text-lg font-semibold">
                    {MOCK_STUDENT.booking.title}
                  </h3>
                  <p className="text-black-400 font-sora text-sm">
                    {MOCK_STUDENT.booking.date}
                  </p>
                </div>

                <div className="font-sora space-y-4">
                  <Button onClick={handleAcceptBooking} className="h-10 w-full">
                    Accept Booking
                  </Button>
                  <Button
                    onClick={handleSuggestNewSlot}
                    variant="outline"
                    className="text-primary hover:text-primary h-10 w-full hover:bg-white"
                  >
                    Suggest new slot
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Message Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="border-greys-300 overflow-hidden rounded-[16px] border">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex h-full px-4 py-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="70"
                      viewBox="0 0 80 70"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1809_55868)">
                        <path
                          d="M12.2619 54.7434C12.7224 53.7478 13.0894 52.7111 13.3583 51.6469C9.27985 49.169 5.90712 45.6746 3.5668 41.5021C1.22649 37.3296 -0.00211242 32.6204 2.72645e-06 27.8306C2.72645e-06 12.4603 12.3976 0 27.6905 0C42.9833 0 55.3821 12.4603 55.3821 27.8306C55.3821 43.2008 42.9845 55.6623 27.6905 55.6623C25.6458 55.6629 23.6072 55.4366 21.6119 54.9875C19.84 57.1985 17.5625 58.9462 14.9735 60.0816C12.3845 61.217 9.56072 61.7066 6.74286 61.5084C9.12265 59.7593 11.0217 57.4316 12.2619 54.7434Z"
                          fill="#109D6A"
                        />
                        <path
                          d="M4.93354 30.5534C4.93354 16.9803 15.8859 5.97727 29.3859 5.97727C33.133 5.97353 36.8307 6.83707 40.1923 8.50095C43.5539 10.1648 46.4891 12.5844 48.7704 15.572C46.6272 11.8244 43.538 8.71157 39.8149 6.54774C36.0918 4.3839 31.8665 3.2457 27.5657 3.24805C14.0609 3.24805 3.1133 14.2558 3.1133 27.8241C3.10634 33.2435 4.88922 38.5119 8.18235 42.8031C6.04736 39.0777 4.92681 34.8526 4.93354 30.5534Z"
                          fill="#B6E5D4"
                        />
                        <path
                          d="M55.368 26.9533C55.368 26.9353 55.368 26.9186 55.368 26.9006C55.2106 22.3163 53.9256 17.8425 51.6281 13.8791C49.3305 9.91562 46.0918 6.58593 42.2014 4.1875C45.0481 8.65441 46.5569 13.8498 46.5478 19.1545C46.5478 34.4996 34.1668 46.9408 18.9014 46.9408C13.795 46.9474 8.78751 45.5256 4.43945 42.8344C6.70031 46.3803 9.72986 49.3663 13.3014 51.5689L13.2811 51.5988L13.3573 51.6466C13.0888 52.7108 12.7221 53.7475 12.2621 54.7432C11.0225 57.4311 9.12433 59.7588 6.74541 61.5082C9.56311 61.7065 12.3867 61.2171 14.9756 60.0816C17.5644 58.9462 19.8417 57.1984 21.6133 54.9873L21.6549 54.9957C21.6555 54.9901 21.6555 54.9845 21.6549 54.9789C25.5285 55.8532 29.5439 55.8796 33.4286 55.0561C37.3132 54.2327 40.976 52.5787 44.1683 50.2065C47.3606 47.8343 50.0076 44.7995 51.9296 41.3081C53.8516 37.8167 55.0036 33.9505 55.3073 29.9721C55.3808 28.9676 55.4011 27.9599 55.368 26.9533Z"
                          fill="#12AC75"
                        />
                        <path
                          d="M67.7379 63.1919C67.2775 62.1962 66.9104 61.1596 66.6415 60.0954C70.72 57.6175 74.0927 54.1231 76.433 49.9506C78.7733 45.7781 80.0019 41.0689 79.9998 36.279C79.9998 20.9088 67.6022 8.44727 52.3093 8.44727C37.0165 8.44727 24.6177 20.9088 24.6177 36.279C24.6177 51.6493 37.0153 64.1096 52.3093 64.1096C54.3541 64.1107 56.3927 63.8844 58.3879 63.4348C60.1597 65.646 62.4371 67.3939 65.0262 68.5293C67.6152 69.6647 70.4391 70.1541 73.257 69.9557C70.877 68.2073 68.9779 65.8799 67.7379 63.1919Z"
                          fill="#12AC75"
                        />
                        <path
                          d="M67.7381 63.1915C67.2801 62.201 66.9142 61.17 66.6452 60.1117C70.7056 57.6461 74.0665 54.1721 76.4049 50.0238C78.7433 45.8754 79.9805 41.1921 79.9976 36.4242C80.0147 31.6564 78.8111 26.9643 76.5025 22.7991C74.1939 18.6338 70.858 15.1356 66.8155 12.6406C69.664 17.1069 71.174 22.3025 71.1655 27.6076C71.1678 42.9539 58.7893 55.3975 43.5214 55.3975C38.4144 55.406 33.4059 53.9849 29.0571 51.2935C32.1187 56.0967 36.5751 59.8382 41.8227 62.0113C47.0703 64.1844 52.8556 64.6841 58.3952 63.4428C60.1672 65.6514 62.4439 67.3969 65.0315 68.5308C67.6192 69.6648 70.4411 70.1535 73.2571 69.9553C70.8771 68.207 68.9781 65.8796 67.7381 63.1915Z"
                          fill="#109D6A"
                        />
                        <path
                          d="M29.5512 39.0065C29.5512 25.4334 40.5036 14.4304 54.0048 14.4304C57.7517 14.4268 61.4491 15.2905 64.8105 16.9543C68.1719 18.6182 71.1069 21.0376 73.3881 24.0251C71.245 20.2777 68.156 17.165 64.4331 15.0012C60.7102 12.8373 56.4851 11.699 52.1846 11.7012C38.6786 11.7012 27.731 22.709 27.731 36.2773C27.7232 41.6978 29.5062 46.9676 32.8 51.2598C30.6644 47.5333 29.5439 43.3069 29.5512 39.0065Z"
                          fill="#B6E5D4"
                        />
                        <path
                          d="M42.1181 39.5329C43.554 39.5329 44.7181 38.363 44.7181 36.9198C44.7181 35.4766 43.554 34.3066 42.1181 34.3066C40.6821 34.3066 39.5181 35.4766 39.5181 36.9198C39.5181 38.363 40.6821 39.5329 42.1181 39.5329Z"
                          fill="white"
                        />
                        <path
                          d="M52.3095 39.5329C53.7454 39.5329 54.9095 38.363 54.9095 36.9198C54.9095 35.4766 53.7454 34.3066 52.3095 34.3066C50.8735 34.3066 49.7095 35.4766 49.7095 36.9198C49.7095 38.363 50.8735 39.5329 52.3095 39.5329Z"
                          fill="white"
                        />
                        <path
                          d="M62.2514 39.5329C63.6873 39.5329 64.8514 38.363 64.8514 36.9198C64.8514 35.4766 63.6873 34.3066 62.2514 34.3066C60.8154 34.3066 59.6514 35.4766 59.6514 36.9198C59.6514 38.363 60.8154 39.5329 62.2514 39.5329Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1809_55868">
                          <rect width="80" height="70" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className="px-2">
                    <p className="font-sora text-black-800 text-xs font-semibold">
                      Got questions?{" "}
                      <span className="font-normal">
                        Start chatting with this student before you get started.
                      </span>
                    </p>
                    <button
                      onClick={handleSendMessage}
                      className="text-primary font-sora mt-2 text-sm font-medium hover:underline"
                    >
                      Send Daniel a message
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Practice Test Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className="font-sora text-black-800 mb-4 text-lg font-semibold">
                Practice Test Results
              </h3>
              <div className="space-y-3">
                {MOCK_STUDENT.practiceTests.map((test) => (
                  <Card
                    key={test.id}
                    onClick={() => handleViewPracticeTest(test)}
                    className="border-greys-300 hover:border-greys-400 cursor-pointer p-4 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                        <FileText className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-sora text-black-800 text-sm font-semibold">
                          {test.title}
                        </p>
                        <p className="text-black-400 font-sora text-xs">
                          {test.category}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
