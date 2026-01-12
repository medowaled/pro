"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaClock, FaUsers, FaStar, FaBookOpen, FaGraduationCap, FaCheckCircle, FaVideo, FaFlask } from "react-icons/fa";
import { GiMicroscope, GiFizzingFlask } from "react-icons/gi";
import { FaEarthAfrica } from "react-icons/fa6";

export default function SecondPrepPage() {
  const curriculum = [
    {
      unit: "الوحدة الأولى: الكيمياء المتقدمة",
      topics: [
        "الجدول الدوري الحديث",
        "الروابط الكيميائية",
        "الحموض والقواعد",
        "التفاعلات الكيميائية المتقدمة"
      ]
    },
    {
      unit: "الوحدة الثانية: الفيزياء المتقدمة",
      topics: [
        "الحركة الخطية والمنحنية",
        "قوانين نيوتن للحركة",
        "الشغل والطاقة والقدرة",
        "الموجات والاهتزازات"
      ]
    },
    {
      unit: "الوحدة الثالثة: علوم الأرض",
      topics: [
        "تركيب الأرض",
        "الصخور والمعادن",
        "الطقس والمناخ",
        "الموارد الطبيعية"
      ]
    },
    {
      unit: "الوحدة الرابعة: علوم الحياة المتقدمة",
      topics: [
        "الوراثة والجينات",
        "التطور والتصنيف",
        "النظم البيئية",
        "التكنولوجيا الحيوية"
      ]
    }
  ];

  const features = [
    {
      icon: <GiMicroscope className="text-3xl" />,
      title: "تجارب متطورة",
      description: "تجارب معملية متقدمة تساعد على فهم المفاهيم المعقدة"
    },
    {
      icon: <FaBookOpen className="text-3xl" />,
      title: "شرح متعمق",
      description: "شرح مفصل للمفاهيم المتقدمة بطريقة سهلة الفهم"
    },
    {
      icon: <FaPlay className="text-3xl" />,
      title: "دروس مسجلة",
      description: "140 درس مسجل عالي الجودة مع أمثلة عملية"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "دعم مكثف",
      description: "دعم مباشر ومكثف من الأستاذ مصطفى خليل"
    },
    {
      icon: <FaGraduationCap className="text-3xl" />,
      title: "اختبارات شاملة",
      description: "اختبارات دورية شاملة لقياس مستوى التقدم"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "تحضير للصف الثالث",
      description: "تحضير شامل للانتقال للصف الثالث الإعدادي"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-2xl text-white mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  الصف الثاني الإعدادي
                </h1>
                <p className="text-xl leading-relaxed mb-6">
                  خد ثقتك للمرحلة اللي بعدها... وكمّل رحلتك في فهم العلوم بسهولة ووضوح
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>سنة دراسية كاملة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>250+ طالب</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar />
                    <span>4.8/5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  عن الدورة
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    دورة متقدمة تطور المهارات العلمية وتعمق الفهم للمفاهيم المعقدة في العلوم.
                  </p>
                  <p>
                    تركز الدورة على تطوير مهارات التفكير النقدي وحل المشكلات العلمية،
                    مع التركيز على التحضير للصف الثالث الإعدادي.
                  </p>
                  <p>
                    مع أكثر من 140 درس مسجل، واختبارات شاملة، ودعم مكثف من الأستاذ مصطفى خليل.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl p-2">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/mostafa-khalil.png"
                      alt="الصف الثاني الإعدادي"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              مميزات الدورة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              مميزات فريدة تجعل من هذه الدورة الخيار الأمثل لتطوير مهاراتك العلمية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              // Determine the link for each feature card
              let href = null;
              switch (feature.title) {
                case "تجارب متطورة":
                  href = "/practical-experiments?grade=second";
                  break;
                case "شرح متعمق":
                  href = "/simple-explanation?grade=second";
                  break;
                case "دروس مسجلة":
                  href = "/recorded-lessons?grade=second";
                  break;
                case "دعم مكثف":
                  href = "/live-support?grade=second";
                  break;
                case "اختبارات شاملة":
                  href = "/periodic-tests?grade=second";
                  break;
                case "تحضير للصف الثالث":
                  href = "/certificate?grade=second";
                  break;
                default:
                  href = null;
              }
              const cardContent = (
                <>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </>
              );
              return href ? (
                <Link href={href} key={index} className="block bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {cardContent}
                </Link>
              ) : (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl shadow-lg">
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              محتوى الدورة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              منهج متقدم يغطي جميع وحدات العلوم للصف الثاني الإعدادي
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {curriculum.map((unit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-blue-600 dark:text-blue-400">
                  {unit.unit}
                </h3>
                <div className="space-y-3">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500 text-lg" />
                      <span className="text-gray-600 dark:text-gray-300">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            طور مهاراتك العلمية اليوم
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            انضم إلى أكثر من 250 طالب وطور مهاراتك العلمية بطريقة متقدمة وممتعة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                اشترك الآن
              </button>
            </Link>
            <Link href="/courses">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                عرض جميع الدورات
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 