"use client";

import GradeLevel from "@/components/grade_level";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AcademicContentForm() {
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState(null);

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
        <h2 className="text-xl font-bold text-center">Academic Content</h2>
        <p className="text-center text-gray-600 mb-4">
          Generate original academic content customized to the criteria of your choice.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Grade Level */}
          <GradeLevel/>

          {/* Content Type */}
          <div>
            <label className="block font-semibold">Content Type: *</label>
            <textarea
              {...register("contentType")}
              className="w-full p-2 border rounded"
              placeholder="Short Story, Procedural Text, Persuasive, News Article, Textbook Page"
            ></textarea>
          </div>

          {/* Text Length */}
          <div>
            <label className="block font-semibold">Text Length: *</label>
            <textarea
              {...register("textLength")}
              className="w-full p-2 border rounded"
              placeholder="1 page, Exactly 1 paragraph, 2 pages, 3 pages"
            ></textarea>
          </div>

          {/* Topic, Standard, Objective */}
          <div>
            <label className="block font-semibold">
              Topic, standard, objective (be as specific as possible): *
            </label>
            <textarea
              {...register("topic")}
              className="w-full p-2 border rounded"
              placeholder="The process of mitosis, the story of Jack and the Beanstalk but set in a Minecraft world..."
            ></textarea>
          </div>

          {/* Additional Criteria */}
          <div>
            <label className="block font-semibold">Additional Criteria:</label>
            <textarea
              {...register("additionalCriteria")}
              className="w-full p-2 border rounded"
              placeholder="Include specific vocabulary, use ethos/pathos/logos..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
