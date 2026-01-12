"use client";

import { useState, useEffect } from "react";
import { FaUsers, FaClock, FaPhone, FaEnvelope, FaCalendarAlt, FaStar, FaArrowRight, FaShareAlt, FaVideo, FaComments } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const liveSessionsByGrade = {
  first: [
    {
      id: 1,
      title: "محاضرة مباشرة - أساسيات العلوم",
      date: "السبت 16 مارس 2024",
      time: "6:00 مساءً",
      duration: "60 دقيقة",
      topic: "الطريقة العلمية وأدوات القياس",
      meetingLink: "https://meet.google.com/first-science"
    },
    {
      id: 2,
      title: "محاضرة مباشرة - الكيمياء الأساسية",
      date: "السبت 23 مارس 2024",
      time: "6:00 مساءً",
      duration: "60 دقيقة",
      topic: "الذرة والجزيئات والخواص الكيميائية",
      meetingLink: "https://meet.google.com/first-chemistry"
    },
    {
      id: 3,
      title: "محاضرة مباشرة - الفيزياء الأساسية",
      date: "السبت 30 مارس 2024",
      time: "6:00 مساءً",
      duration: "60 دقيقة",
      topic: "الحركة والقوى والطاقة",
      meetingLink: "https://meet.google.com/first-physics"
    }
  ],
  second: [
    {
      id: 1,
      title: "محاضرة مباشرة - الكيمياء المتقدمة",
      date: "السبت 16 مارس 2024",
      time: "7:00 مساءً",
      duration: "75 دقيقة",
      topic: "التفاعلات الكيميائية المتقدمة والتحليل الكهربائي",
      meetingLink: "https://meet.google.com/second-chemistry"
    },
    {
      id: 2,
      title: "محاضرة مباشرة - الفيزياء المتقدمة",
      date: "السبت 23 مارس 2024",
      time: "7:00 مساءً",
      duration: "75 دقيقة",
      topic: "الكهرباء والمغناطيسية والموجات",
      meetingLink: "https://meet.google.com/second-physics"
    },
    {
      id: 3,
      title: "محاضرة مباشرة - علوم الحياة المتقدمة",
      date: "السبت 30 مارس 2024",
      time: "7:00 مساءً",
      duration: "75 دقيقة",
      topic: "النظم البيئية والوراثة المتقدمة",
      meetingLink: "https://meet.google.com/second-biology"
    }
  ],
  third: [
    {
      id: 1,
      title: "محاضرة مباشرة - مراجعة شاملة للامتحان",
      date: "السبت 16 مارس 2024",
      time: "8:00 مساءً",
      duration: "90 دقيقة",
      topic: "مراجعة شاملة لجميع وحدات المنهج",
      meetingLink: "https://meet.google.com/third-review"
    },
    {
      id: 2,
      title: "محاضرة مباشرة - حل نماذج الامتحانات",
      date: "السبت 23 مارس 2024",
      time: "8:00 مساءً",
      duration: "90 دقيقة",
      topic: "حل نماذج امتحانات سابقة مع شرح مفصل",
      meetingLink: "https://meet.google.com/third-exams"
    },
    {
      id: 3,
      title: "محاضرة مباشرة - نصائح للتفوق",
      date: "السبت 30 مارس 2024",
      time: "8:00 مساءً",
      duration: "90 دقيقة",
      topic: "نصائح وإرشادات للتفوق في امتحان الشهادة الإعدادية",
      meetingLink: "https://meet.google.com/third-tips"
    }
  ]
};

const contactInfoByGrade = {
  first: {
    phone: "+20 123 456 7890",
    email: "first.grade@mostafa-khalil.com",
    whatsapp: "+20 123 456 7890",
    workHours: "الأحد - الخميس: 4:00 مساءً - 8:00 مساءً"
  },
  second: {
    phone: "+20 123 456 7891",
    email: "second.grade@mostafa-khalil.com",
    whatsapp: "+20 123 456 7891",
    workHours: "الأحد - الخميس: 5:00 مساءً - 9:00 مساءً"
  },
  third: {
    phone: "+20 123 456 7892",
    email: "third.grade@mostafa-khalil.com",
    whatsapp: "+20 123 456 7892",
    workHours: "الأحد - الخميس: 6:00 مساءً - 10:00 مساءً"
  }
};

