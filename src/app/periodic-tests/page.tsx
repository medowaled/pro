"use client";

import { useState, useEffect } from "react";
import { FaFileAlt, FaDownload, FaCalendarAlt, FaClock, FaStar, FaArrowRight, FaShareAlt, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const testsByGrade = {
  first: [
    {
      id: 1,
      title: "اختبار الوحدة الأولى - أساسيات العلوم",
      date: "15 مارس 2024",
      duration: "45 دقيقة",
      questions: 20,
      pdfUrl: "/pdfs/test1-first.pdf",
      description: "اختبار شامل يغطي أساسيات العلوم الطبيعية والطريقة العلمية"
    },
    {
      id: 2,
      title: "اختبار الوحدة الثانية - الكيمياء الأساسية",
      date: "30 مارس 2024",
      duration: "60 دقيقة",
      questions: 25,
      pdfUrl: "/pdfs/test2-first.pdf",
      description: "اختبار في الذرة والجزيئات والخواص الفيزيائية والكيميائية"
    },
    {
      id: 3,
      title: "اختبار الوحدة الثالثة - الفيزياء الأساسية",
      date: "15 أبريل 2024",
      duration: "60 دقيقة",
      questions: 25,
      pdfUrl: "/pdfs/test3-first.pdf",
      description: "اختبار في الحركة والقوى والطاقة وأنواعها"
    }
  ],
  second: [
    {
      id: 1,
      title: "اختبار الوحدة الأولى - الكيمياء المتقدمة",
      date: "20 مارس 2024",
      duration: "60 دقيقة",
      questions: 30,
      pdfUrl: "/pdfs/test1-second.pdf",
      description: "اختبار في التفاعلات الكيميائية المتقدمة والتحليل الكهربائي"
    },
    {
      id: 2,
      title: "اختبار الوحدة الثانية - الفيزياء المتقدمة",
      date: "5 أبريل 2024",
      duration: "75 دقيقة",
      questions: 35,
      pdfUrl: "/pdfs/test2-second.pdf",
      description: "اختبار في الكهرباء والمغناطيسية والموجات"
    },
    {
      id: 3,
      title: "اختبار الوحدة الثالثة - علوم الحياة المتقدمة",
      date: "20 أبريل 2024",
      duration: "60 دقيقة",
      questions: 30,
      pdfUrl: "/pdfs/test3-second.pdf",
      description: "اختبار في النظم البيئية والوراثة المتقدمة"
    }
  ],
  third: [
    {
      id: 1,
      title: "نموذج امتحان الشهادة الإعدادية - 2023",
      date: "10 مارس 2024",
      duration: "90 دقيقة",
      questions: 40,
      pdfUrl: "/pdfs/exam-2023.pdf",
      description: "نموذج امتحان الشهادة الإعدادية للعام الدراسي 2023"
    },
    {
      id: 2,
      title: "نموذج امتحان الشهادة الإعدادية - 2022",
      date: "25 مارس 2024",
      duration: "90 دقيقة",
      questions: 40,
      pdfUrl: "/pdfs/exam-2022.pdf",
      description: "نموذج امتحان الشهادة الإعدادية للعام الدراسي 2022"
    },
    {
      id: 3,
      title: "نموذج امتحان الشهادة الإعدادية - 2021",
      date: "10 أبريل 2024",
      duration: "90 دقيقة",
      questions: 40,
      pdfUrl: "/pdfs/exam-2021.pdf",
      description: "نموذج امتحان الشهادة الإعدادية للعام الدراسي 2021"
    }
  ]
};

const gradeInfo = {
  first: {
    title: "الاختبارات الدورية - الصف الأول الإعدادي",
    description: "اختبارات شاملة لقياس مستوى التقدم في الصف الأول الإعدادي",
    backLink: "/courses/first-prep",
    scheduleText: "يتم إجراء الاختبارات الدورية كل أسبوعين لتقييم مستوى الفهم والتقدم في الدراسة.",
    gradingText: "نظام تقييم شامل يعتمد على الفهم العميق للمفاهيم وليس الحفظ فقط."
  },
  second: {
    title: "الاختبارات الشاملة - الصف الثاني الإعدادي",
    description: "اختبارات شاملة ومتطورة لقياس مستوى التقدم في الصف الثاني الإعدادي",
    backLink: "/courses/second-prep",
    scheduleText: "يتم إجراء الاختبارات الشاملة كل أسبوع لتقييم مستوى الفهم المتقدم والتطبيق العملي.",
    gradingText: "نظام تقييم متقدم يركز على حل المشكلات والتطبيق العملي للمفاهيم."
  },
  third: {
    title: "نماذج امتحانات الشهادة الإعدادية - الصف الثالث الإعدادي",
    description: "نماذج امتحانات سابقة مع حلول مفصلة للتحضير للشهادة الإعدادية",
    backLink: "/courses/third-prep",
    scheduleText: "نماذج امتحانات سابقة مع حلول مفصلة لتدريب الطلاب على شكل الامتحان النهائي.",
    gradingText: "نظام تقييم محاكي للامتحان النهائي مع شرح مفصل للإجابات الصحيحة."
  }
};

export default function PeriodicTestsPage() {
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade') as 'first' | 'second' | 'third' || 'first';
  const tests = testsByGrade[grade] || testsByGrade.first;
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

      {/* جدول الاختبارات */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> جدول الاختبارات</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{info.scheduleText}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {tests.map((test) => (
                <div key={test.id} className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{test.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{test.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">{test.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFileAlt className="text-purple-500" />
                      <span className="text-gray-700 dark:text-gray-300">{test.questions} سؤال</span>
                    </div>
                  </div>
                  <a href={test.pdfUrl} download className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center mt-4 hover:from-blue-600 hover:to-green-600 transition-all"><FaDownload /> تحميل الاختبار</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* أنواع الأسئلة */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaFileAlt className="text-green-500" /> أنواع الأسئلة</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCheckCircle className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">أسئلة اختيار من متعدد</h3>
              <p className="text-gray-600 dark:text-gray-400">أسئلة متعددة الخيارات لاختبار الفهم السريع للمفاهيم</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaFileAlt className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">أسئلة مقالية</h3>
              <p className="text-gray-600 dark:text-gray-400">أسئلة مقالية لاختبار الفهم العميق والقدرة على التعبير</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaClock className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">أسئلة تطبيقية</h3>
              <p className="text-gray-600 dark:text-gray-400">أسئلة تطبيقية لاختبار القدرة على حل المشكلات العلمية</p>
            </div>
          </div>
        </div>
      </section>

      {/* نظام التقييم */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaStar className="text-yellow-500" /> نظام التقييم</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{info.gradingText}</p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">معايير التقييم</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> الفهم العميق للمفاهيم</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> القدرة على التطبيق العملي</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> حل المشكلات العلمية</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> الدقة في الإجابات</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">نقاط التقييم</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> أسئلة الاختيار: 40%</li>
                  <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> الأسئلة المقالية: 35%</li>
                  <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> الأسئلة التطبيقية: 25%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* نظام التقييم والمشاركة */}
      <section>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2"><FaStar className="text-yellow-500" /> تقييم الاختبارات</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">شاركنا رأيك في جودة الاختبارات ومستوى الصعوبة</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3,4,5].map((star) => <FaStar key={star} className="text-3xl cursor-pointer text-yellow-400 hover:scale-110 transition-transform" />)}
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-green-600 transition-all">إرسال التقييم</button>
        </div>
      </section>
    </div>
  );
} 