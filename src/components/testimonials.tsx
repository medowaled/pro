"use client";

import { RefObject } from "react";

interface Testimonial {
  name: string;
  grade: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  sectionRefs: RefObject<(HTMLElement | null)[]>;
  index: number;
  testimonials: Testimonial[];
  currentTestimonial: number;
  setCurrentTestimonial: (index: number) => void;
}

const Testimonials = ({
  sectionRefs,
  index,
  testimonials,
  currentTestimonial,
  setCurrentTestimonial,
}: TestimonialsProps) => {
  return (
    <section
      ref={(el) => {
        if (sectionRefs.current) {
          sectionRefs.current[index] = el;
        }
      }}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            ماذا يقول طلابنا؟
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            آراء طلابنا في تجربتهم مع أستاذ مصطفى
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/50 dark:to-green-900/50 p-8 rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-8 h-8 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                  {testimonials[currentTestimonial].name}
                </h4>
                {/* <p className="text-gray-600 dark:text-gray-400">
                  {testimonials[currentTestimonial].grade}
                </p> */}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? "bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
