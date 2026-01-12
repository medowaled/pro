import { RefObject } from "react";

import { GiFizzingFlask } from "react-icons/gi";
import { PiDnaLight } from "react-icons/pi";
import { GiMicroscope } from "react-icons/gi";
import { HiMiniBeaker } from "react-icons/hi2";
import { LuTestTubeDiagonal } from "react-icons/lu";
import { PiAtomLight } from "react-icons/pi";
import { FaEarthAfrica } from "react-icons/fa6";

interface AboutProps {
  sectionRefs: RefObject<(HTMLElement | null)[]>;
  index: number;
}

const About = ({ sectionRefs, index }: AboutProps) => {
  return (
    <section
      id="about"
      ref={(el) => {
        if (sectionRefs.current) {
          sectionRefs.current[index] = el;
        }
      }}
      className="py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background Science Icons */}
      <div className="hidden md:block absolute inset-0 opacity-15 dark:opacity-20 pointer-events-none z-0">
        {/* Atom Icon */}
        <div className="absolute top-10 left-10 text-blue-400 dark:text-blue-300">
          <PiAtomLight size={120} />
        </div>

        {/* Flask Icon */}
        <div className="absolute bottom-20 left-20 text-purple-400 dark:text-purple-300">
          <GiFizzingFlask size={120} />
        </div>

        {/* Microscope Icon */}
        <div className="absolute top-20 right-20 text-green-400 dark:text-green-300">
          <GiMicroscope size={120} />
        </div>

        {/* DNA Helix */}
        <div className="absolute bottom-10 right-10 text-orange-400 dark:text-orange-300">
          <PiDnaLight size={120} />
        </div>

        {/* Chemistry Beaker */}
        <div className="absolute top-1/3 left-1/4 text-cyan-400 dark:text-cyan-300">
          <HiMiniBeaker size={120} />
        </div>

        {/* Earth Icon */}
        <div className="absolute bottom-1/3 right-1/4 text-indigo-400 dark:text-indigo-300">
          <FaEarthAfrica size={120} />
        </div>

        {/* Test Tube */}
        <div className="absolute top-2/3 left-1/3 text-emerald-400 dark:text-emerald-300">
          <LuTestTubeDiagonal size={120} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 animate-slide-in-left">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                عن أستاذ مصطفى
              </h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  مدرس علوم متميز مع أكثر من{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    22 عام
                  </span>{" "}
                  من الخبرة في تدريس طلاب المرحلة الإعدادية.
                </p>
                <p>
                  متخصص في تبسيط المفاهيم العلمية المعقدة وجعلها سهلة الفهم
                  للطلاب.
                </p>
                <p>
                  حاصل على شهادات متقدمة في طرق التدريس الحديثة وتكنولوجيا
                  التعليم.
                </p>
                <p>ساعد أكثر من 1000 طالب في تحسين درجاتهم في مادة العلوم.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full font-semibold">
                  22+ سنة خبرة
                </div>
                <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-4 py-2 rounded-full font-semibold">
                  1000+ طالب
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 px-4 py-2 rounded-full font-semibold">
                  95% نجاح
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center animate-slide-in-right">
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-80 h-80 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                      22
                    </div>
                    <div className="text-xl text-gray-600 dark:text-gray-400">
                      عام من الخبرة
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