const gradeInfo = {
  first: {
    title: "الدعم المباشر - الصف الأول الإعدادي",
    description: "تواصل مباشر مع الأستاذ مصطفى خليل للصف الأول الإعدادي",
    backLink: "/courses/first-prep",
    supportText: "دعم مباشر ومكثف للطلاب في الصف الأول الإعدادي مع جلسات مباشرة أسبوعية."
  },
  second: {
    title: "الدعم المكثف - الصف الثاني الإعدادي",
    description: "دعم مكثف ومباشر من الأستاذ مصطفى خليل للصف الثاني الإعدادي",
    backLink: "/courses/second-prep",
    supportText: "دعم مكثف ومتقدم للطلاب في الصف الثاني الإعدادي مع جلسات مباشرة متخصصة."
  },
  third: {
    title: "الدعم المتخصص - الصف الثالث الإعدادي",
    description: "دعم مكثف ومتخصص من الأستاذ مصطفى خليل للصف الثالث الإعدادي",
    backLink: "/courses/third-prep",
    supportText: "دعم متخصص ومكثف للطلاب في الصف الثالث الإعدادي مع التركيز على التحضير للامتحان."
  }
};

export default function LiveSupportPage() {
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade') as 'first' | 'second' | 'third' || 'first';
  const liveSessions = liveSessionsByGrade[grade] || liveSessionsByGrade.first;
  const contactInfo = contactInfoByGrade[grade] || contactInfoByGrade.first;
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

      {/* جدول الجلسات المباشرة */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaVideo className="text-blue-500" /> جدول الجلسات المباشرة</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{info.supportText}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {liveSessions.map((session) => (
                <div key={session.id} className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{session.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{session.topic}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{session.time} ({session.duration})</span>
                    </div>
                  </div>
                  <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center mt-4 hover:from-purple-600 hover:to-pink-600 transition-all"><FaVideo /> انضم للجلسة</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* طرق التواصل */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaComments className="text-green-500" /> طرق التواصل</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaPhone className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">اتصال هاتفي</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{contactInfo.phone}</p>
              <a href={`tel:${contactInfo.phone}`} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">اتصل الآن</a>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaEnvelope className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">بريد إلكتروني</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{contactInfo.email}</p>
              <a href={`mailto:${contactInfo.email}`} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all">أرسل بريد</a>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaComments className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">واتساب</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{contactInfo.whatsapp}</p>
              <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">راسل على واتساب</a>
            </div>
          </div>
        </div>
      </section>

      {/* ساعات العمل */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaClock className="text-yellow-500" /> ساعات العمل</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaClock className="text-white text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">ساعات الدعم المباشر</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{contactInfo.workHours}</p>
            <p className="text-gray-600 dark:text-gray-400">الجمعة والسبت: متاح للاستفسارات العاجلة عبر الواتساب</p>
          </div>
        </div>
      </section>

      {/* نظام الحجز */}
      <section>
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><FaCalendarAlt className="text-purple-500" /> نظام الحجز</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">حجز جلسة خاصة</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">احجز جلسة خاصة مع الأستاذ مصطفى خليل لمراجعة موضوع معين أو حل مشكلة محددة.</p>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">احجز جلسة خاصة</button>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">استفسار سريع</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">أرسل استفسارك السريع عبر الواتساب أو البريد الإلكتروني للحصول على إجابة فورية.</p>
                <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all">أرسل استفسار</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* نظام التقييم والمشاركة */}
      <section>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2"><FaStar className="text-yellow-500" /> تقييم الدعم المباشر</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">شاركنا رأيك في جودة الدعم المباشر وسرعة الاستجابة</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3,4,5].map((star) => <FaStar key={star} className="text-3xl cursor-pointer text-yellow-400 hover:scale-110 transition-transform" />)}
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-green-600 transition-all">إرسال التقييم</button>
        </div>
      </section>
    </div>
  );
} 