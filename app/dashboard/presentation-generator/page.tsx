"use client";

import GradeLevel from "@/components/grade_level";
import UploadableTextarea from "@/components/uploadable_textarea";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AcademicContentForm() {
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState(null);
  const [gradeLevel, setGradeLevel] = useState("University");
  const [slides, setSlides] = useState(5);
  const [topic, setTopic] = useState("");
  const [criteria, setCriteria] = useState("");

  const onSubmit = (data: any) => {
    setFormData(data);
    console.log("Submitted Data:", data);
  };

  return (
    <div className="min-h-screen bg-[#000511] p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button className="text-purple-600 font-semibold">
          <Link href={"/dashboard"}> &larr; Back </Link>
        </button>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center">
          Presentation Generator
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Generate exportable slides based on a topic, text, YouTube video, or
          uploaded content.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Grade Level */}
          <GradeLevel />

          {/* Content Type */}
          <div>
            <label className="block font-semibold">Number of Slides: *</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              min="1"
              value={slides}
              onChange={(e) => setSlides(Number(e.target.value))}
            />
          </div>

          {/* Topic, Standard, Content */}
          <div>
            <label className="block font-semibold">
              Topic, Standard, Content, or Objective: *
            </label>
            <textarea
              {...register("textLength")}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Enter topic details..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Additional Criteria */}
          <UploadableTextarea></UploadableTextarea>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
