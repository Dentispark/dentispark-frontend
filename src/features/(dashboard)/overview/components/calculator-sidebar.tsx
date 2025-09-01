"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface CalculatorSidebarProps {
  className?: string;
}

export default function CalculatorSidebar({
  className = "",
}: CalculatorSidebarProps) {
  const [selectedStudentType, setSelectedStudentType] =
    useState("all-applicants");
  const [formData, setFormData] = useState({
    gcsceScore: "",
    aLevelGrades: "",
    workExperience: "",
    ieltsScore: "",
  });

  const studentTypes = [
    { id: "all-applicants", label: "All applicants" },
    { id: "school-leaver", label: "School Leaver" },
    { id: "graduate-applicant", label: "Graduate Applicant" },
    { id: "international-applicant", label: "International Applicant" },
    { id: "widening-participation", label: "Widening Participation" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "border-greys-200 rounded-xl border bg-white p-6",
        className,
      )}
    >
      <h3 className="text-black-800 mb-6 text-lg font-bold">Calculator</h3>

      {/* Student Type Selection */}
      <div className="mb-6">
        <h4 className="text-primary-600 mb-4 text-sm font-medium">
          Select student type
        </h4>
        <RadioGroup
          value={selectedStudentType}
          onValueChange={setSelectedStudentType}
          className="space-y-3"
        >
          {studentTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-3">
              <RadioGroupItem value={type.id} id={type.id} />
              <label
                htmlFor={type.id}
                className="text-black-700 cursor-pointer text-sm"
              >
                {type.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Academic Information Form */}
      <div className="mb-6">
        <h4 className="text-black-700 mb-4 text-sm font-medium">
          Enter Your Academic Information
        </h4>

        <div className="space-y-4">
          {/* GCSE Score */}
          <div>
            <label className="text-black-600 mb-2 block text-xs">
              What is your GSCE score
            </label>
            <Select
              value={formData.gcsceScore}
              onValueChange={(value) => handleInputChange("gcsceScore", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select score range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9-8">9-8 (A*-A)</SelectItem>
                <SelectItem value="7-6">7-6 (A-B)</SelectItem>
                <SelectItem value="5-4">5-4 (B-C)</SelectItem>
                <SelectItem value="3-1">3-1 (D-G)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* A-Level Grades */}
          <div>
            <label className="text-black-600 mb-2 block text-xs">
              What are your predicted or achieved A-Level grades
            </label>
            <Select
              value={formData.aLevelGrades}
              onValueChange={(value) =>
                handleInputChange("aLevelGrades", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select score range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A*A*A*">A*A*A*</SelectItem>
                <SelectItem value="A*A*A">A*A*A</SelectItem>
                <SelectItem value="AAA">AAA</SelectItem>
                <SelectItem value="AAB">AAB</SelectItem>
                <SelectItem value="ABB">ABB</SelectItem>
                <SelectItem value="BBB">BBB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Work Experience */}
          <div>
            <label className="text-black-600 mb-2 block text-xs">
              How many hours of dental work experience have you completed?
            </label>
            <Select
              value={formData.workExperience}
              onValueChange={(value) =>
                handleInputChange("workExperience", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select hour range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50">0-50 hours</SelectItem>
                <SelectItem value="51-100">51-100 hours</SelectItem>
                <SelectItem value="101-200">101-200 hours</SelectItem>
                <SelectItem value="200+">200+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* IELTS Score */}
          <div>
            <label className="text-black-600 mb-2 block text-xs">
              What is your IELTS score?
            </label>
            <Select
              value={formData.ieltsScore}
              onValueChange={(value) => handleInputChange("ieltsScore", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select score range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9.0">9.0</SelectItem>
                <SelectItem value="8.5">8.5</SelectItem>
                <SelectItem value="8.0">8.0</SelectItem>
                <SelectItem value="7.5">7.5</SelectItem>
                <SelectItem value="7.0">7.0</SelectItem>
                <SelectItem value="6.5">6.5</SelectItem>
                <SelectItem value="6.0">6.0</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button className="w-full">Calculate Your Chances</Button>
    </motion.div>
  );
}
