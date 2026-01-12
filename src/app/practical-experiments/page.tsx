"use client";

import { useState, useEffect } from "react";
import { FaFlask, FaPlay, FaDownload, FaList, FaExclamationTriangle, FaBullseye, FaStar, FaArrowRight, FaShareAlt } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const experimentsByGrade = {
  first: [
    {
      id: 1,
      title: "تجربة قياس الكثافة",
      videoUrl: "https://www.youtube.com/embed/example1",
      pdfUrl: "/pdfs/density-experiment.pdf",
      tools: ["ميزان حساس", "أسطوانة مدرجة", "ماء", "أجسام مختلفة الكتلة"],
      safety: ["ارتداء معطف المختبر", "عدم لمس المواد الكيميائية مباشرة", "تنظيف الأدوات بعد الانتهاء"],
      goals: ["تعلم كيفية قياس الكثافة", "فهم العلاقة بين الكتلة والحجم والكثافة"]
    },
    {
      id: 2,
      title: "تجربة التفاعل الكيميائي البسيط",
      videoUrl: "https://www.youtube.com/embed/example2",
      pdfUrl: "/pdfs/chemical-reaction.pdf",
      tools: ["أنبوب اختبار", "حمض الهيدروكلوريك", "صودا الخبز", "ملعقة"],
      safety: ["ارتداء نظارات واقية", "عدم استنشاق الأبخرة الناتجة", "إبعاد المواد عن الوجه"],
      goals: ["مشاهدة تفاعل الحمض مع القاعدة", "تكوين الملح والماء"]
    },
    {
      id: 3,
      title: "تجربة الخلية الحية",
      videoUrl: "https://www.youtube.com/embed/example3",
      pdfUrl: "/pdfs/cell-experiment.pdf",
      tools: ["شريحة مجهرية", "مجهر ضوئي", "بصلة", "ماء يود"],
      safety: ["عدم لمس العدسات بالأصابع", "تنظيف الشريحة بعد الاستخدام", "الحذر عند استخدام المجهر"],
      goals: ["فحص خلايا البصل", "التعرف على مكونات الخلية الحية"]
    }
  ],
  second: [
    {
      id: 1,
      title: "تجربة التحليل الكهربائي",
      videoUrl: "https://www.youtube.com/embed/electrolysis",
      pdfUrl: "/pdfs/electrolysis-experiment.pdf",
      tools: ["بطارية", "أسلاك نحاسية", "ماء مقطر", "ملح الطعام"],
      safety: ["ارتداء قفازات", "عدم لمس الأسلاك أثناء التجربة", "إبعاد الماء عن البطارية"],
      goals: ["فهم التحليل الكهربائي", "مشاهدة انفصال العناصر"]
    },
    {
      id: 2,
      title: "تجربة قياس سرعة التفاعل",
      videoUrl: "https://www.youtube.com/embed/reaction-rate",
      pdfUrl: "/pdfs/reaction-rate.pdf",
      tools: ["حمض الكبريتيك", "صودا الخبز", "ميزان حساس", "ساعة إيقاف"],
      safety: ["ارتداء نظارات واقية", "استخدام حمض مخفف", "تنظيف الأدوات فوراً"],
      goals: ["قياس سرعة التفاعل", "فهم العوامل المؤثرة على السرعة"]
    },
    {
      id: 3,
      title: "تجربة الانكسار والانعكاس",
      videoUrl: "https://www.youtube.com/embed/refraction",
      pdfUrl: "/pdfs/refraction-experiment.pdf",
      tools: ["مصدر ضوء", "مرآة", "منشور زجاجي", "شاشة"],
      safety: ["عدم النظر مباشرة للضوء", "الحذر من الزجاج المكسور", "تنظيف الأدوات"],
      goals: ["فهم ظاهرة الانكسار", "مشاهدة انعكاس الضوء"]
    }
  ],
  third: [
    {
      id: 1,
      title: "تجربة التحليل الكيميائي المتقدم",
      videoUrl: "https://www.youtube.com/embed/advanced-analysis",
      pdfUrl: "/pdfs/advanced-analysis.pdf",
      tools: ["محاليل كيميائية", "مؤشرات pH", "أنابيب اختبار", "مقياس pH"],
      safety: ["ارتداء معدات الحماية الكاملة", "استخدام المواد في غرفة جيدة التهوية", "التخلص الآمن من النفايات"],
      goals: ["تعلم التحليل الكيميائي", "فهم تفاعلات الأحماض والقواعد"]
    },
    {
      id: 2,
      title: "تجربة الدوائر الكهربائية",
      videoUrl: "https://www.youtube.com/embed/electric-circuits",
      pdfUrl: "/pdfs/electric-circuits.pdf",
      tools: ["بطاريات", "أسلاك", "مصباح LED", "مقياس الجهد"],
      safety: ["عدم استخدام جهد عالي", "فصل البطارية بعد التجربة", "فحص الأسلاك"],
      goals: ["بناء دوائر كهربائية بسيطة", "فهم قانون أوم"]
    },
    {
      id: 3,
      title: "تجربة الوراثة والجينات",
      videoUrl: "https://www.youtube.com/embed/genetics",
      pdfUrl: "/pdfs/genetics-experiment.pdf",
      tools: ["شرائح مجهرية", "مجهر إلكتروني", "عينات وراثية", "أدوات تحليل"],
      safety: ["ارتداء قفازات", "عدم لمس العينات مباشرة", "تنظيف الأدوات"],
      goals: ["فهم أساسيات الوراثة", "مشاهدة الجينات تحت المجهر"]
    }
  ]
};

