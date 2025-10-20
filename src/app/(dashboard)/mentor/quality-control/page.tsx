"use client";

import { motion } from "framer-motion";
import {
  StudentFeedbackCard,
  ContactSupportForm,
} from "@/src/features/(mentor-dashboard)/quality-control";
import {
  MOCK_STUDENT_FEEDBACK,
  getCardBgColor,
  getCardBorderColor,
} from "@/src/features/(mentor-dashboard)/quality-control/constants";

export default function QualityControlPage() {
  const handleSupportSubmit = async (message: string) => {
    // TODO: Implement support message submission
    console.log("Support message:", message);
  };

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="mx-auto lg:col-span-2">
              <div>
                <h1 className="text-black-800 mb-8 text-2xl font-semibold">
                  Quality control
                </h1>
              </div>
              <div className="mb-6">
                <h2 className="text-black-800 text-xl font-semibold">
                  Students feedback
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 [@media(min-width:1800px)]:grid-cols-4 [@media(min-width:2300px)]:grid-cols-5 [@media(min-width:2800px)]:grid-cols-6">
                {MOCK_STUDENT_FEEDBACK.map((feedback, index) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <StudentFeedbackCard
                      feedback={{
                        ...feedback,
                        bgColor: getCardBgColor(index),
                        borderColor: getCardBorderColor(index),
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="-mt-8 border-l lg:col-span-1">
              <ContactSupportForm onSubmit={handleSupportSubmit} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
