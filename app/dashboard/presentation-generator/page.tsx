"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UploadableTextarea from "@/components/uploadable_textarea";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import ContentDisplay from "@/components/content_display";
import GradeLevel from "@/components/grade_level";

interface FormData {
  gradeLevel: string;
  topic: string;
  numberOfSlides: number;
  standardObjective: string;
  additionalCriteria: string;
  uploadedContent: File[];
}

interface ApiResponse {
  content: string;
  generated_at: string;
}

export default function PresentationGeneratorPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [response, setResponse] = useState<ApiResponse | null>(null);
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
    setResponse(null);

    const formData = new FormData();
    formData.append("grade_level", data.gradeLevel);
    formData.append("topic", data.topic);
    formData.append("number_of_slides", data.numberOfSlides.toString());
    formData.append("standard_objective", data.standardObjective);
    formData.append("additional_criteria", data.additionalCriteria || "");

    if (data.uploadedContent && data.uploadedContent.length > 0) {
      data.uploadedContent.forEach((file) => {
        formData.append("uploaded_content", file);
      });
    } else {
      setError("Uploaded content is required to generate a presentation.");
      setLoading(false);
      return;
    }

    try {
      if (token) {
        const res = await axios.post<any>(
          "/api/v1/presentation-gen",
          formData,
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
      console.error("Error generating presentation:", error);
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
          <a href="/dashboard"> &larr; Back </a>
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center">
          Presentation Generator
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Generate exportable slides based on a topic, text, YouTube video, or
          uploaded content.
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <GradeLevel />

          <div>
            <label className="block font-semibold">Number of Slides: *</label>
            <input
              {...register("numberOfSlides", {
                required: "Number of slides is required",
                min: { value: 1, message: "Must be at least 1 slide" },
              })}
              type="number"
              className="w-full p-2 border rounded-md"
              min="1"
            />
            {errors.numberOfSlides && (
              <p className="text-red-500 text-sm">
                {errors.numberOfSlides.message}
              </p>
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
