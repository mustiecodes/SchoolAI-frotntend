"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UploadableTextarea from "@/components/uploadable_textarea";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import GradeLevel from "@/components/grade_level";

interface FormData {
  gradeLevel: string;
  topic: string;
  numberOfSlides: number;
  standardObjective: string;
  additionalCriteria: string;
  uploadedContent: File[];
}

interface PresentationDetails {
  presentation_title: string;
  presentation_subtitle: string;
  image_search: string;
  slides: {
    title: string;
    subtitle: string;
    image_search: string;
    content: { title: string; description: string }[];
  }[];
}

interface PresentationResponse {
  presentation_url: string;
  ppt_id: string;
  pdf_url: string;
  presentation_details: PresentationDetails;
}

export default function PresentationGeneratorPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [presentation, setPresentation] = useState<PresentationResponse | null>(null);
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
    setPresentation(null);

    const formData = new FormData();
    formData.append("grade_level", data.gradeLevel);
    formData.append("topic", data.topic);
    formData.append("number_of_slides", data.numberOfSlides.toString());
    formData.append("standard_objective", data.standardObjective);
    formData.append("additional_criteria", data.additionalCriteria || "");

    if (data.uploadedContent?.length) {
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
        const res = await axios.post<any>("/api/v1/presentation-gen", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        const parsed: PresentationResponse = JSON.parse(res.data.data.content);
        setPresentation(parsed);
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
    <div className="min-h-screen bg-[#000511] p-6 text-white">
      <div className="mb-4">
        <button className="text-purple-600 font-semibold">
          <a href="/dashboard"> &larr; Back </a>
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white text-black shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-2">Presentation Generator</h2>
        <p className="text-center text-gray-600 mb-4">
          Generate exportable slides based on a topic, text, YouTube video, or uploaded content.
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
              <p className="text-red-500 text-sm">{errors.numberOfSlides.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Topic: *</label>
            <textarea
              {...register("topic", { required: "Topic is required" })}
              className="w-full p-2 border rounded"
              placeholder="The process of mitosis, the story of Jack and the Beanstalk but set in a Minecraft world..."
            />
            {errors.topic && <p className="text-red-500 text-sm">{errors.topic.message}</p>}
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
              <p className="text-red-500 text-sm">{errors.standardObjective.message}</p>
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
      </div>

      {presentation && (
        <div className="mt-12 max-w-5xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">
            {presentation.presentation_details.presentation_title}
          </h2>
          <p className="text-gray-600 mb-4">
            {presentation.presentation_details.presentation_subtitle}
          </p>

          <div className="mb-6">
            <a
              href={presentation.presentation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mr-4"
            >
              Download PPT
            </a>
            <a
              href={presentation.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View PDF
            </a>
          </div>

          {presentation.presentation_details.slides.map((slide, index) => (
            <div key={index} className="mb-8 border-b pb-6">
              <h3 className="text-xl font-semibold">{slide.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{slide.subtitle}</p>
              {slide.image_search && (
                <img
                  src={slide.image_search}
                  alt={`Slide ${index + 1}`}
                  className="w-full rounded-md h-64 object-cover mb-4"
                />
              )}
              <ul className="list-disc list-inside space-y-1">
                {slide.content.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.title}: </strong>
                    {item.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <p className="text-center text-white mt-6">⏳ Generating your presentation...</p>
      )}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}
    </div>
  );
}
