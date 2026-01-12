"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaClock, FaUsers, FaStar, FaBookOpen, FaGraduationCap } from "react-icons/fa";

export default function CoursesPage() {
  const courses = [
    {
      id: "first-prep",
      title: "الصف الأول الإعدادي",
      description: "دورة شاملة تغطي جميع مفاهيم العلوم للصف الأول الإعدادي",
      image: "/mostafa-khalil.png",
      duration: "سنة دراسية كاملة",
      students: "300+ طالب",
      rating: 4.9,
      lessons: 120,
      color: "from-purple-500 to-pink-500",
      features: [
        "أساسيات العلوم الطبيعية",
        "تجارب عملية تفاعلية",
        "شرح مبسط ومفصل",
        "اختبارات دورية",
        "دعم مباشر من الأستاذ"
      ]
    },
    {
      id: "second-prep",
      title: "الصف الثاني الإعدادي",
      description: "تطوير المهارات العلمية وتعميق الفهم للمفاهيم المتقدمة",
      image: "/mostafa-khalil.png",
      duration: "سنة دراسية كاملة",
      students: "250+ طالب",
      rating: 4.8,
      lessons: 140,
      color: "from-blue-500 to-cyan-500",
      features: [
        "مفاهيم متقدمة في العلوم",
        "تجارب معملية متطورة",
        "حل المشكلات العلمية",
        "مراجعات شاملة",
        "تحضير للصف الثالث"
      ]
    },
    {
      id: "third-prep",
      title: "الصف الثالث الإعدادي",
      description: "تحضير شامل لامتحان الشهادة الإعدادية مع التركيز على التفوق",
      image: "/mostafa-khalil.png",
      duration: "سنة دراسية كاملة",
      students: "200+ طالب",
      rating: 4.9,
      lessons: 160,
      color: "from-green-500 to-emerald-500",
      features: [
        "تحضير شامل للامتحان",
        "مراجعات مركزة",
        "نماذج امتحانات سابقة",
        "نصائح للتفوق",
        "دعم مكثف"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              الدورات التعليمية
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              دورات شاملة ومفصلة لجميع مراحل المرحلة الإعدادية مع أستاذ مصطفى خليل
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={course.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Course Header */}
                <div className={`bg-gradient-to-r ${course.color} p-8 rounded-t-2xl text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <FaBookOpen className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{course.title}</h3>
                          <p className="text-white/80 text-sm">دورة شاملة</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-300 text-lg" />
                        <span className="font-bold">{course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-white/80" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-white/80" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaGraduationCap className="text-white/80" />
                        <span>{course.lessons} درس</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-4">مميزات الدورة:</h4>
                    {course.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={`/courses/${course.id}`}>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      ابدأ التعلم الآن
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Courses */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              لماذا تختار دوراتنا؟
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              مميزات فريدة تجعل من دوراتنا الخيار الأمثل لتعلم العلوم
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaPlay className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                دروس مسجلة
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                أكثر من 500 درس مسجل عالي الجودة يمكنك مشاهدته في أي وقت
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                دعم مباشر
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                تواصل مباشر مع الأستاذ مصطفى خليل للإجابة على جميع استفساراتك
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                جودة عالية
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                محتوى تعليمي عالي الجودة مصمم خصيصاً لطلاب المرحلة الإعدادية
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                نتائج مضمونة
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                معدل نجاح 95% مع تحسن ملحوظ في درجات الطلاب
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              آراء الطلاب
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                ماذا يقول طلابنا عن دوراتنا التعليمية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                "دورات الأستاذ مصطفى غيرت حياتي الدراسية تماماً. الشرح سهل وبسيط والفهم أصبح ممتع"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">أحمد محمد</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">الصف الثالث الإعدادي</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                "أفضل مدرس علوم قابلته في حياتي. يشرح بطريقة رائعة ويفهم احتياجات الطلاب"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">سارة أحمد</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">الصف الثاني الإعدادي</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                "بفضل الأستاذ مصطفى نجحت في العلوم وحصلت على أعلى الدرجات. شكراً جزيلاً"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">علي حسن</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">الصف الأول الإعدادي</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 