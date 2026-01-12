"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaClock, FaUsers, FaStar, FaBookOpen, FaGraduationCap, FaCheckCircle, FaTrophy, FaVideo, FaFlask } from "react-icons/fa";
import { GiMicroscope, GiFizzingFlask } from "react-icons/gi";
import { FaEarthAfrica } from "react-icons/fa6";

export default function ThirdPrepPage() {
  const curriculum = [
    {
      unit: "الوحدة الأولى: الكيمياء الشاملة",
      topics: [
        "الجدول الدوري والخصائص الدورية",
        "الروابط الكيميائية المتقدمة",
        "الحموض والقواعد والأملاح",
        "التفاعلات الكيميائية الشاملة"
      ]
    },
    {
      unit: "الوحدة الثانية: الفيزياء الشاملة",
      topics: [
        "الحركة والقوى المتقدمة",
        "الطاقة وتحولاتها",
        "الكهرباء والمغناطيسية",
        "الضوء والموجات"
      ]
    },
    {
      unit: "الوحدة الثالثة: علوم الأرض والكون",
      topics: [
        "تركيب الأرض والظواهر الجيولوجية",
        "الطقس والمناخ والبيئة",
        "الكون والأجرام السماوية",
        "الموارد الطبيعية والطاقة"
      ]
    },
    {
      unit: "الوحدة الرابعة: علوم الحياة الشاملة",
      topics: [
        "الوراثة والجينات المتقدمة",
        "التطور والتصنيف العلمي",
        "النظم البيئية والتنوع الحيوي",
        "التكنولوجيا الحيوية والتطبيقات"
      ]
    }
  ];

  const features = [
    {
      icon: <FaTrophy className="text-3xl" />,
      title: "تحضير شامل للامتحان",
      description: "تحضير مكثف لامتحان الشهادة الإعدادية مع مراجعات شاملة"
    },
    {
      icon: <FaBookOpen className="text-3xl" />,
      title: "شرح متخصص",
      description: "شرح متخصص يركز على نقاط القوة والضعف في الامتحان"
    },
    {
      icon: <FaPlay className="text-3xl" />,
      title: "دروس مسجلة",
      description: "160 درس مسجل عالي الجودة مع أمثلة من الامتحانات السابقة"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "دعم مكثف",
      description: "دعم مكثف ومباشر من الأستاذ مصطفى خليل"
    },
    {
      icon: <FaGraduationCap className="text-3xl" />,
      title: "نماذج امتحانات",
      description: "نماذج امتحانات سابقة مع حلول مفصلة"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "نصائح للتفوق",
      description: "نصائح وإرشادات للتفوق في امتحان الشهادة الإعدادية"
    }
  ];

  const examTips = [
    "ركز على الفهم العميق للمفاهيم الأساسية",
    "تدرب على حل الأسئلة المتشابهة في الامتحانات السابقة",
    "احرص على فهم العلاقات بين المفاهيم العلمية",
    "تدرب على كتابة الإجابات بطريقة منظمة وواضحة",
    "راجع المادة بشكل دوري وليس في اللحظة الأخيرة",
    "احرص على فهم التجارب العملية وتطبيقاتها"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 rounded-2xl text-white mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  الصف الثالث الإعدادي
                </h1>
                <p className="text-xl leading-relaxed mb-6">
                  استعد للمرحلة الحاسمة... وحقق أعلى الدرجات في العلوم مع شرح دقيق ومراجعات مركزة
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>سنة دراسية كاملة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>200+ طالب</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar />
                    <span>4.9/5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  عن الدورة
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    دورة تحضيرية شاملة لامتحان الشهادة الإعدادية، تركز على تحقيق أعلى الدرجات
                    في مادة العلوم.
                  </p>
                  <p>
                    مع أ/ مصطفى خليل... التفوق مش حلم، التفوق قرار. نركز على الفهم العميق
                    والتحضير المكثف للامتحان.
                  </p>
                  <p>
                    مع أكثر من 160 درس مسجل، ونماذج امتحانات سابقة، ودعم مكثف من الأستاذ مصطفى خليل.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-2xl p-2">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/mostafa-khalil.png"
                      alt="الصف الثالث الإعدادي"
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

      {/* Importance Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            أهمية السنة الثالثة الإعدادية
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
            هذه السنة هي سنة الشهادة الإعدادية، وهي مرحلة حاسمة في مسيرتك التعليمية. 
            التفوق فيها يفتح لك أبواب المرحلة الثانوية بأفضل الشروط.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <FaTrophy className="text-4xl text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">شهادة معتمدة</h3>
              <p className="text-white/80">شهادة إعدادية معتمدة تفتح لك أبواب المرحلة الثانوية</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <FaGraduationCap className="text-4xl text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">مستقبل أكاديمي</h3>
              <p className="text-white/80">أساس قوي للمرحلة الثانوية والجامعة</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <FaStar className="text-4xl text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">تفوق أكاديمي</h3>
              <p className="text-white/80">التميز في هذه المرحلة يضمن لك مستقبلاً أكاديمياً مشرقاً</p>
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
              مميزات فريدة تجعل من هذه الدورة الخيار الأمثل للتحضير للامتحان
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              // Determine the link for each feature card
              let href = null;
              switch (feature.title) {
                case "تحضير شامل للامتحان":
                  href = "/practical-experiments?grade=third";
                  break;
                case "شرح متخصص":
                  href = "/simple-explanation?grade=third";
                  break;
                case "دروس مسجلة":
                  href = "/recorded-lessons?grade=third";
                  break;
                case "دعم مكثف":
                  href = "/live-support?grade=third";
                  break;
                case "نماذج امتحانات":
                  href = "/periodic-tests?grade=third";
                  break;
                case "نصائح للتفوق":
                  href = "/certificate?grade=third";
                  break;
                default:
                  href = null;
              }
              const cardContent = (
                <>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 text-white">
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
              منهج شامل يغطي جميع وحدات العلوم للصف الثالث الإعدادي
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {curriculum.map((unit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-green-600 dark:text-green-400">
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

      {/* Exam Tips Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              نصائح للتفوق في الامتحان
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              نصائح وإرشادات من الأستاذ مصطفى خليل للتفوق في امتحان الشهادة الإعدادية
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {examTips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-2xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            استعد للتفوق في امتحان الشهادة الإعدادية
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            انضم إلى أكثر من 200 طالب وابدأ رحلتك نحو التفوق في امتحان الشهادة الإعدادية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                اشترك الآن
              </button>
            </Link>
            <Link href="/courses">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300">
                عرض جميع الدورات
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 