const gradeInfo = {
  first: {
    title: "التجارب العملية - الصف الأول الإعدادي",
    description: "تجارب عملية تفاعلية للصف الأول الإعدادي مع فيديوهات وملفات توثيقية",
    backLink: "/courses/first-prep"
  },
  second: {
    title: "التجارب العملية - الصف الثاني الإعدادي",
    description: "تجارب معملية متطورة للصف الثاني الإعدادي مع فيديوهات وملفات توثيقية",
    backLink: "/courses/second-prep"
  },
  third: {
    title: "التجارب العملية - الصف الثالث الإعدادي",
    description: "تجارب متقدمة للصف الثالث الإعدادي مع فيديوهات وملفات توثيقية",
    backLink: "/courses/third-prep"
  }
};

export default function PracticalExperimentsPage() {
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade') as 'first' | 'second' | 'third' || 'first';
  const experiments = experimentsByGrade[grade] || experimentsByGrade.first;
  const info = gradeInfo[grade] || gradeInfo.first;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-10">
      {/* زر الرجوع */}
      <div className="container mx-auto px-4 flex justify-end mt-4">
        <Link href={info.backLink} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          <FaArrowRight className="ml-1" /> رجوع للصفحة السابقة
        </Link>
      </div>

      {/* العنوان */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{info.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{info.description}</p>
          </div>
        </div>
      </section>

      {/* معرض التجارب */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            {experiments.map((exp) => (
              <div key={exp.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <FaFlask className="text-white text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">{exp.title}</h3>
                <a href={exp.videoUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center mb-3 hover:from-purple-600 hover:to-pink-600 transition-all"><FaPlay /> مشاهدة الفيديو</a>
                <a href={exp.pdfUrl} download className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center mb-3 hover:from-blue-600 hover:to-green-600 transition-all"><FaDownload /> تحميل PDF</a>
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1 text-blue-600 font-bold"><FaList /> الأدوات المستخدمة:</div>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                    {exp.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                  </ul>
                </div>
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1 text-yellow-600 font-bold"><FaExclamationTriangle /> تحذيرات الأمان:</div>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                    {exp.safety.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1 text-green-600 font-bold"><FaBullseye /> أهداف التجربة:</div>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                    {exp.goals.map((g, i) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center mt-2 hover:from-purple-600 hover:to-pink-600 transition-all"><FaShareAlt /> مشاركة التجربة</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* نظام التقييم والمشاركة */}
      <section>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2"><FaStar className="text-yellow-500" /> تقييم التجارب</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">شاركنا رأيك في جودة التجارب العملية</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3,4,5].map((star) => <FaStar key={star} className="text-3xl cursor-pointer text-yellow-400 hover:scale-110 transition-transform" />)}
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-green-600 transition-all">إرسال التقييم</button>
        </div>
      </section>
    </div>
  );
} 