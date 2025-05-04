"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import Link from "next/link";

const tools = [
  { name: "Academic Content", description: "Create customized academic content.", icon: "📚", href: "/dashboard/academic-content-generator" },
  { name: "Presentation Generator", description: "Generate AI-powered slides.", icon: "🔥", href: "/dashboard/presentation-generator" },
  { name: "Multiple Choice Quiz/Assessment", description: "Create quizzes based on topics.", icon: "❓", href: "/dashboard/multiple-choice-quiz-generator" }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#000511] from-purple-600 to-purple-800 text-white p-6">
      {/* Hero Section */}
      <section className="text-center py-16">
      <Image className="mx-auto mb-[30px]" src="/images/sai.png" alt="SAI 2" width={300} height={200} />
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Dashboard
        </motion.h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Award-winning AI for educators that saves time, prevents teacher burnout, and creates immersive learning experiences for students.
        </p>
        {/* <Button className="mt-6 bg-white text-purple-600 hover:bg-purple-200">
          <Link href={"/signup"}>Sign up free →</Link>
        </Button> */}
      </section>

      {/* Tools Section */}
      <section className="mt-[50px]">
        <h2 className="text-3xl font-semibold text-center">Choose One</h2>
        <div className="mt-[22px] flex justify-center gap-[50px]">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={tool.href}>
                <Card className="text-gray-800">
                  <CardContent className="flex flex-col items-center text-center">
                    <span className="text-3xl">{tool.icon}</span>
                    <h3 className="font-semibold mt-2 text-lg">{tool.name}</h3>
                    <p className="text-sm mt-1">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
