"use client";

import { useForm } from "react-hook-form";

export default function GradeLevel() {
  const { register, } = useForm();

  return (
    <div>
      <label className="block font-semibold">Grade level: *</label>
      <select {...register("gradeLevel")} className="w-full p-2 border rounded">
        <option value="Primary 1">Primary 1</option>
        <option value="Primary 2">Primary 2</option>
        <option value="Primary 3">Primary 3</option>
        <option value="Primary 4">Primary 4</option>
        <option value="Primary 5">Primary 5</option>
        <option value="Primary 6">Primary 6</option>

        <option value="JSS 1">JSS 1</option>
        <option value="JSS 2">JSS 2</option>
        <option value="JSS 3">JSS 3</option>

        <option value="SSS 1">SSS 1</option>
        <option value="SSS 2">SSS 2</option>
        <option value="SSS 3">SSS 3</option>

        <option value="University">University</option>
      </select>
    </div>
  );
}
