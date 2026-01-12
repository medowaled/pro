"use client";

import Image from "next/image";
import Link from "next/link";
import { RefObject } from "react";

interface PreparatoryStagesProps {
  sectionRefs: RefObject<(HTMLElement | null)[]>;
  index: number;
}

const PreparatoryStages = ({ sectionRefs, index }: PreparatoryStagesProps) => {
  return (
    <section
      ref={(el) => {
        if (sectionRefs.current) {
          sectionRefs.current[index] = el;
        }
      }}
      className="py-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            المراحل الإعدادية
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            دروس شاملة ومفصلة لجميع مراحل المرحلة الإعدادية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* First Preparatory */}
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600">
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 p-1">
                <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 group-hover:ring-purple-200 dark:group-hover:ring-purple-600 transition-all duration-300">
                  <Image
                    src="/mostafa-khalil.png"
                    alt="الصف الأول الإعدادي"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              الصف الأول الإعدادي
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-center leading-relaxed mb-4 text-lg font-medium">
              🎯 ابدأ صح من أول سنة... وافهم العلوم خطوة بخطوة مع أ/ مصطفى خليل
            </p>
            <p className="text-purple-600 dark:text-purple-400 text-center leading-relaxed mb-6 text-base font-semibold italic">
              الأساس القوي بيبدأ من هنا!
            </p>
            <div className="text-center">
              <Link href="/courses/first-prep">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  ابدأ التعلم
                </button>
              </Link>
            </div>
          </div>

          {/* Second Preparatory */}
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600">
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 p-1">
                <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-600 transition-all duration-300">
                  <Image
                    src="/mostafa-khalil.png"
                    alt="الصف الثاني الإعدادي"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              الصف الثاني الإعدادي
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-center leading-relaxed mb-4 text-lg font-medium">
              🚀 خد ثقتك للمرحلة اللي بعدها... وكمّل رحلتك في فهم العلوم بسهولة
              ووضوح
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-center leading-relaxed mb-6 text-base font-semibold italic">
              كل درس متشرح ببساطة... وكل معلومة هتفهمها وتثبت في دماغك
            </p>
            <div className="text-center">
              <Link href="/courses/second-prep">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  ابدأ التعلم
                </button>
              </Link>
            </div>
          </div>

          {/* Third Preparatory */}
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-transparent hover:border-green-300 dark:hover:border-green-600">
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 p-1">
                <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 group-hover:ring-green-200 dark:group-hover:ring-green-600 transition-all duration-300">
                  <Image
                    src="/mostafa-khalil.png"
                    alt="الصف الثالث الإعدادي"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
              الصف الثالث الإعدادي
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-center leading-relaxed mb-4 text-lg font-medium">
              🏆 استعد للمرحلة الحاسمة... وحقق أعلى الدرجات في العلوم مع شرح
              دقيق ومراجعات مركزة
            </p>
            <p className="text-green-600 dark:text-green-400 text-center leading-relaxed mb-6 text-base font-semibold italic">
              مع أ/ مصطفى خليل... التفوق مش حلم، التفوق قرار
            </p>
            <div className="text-center">
              <Link href="/courses/third-prep">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  ابدأ التعلم
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparatoryStages;
