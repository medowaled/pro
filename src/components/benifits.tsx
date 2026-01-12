"use client";
import { RefObject } from "react";

interface BenifitsProps {
  sectionRefs: RefObject<(HTMLElement | null)[]>;
  index: number;
}

const Benifits = ({ sectionRefs, index }: BenifitsProps) => {
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
            لماذا تختار مستر مصطفى؟
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            نقدم لك أفضل تجربة تعليمية مع مميزات فريدة
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Benefit Card 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 p-8 rounded-2xl hover-lift animate-slide-in-left">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              توفير الوقت
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              دروس منظمة ومختصرة تغطي جميع النقاط المهمة في وقت قصير
            </p>
          </div>

          {/* Benefit Card 2 */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 p-8 rounded-2xl hover-lift animate-fade-in-up">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              مشاهدة غير محدودة
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              شاهد الدروس مرات عديدة كما تريد في أي وقت ومن أي مكان
            </p>
          </div>

          {/* Benefit Card 3 */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/50 dark:to-orange-800/50 p-8 rounded-2xl hover-lift animate-slide-in-right">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              امتحانات مستمرة
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              تدريبات وامتحانات مستمرة لضمان الفهم والاستيعاب الجيد
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benifits;
