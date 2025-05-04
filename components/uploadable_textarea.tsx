import { useState, useEffect } from "react";
import { Upload, Trash2 } from "lucide-react";

// Define form fields structure
interface FormData {
  additionalCriteria: string;
  uploadedContent: File[];
  gradeLevel: string;
  contentType: string;
  textLength: string;
  topic: string;
  standardObjective: string;
}

interface UploadableTextareaProps {
  setValue: (name: keyof FormData, value: any) => void;
}

export default function UploadableTextarea({ setValue }: UploadableTextareaProps) {
  const [text, setText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setValue("additionalCriteria", text);
    setValue("uploadedContent", files);
  }, [text, files, setValue]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      <label className="block font-semibold">Additional Criteria:</label>
      <div className="mt-[-10px] relative">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Type here or upload files (.docx and .pdf)..."
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label className="absolute bottom-3 right-3 cursor-pointer text-gray-500 hover:text-blue-500">
          <Upload size={20} />
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Uploaded Files:</strong>
          <ul className="mt-1 space-y-1">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <span className="truncate">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
