"use client";

import { useState, useEffect } from "react";
import { FaCertificate, FaDownload, FaCheckCircle, FaStar, FaArrowRight, FaShareAlt, FaGraduationCap, FaFileAlt, FaTruck } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const certificateInfoByGrade = {
  first: {
    title: "شهادة إتمام - الصف الأول الإعدادي",
    description: "شهادة معتمدة بعد إتمام دورة الصف الأول الإعدادي بنجاح",
    backLink: "/courses/first-prep",
    requirements: [
      "إتمام جميع الدروس المسجلة (120 درس)",
      "حضور 80% من الجلسات المباشرة",
      "إتمام جميع الاختبارات الدورية بنجاح",
      "تنفيذ 5 تجارب عملية على الأقل",
      "الحصول على تقييم إيجابي من الأستاذ"
    ],
    deliveryMethods: [
      {
        method: "تسليم شخصي",
        description: "استلام الشهادة مباشرة من الأستاذ مصطفى خليل",
        icon: <FaGraduationCap className="text-3xl" />
      },
      {
        method: "شحن مجاني",
        description: "إرسال الشهادة عبر البريد السريع إلى العنوان المحدد",
        icon: <FaTruck className="text-3xl" />
      },
      {
        method: "نسخة إلكترونية",
        description: "تحميل نسخة PDF من الشهادة مع إمكانية الطباعة",
        icon: <FaFileAlt className="text-3xl" />
      }
    ],
    previewText: "شهادة معتمدة من الأستاذ مصطفى خليل تؤكد إتمام دورة الصف الأول الإعدادي بنجاح مع التوقيع والختم الرسمي."
  },
  second: {
    title: "شهادة إتمام - الصف الثاني الإعدادي",
    description: "شهادة معتمدة بعد إتمام دورة الصف الثاني الإعدادي بنجاح",
    backLink: "/courses/second-prep",
    requirements: [
      "إتمام جميع الدروس المسجلة (140 درس)",
      "حضور 85% من الجلسات المباشرة",
      "إتمام جميع الاختبارات الشاملة بنجاح",
      "تنفيذ 8 تجارب معملية متطورة",
      "الحصول على تقييم ممتاز من الأستاذ"
    ],
    deliveryMethods: [
      {
        method: "تسليم شخصي",
        description: "استلام الشهادة مباشرة من الأستاذ مصطفى خليل",
        icon: <FaGraduationCap className="text-3xl" />
      },
      {
        method: "شحن مجاني",
        description: "إرسال الشهادة عبر البريد السريع إلى العنوان المحدد",
        icon: <FaTruck className="text-3xl" />
      },
      {
        method: "نسخة إلكترونية",
        description: "تحميل نسخة PDF من الشهادة مع إمكانية الطباعة",
        icon: <FaFileAlt className="text-3xl" />
      }
    ],
    previewText: "شهادة معتمدة من الأستاذ مصطفى خليل تؤكد إتمام دورة الصف الثاني الإعدادي بنجاح مع التوقيع والختم الرسمي."
  },
  third: {
    title: "شهادة إتمام - الصف الثالث الإعدادي",
    description: "شهادة معتمدة بعد إتمام دورة الصف الثالث الإعدادي والتحضير للشهادة الإعدادية",
    backLink: "/courses/third-prep",
    requirements: [
      "إتمام جميع الدروس المسجلة (160 درس)",
      "حضور 90% من الجلسات المباشرة",
      "حل جميع نماذج الامتحانات السابقة",
      "تنفيذ 10 تجارب متقدمة",
      "الحصول على تقييم ممتاز في الاختبارات النهائية"
    ],
    deliveryMethods: [
      {
        method: "تسليم شخصي",
        description: "استلام الشهادة مباشرة من الأستاذ مصطفى خليل",
        icon: <FaGraduationCap className="text-3xl" />
      },
      {
        method: "شحن مجاني",
        description: "إرسال الشهادة عبر البريد السريع إلى العنوان المحدد",
        icon: <FaTruck className="text-3xl" />
      },
      {
        method: "نسخة إلكترونية",
        description: "تحميل نسخة PDF من الشهادة مع إمكانية الطباعة",
        icon: <FaFileAlt className="text-3xl" />
      }
    ],
    previewText: "شهادة معتمدة من الأستاذ مصطفى خليل تؤكد إتمام دورة الصف الثالث الإعدادي والتحضير الشامل للشهادة الإعدادية مع التوقيع والختم الرسمي."
  }
};

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade') as 'first' | 'second' | 'third' || 'first';
  const info = certificateInfoByGrade[grade] || certificateInfoByGrade.first;

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

      {/* كيفية الحصول على الشهادة */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaCertificate className="text-yellow-500" /> كيفية الحصول على الشهادة</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">للحصول على شهادة الإتمام، يجب على الطالب إتمام جميع المتطلبات التالية:</p>
            <div className="grid md:grid-cols-2 gap-6">
              {info.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4">
                  <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* معاينة الشهادة */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaFileAlt className="text-blue-500" /> معاينة الشهادة</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCertificate className="text-white text-6xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">شهادة إتمام الدورة</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{info.previewText}</p>
              <div className="flex justify-center gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all flex items-center gap-2">
                  <FaDownload /> تحميل معاينة
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2">
                  <FaShareAlt /> مشاركة
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* طرق التوصيل */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaTruck className="text-green-500" /> طرق التوصيل</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {info.deliveryMethods.map((method, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto text-white">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{method.method}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all">اختيار هذه الطريقة</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* مميزات الشهادة */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaStar className="text-yellow-500" /> مميزات الشهادة</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCheckCircle className="text-white text-xl" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">معتمدة رسمياً</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">شهادة معتمدة من الأستاذ مصطفى خليل</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaFileAlt className="text-white text-xl" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">قابلة للطباعة</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">يمكن طباعتها بجودة عالية</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaShareAlt className="text-white text-xl" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">قابلة للمشاركة</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">يمكن مشاركتها على وسائل التواصل</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaStar className="text-white text-xl" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">مميزة</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">تصميم مميز وألوان جذابة</p>
            </div>
          </div>
        </div>
      </section>

      {/* نظام التقييم والمشاركة */}
      <section>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2"><FaStar className="text-yellow-500" /> تقييم الشهادة</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">شاركنا رأيك في تصميم ومحتوى الشهادة</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3,4,5].map((star) => <FaStar key={star} className="text-3xl cursor-pointer text-yellow-400 hover:scale-110 transition-transform" />)}
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-green-600 transition-all">إرسال التقييم</button>
        </div>
      </section>
    </div>
  );
} 