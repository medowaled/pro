"use client";

import { useState, useEffect, useRef } from "react";

import Benifits from "@/components/benifits";
//import PreparatoryStages from "@/components/stages";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import Hero from "@/components/hero";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const testimonials = [
    {
      name: "عبدالله أيمن عبدالهادي",
      grade: "الصف الثاني متوسط",
      text: "بجد والله العظيم أحسن مستر في الكون كله مش في قليوب بس ربنا معاك يارب يا أغلى مستر في الكون كله بجد مش مقصر مع أي حد في أولى وتانية 💕",
      rating: 5,
    },
    {
      name: "جنى",
      grade: "الصف الثالث متوسط",
      text: "أحسن مدرس علوم والله العظيم في قليوب كلها 😍🥰",
      rating: 5,
    },
    {
      name: "سما أشرف",
      grade: "الصف الأول متوسط",
      text: "مستر مصطفى التوب وأشطر مدرس كدا كدا 😍",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animation logic can be added here if needed
        }
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <Hero />

      {/* Preparatory Stages Section */}
      <PreparatoryStages sectionRefs={sectionRefs} index={1} />

      {/* Benefits Section */}
      <Benifits sectionRefs={sectionRefs} index={0} />

      {/* About Section */}
      <About sectionRefs={sectionRefs} index={2} />

      {/* Testimonials Section */}
      <Testimonials
        sectionRefs={sectionRefs}
        index={3}
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />
    </div>
  );
}
