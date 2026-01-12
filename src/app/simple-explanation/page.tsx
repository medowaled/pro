"use client";

import { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaLightbulb, FaPlay, FaStar, FaArrowRight, FaShareAlt, FaQuoteRight } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const explanationSamplesByGrade = {
  first: [
    {
      id: 1,
      title: "شرح تفاعلي بالرسوم المتحركة",
      description: "استخدام الرسوم المتحركة لتوضيح المفاهيم العلمية المعقدة بطريقة مبسطة.",
      videoUrl: "https://www.youtube.com/embed/lesson1"
    },
    {
      id: 2,
      title: "أمثلة من الحياة اليومية",
      description: "ربط الدروس بأمثلة واقعية من الحياة اليومية لزيادة الفهم.",
      videoUrl: "https://www.youtube.com/embed/lesson2"
    },
    {
      id: 3,
      title: "تجارب عملية مبسطة",
      description: "تنفيذ تجارب عملية بسيطة باستخدام أدوات منزلية.",
      videoUrl: "https://www.youtube.com/embed/lesson3"
    }
  ],
  second: [
    {
      id: 1,
      title: "شرح متعمق للمفاهيم المتقدمة",
      description: "شرح مفصل للمفاهيم العلمية المتقدمة بطريقة سهلة الفهم.",
      videoUrl: "https://www.youtube.com/embed/advanced1"
    },
    {
      id: 2,
      title: "حل المشكلات العلمية",
      description: "تعلم كيفية حل المشكلات العلمية خطوة بخطوة.",
      videoUrl: "https://www.youtube.com/embed/problem-solving"
    },
    {
      id: 3,
      title: "تجارب معملية متطورة",
      description: "تنفيذ تجارب معملية متطورة مع شرح مفصل لكل خطوة.",
      videoUrl: "https://www.youtube.com/embed/lab-experiments"
    }
  ],
  third: [
    {
      id: 1,
      title: "شرح متخصص للامتحان",
      description: "شرح يركز على نقاط القوة والضعف في امتحان الشهادة الإعدادية.",
      videoUrl: "https://www.youtube.com/embed/exam-prep"
    },
    {
      id: 2,
      title: "مراجعات مركزة",
      description: "مراجعات شاملة ومركزة لجميع وحدات المنهج.",
      videoUrl: "https://www.youtube.com/embed/focused-review"
    },
    {
      id: 3,
      title: "نماذج امتحانات سابقة",
      description: "حل نماذج امتحانات سابقة مع شرح مفصل للإجابات.",
      videoUrl: "https://www.youtube.com/embed/past-exams"
    }
  ]
};

const studentFeedbackByGrade = {
  first: [
    {
      name: "أحمد محمد",
      feedback: "الشرح كان واضح جدًا وساعدني أفهم الدرس بسهولة!"
    },
    {
      name: "سارة علي",
      feedback: "أحببت استخدام الأمثلة من الحياة اليومية، جعلت المعلومة قريبة لي."
    },
    {
      name: "يوسف إبراهيم",
      feedback: "الفيديوهات التوضيحية رائعة وتساعدني أراجع الدرس في أي وقت."
    }
  ],
  second: [
    {
      name: "فاطمة أحمد",
      feedback: "الشرح المتعمق ساعدني أفهم المفاهيم المعقدة بسهولة!"
    },
    {
      name: "محمد علي",
      feedback: "حل المشكلات العلمية أصبح أسهل بعد شرح الأستاذ."
    },
    {
      name: "عائشة حسن",
      feedback: "التجارب المعملية المتطورة رائعة ومفيدة جداً."
    }
  ],
  third: [
    {
      name: "خالد محمود",
      feedback: "الشرح المتخصص للامتحان ساعدني أتفوق في الامتحان!"
    },
    {
      name: "نور الدين",
      feedback: "المراجعات المركزة كانت مفيدة جداً للتحضير للامتحان."
    },
    {
      name: "ريم أحمد",
      feedback: "حل نماذج الامتحانات السابقة أعطاني ثقة كبيرة."
    }
  ]
};

const gradeInfo = {
  first: {
    title: "الشرح المبسط - الصف الأول الإعدادي",
    description: "شرح سهل وبسيط يناسب جميع مستويات الطلاب في الصف الأول الإعدادي",
    backLink: "/courses/first-prep",
    progressionText: "نبدأ بشرح المفاهيم الأساسية بشكل مبسط، ثم ننتقل تدريجيًا إلى الأمثلة العملية والتطبيقات الواقعية، مع دعم الشرح بفيديوهات توضيحية وتجارب عملية مبسطة."
  },
  second: {
    title: "الشرح المتعمق - الصف الثاني الإعدادي",
    description: "شرح مفصل للمفاهيم المتقدمة بطريقة سهلة الفهم للصف الثاني الإعدادي",
    backLink: "/courses/second-prep",
    progressionText: "نركز على المفاهيم المتقدمة مع شرح مفصل لكل خطوة، ونستخدم أمثلة عملية متطورة لحل المشكلات العلمية المعقدة."
  },
  third: {
    title: "الشرح المتخصص - الصف الثالث الإعدادي",
    description: "شرح متخصص يركز على نقاط القوة والضعف في امتحان الشهادة الإعدادية",
    backLink: "/courses/third-prep",
    progressionText: "نركز على التحضير الشامل للامتحان مع مراجعات مركزة ونماذج امتحانات سابقة مع حلول مفصلة."
  }
};

export default function SimpleExplanationPage() {
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade') as 'first' | 'second' | 'third' || 'first';
  const explanationSamples = explanationSamplesByGrade[grade] || explanationSamplesByGrade.first;
  const studentFeedback = studentFeedbackByGrade[grade] || studentFeedbackByGrade.first;
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

      {/* أمثلة على طرق الشرح */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaLightbulb className="text-yellow-400" /> أمثلة على طرق الشرح</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {explanationSamples.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <FaChalkboardTeacher className="text-white text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-green-600 transition-all"><FaPlay /> مشاهدة عينة فيديو</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* شرح التدرج في مستوى الشرح */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaChalkboardTeacher className="text-blue-500" /> آلية التدرج في الشرح</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{info.progressionText}</p>
            <p className="text-gray-600 dark:text-gray-400">نراعي الفروق الفردية بين الطلاب ونستخدم وسائل متنوعة لضمان الفهم الكامل للجميع.</p>
          </div>
        </div>
      </section>

      {/* ردود فعل الطلاب */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaQuoteRight className="text-green-500" /> ردود فعل الطلاب</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {studentFeedback.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <FaStar className="text-yellow-400 text-2xl mb-2" />
                <p className="text-gray-700 dark:text-gray-200 mb-2">{item.feedback}</p>
                <div className="text-gray-500 dark:text-gray-400 text-sm">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* نظام التقييم والمشاركة */}
      <section>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2"><FaStar className="text-yellow-500" /> تقييم جودة الشرح</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">شاركنا رأيك في جودة الشرح والطريقة التعليمية</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3,4,5].map((star) => <FaStar key={star} className="text-3xl cursor-pointer text-yellow-400 hover:scale-110 transition-transform" />)}
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-green-600 transition-all">إرسال التقييم</button>
        </div>
      </section>
    </div>
  );
} 