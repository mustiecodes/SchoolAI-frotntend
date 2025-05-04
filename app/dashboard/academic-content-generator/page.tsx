"use client";

import GradeLevel from "@/components/grade_level";
import UploadableTextarea from "@/components/uploadable_textarea";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import ContentDisplay from "@/components/content-display";

interface FormData {
  gradeLevel: string;
  contentType: string;
  textLength: string;
  topic: string;
  standardObjective: string;
  additionalCriteria: string;
  uploadedContent: File[];
}

interface ApiResponse {
  data: string;
}

export default function AcademicContentForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("grade_level", data.gradeLevel);
    formDataToSend.append("content_type", data.contentType);
    formDataToSend.append("text_length", data.textLength);
    formDataToSend.append("topic", data.topic);
    formDataToSend.append("standard_objective", data.standardObjective);
    formDataToSend.append("additional_criteria", data.additionalCriteria || "");

    // ✅ Append multiple files as uploaded_content[]
    if (data.uploadedContent && data.uploadedContent.length > 0) {
      data.uploadedContent.forEach((file) => {
        formDataToSend.append("uploaded_content[]", file);
      });
    }

    try {
      if (token) {
        const res = await axios.post<ApiResponse>(
          "/api/v1/academic-content-gen",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResponse(res.data.data);
      } else {
        router.push("/signin");
      }
    } catch (error: any) {
      console.error("Error generating content:", error);
      setError(
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => {
    console.log("Form errors:", errors);
  };

  return (
    <div className="min-h-screen bg-[#000511] p-6">
      <div className="mb-4">
        <button className="text-purple-600 font-semibold">
          <Link href={"/dashboard"}> &larr; Back </Link>
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center">Academic Content</h2>
        <p className="text-center text-gray-600 mb-4">
          Generate original academic content customized to the criteria of your choice.
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <GradeLevel />

          <div>
            <label className="block font-semibold">Content Type: *</label>
            <textarea
              {...register("contentType", {
                required: "Content Type is required",
              })}
              className="w-full p-2 border rounded"
              placeholder="Short Story, Procedural Text, Persuasive, News Article, Textbook Page"
            />
            {errors.contentType && (
              <p className="text-red-500 text-sm">{errors.contentType.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Text Length: *</label>
            <textarea
              {...register("textLength", {
                required: "Text Length is required",
              })}
              className="w-full p-2 border rounded"
              placeholder="1 page, Exactly 1 paragraph, 2 pages, 3 pages"
            />
            {errors.textLength && (
              <p className="text-red-500 text-sm">{errors.textLength.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Topic: *</label>
            <textarea
              {...register("topic", { required: "Topic is required" })}
              className="w-full p-2 border rounded"
              placeholder="The process of mitosis, the story of Jack and the Beanstalk but set in a Minecraft world..."
            />
            {errors.topic && (
              <p className="text-red-500 text-sm">{errors.topic.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Standard Objective: *</label>
            <textarea
              {...register("standardObjective", {
                required: "Standard Objective is required",
              })}
              className="w-full p-2 border rounded"
              placeholder="The educational goal for the content, e.g., Understanding mitosis process"
            />
            {errors.standardObjective && (
              <p className="text-red-500 text-sm">
                {errors.standardObjective.message}
              </p>
            )}
          </div>

          {/* Uploadable Textarea handles both additionalCriteria and uploadedContent */}
          <UploadableTextarea setValue={setValue} />

          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <ContentDisplay
              content={response.content}
              generatedAt={response.generated_at}
            />
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 rounded-md">
            <h3 className="font-semibold text-lg text-red-600">Error:</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
