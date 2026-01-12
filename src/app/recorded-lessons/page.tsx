"use client";

import { useState } from "react";
import { FaPlay, FaClock, FaBookOpen, FaGraduationCap, FaSearch, FaFilter } from "react-icons/fa";
import { GiMicroscope, GiFizzingFlask } from "react-icons/gi";
import { FaEarthAfrica } from "react-icons/fa6";

export default function RecordedLessonsPage() {
  const [selectedGrade, setSelectedGrade] = useState<"first" | "second" | "third">("first");
  const [selectedSubject, setSelectedSubject] = useState<"all" | "chemistry" | "physics" | "biology">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const lessons = {
    first: [
      {
        id: 1,
        title: "مقدمة في العلوم الطبيعية",
        description: "شرح شامل لمفهوم العلوم الطبيعية وأهميتها في حياتنا اليومية",
        subject: "chemistry",
        duration: "45 دقيقة",
        grade: "الصف الأول الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson1",
        thumbnail: "/thumbnails/lesson1.jpg",
        views: 1250,
        rating: 4.8
      },
      {
        id: 2,
        title: "الطريقة العلمية",
        description: "تعلم خطوات الطريقة العلمية وكيفية تطبيقها في التجارب",
        subject: "physics",
        duration: "50 دقيقة",
        grade: "الصف الأول الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson2",
        thumbnail: "/thumbnails/lesson2.jpg",
        views: 980,
        rating: 4.9
      },
      {
        id: 3,
        title: "أدوات القياس العلمية",
        description: "تعرف على أهم أدوات القياس المستخدمة في العلوم",
        subject: "physics",
        duration: "40 دقيقة",
        grade: "الصف الأول الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson3",
        thumbnail: "/thumbnails/lesson3.jpg",
        views: 1100,
        rating: 4.7
      },
      {
        id: 4,
        title: "الذرة والجزيئات",
        description: "شرح مفصل لتركيب الذرة وأنواع الجزيئات",
        subject: "chemistry",
        duration: "55 دقيقة",
        grade: "الصف الأول الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson4",
        thumbnail: "/thumbnails/lesson4.jpg",
        views: 1350,
        rating: 4.8
      },
      {
        id: 5,
        title: "الخلية الحية",
        description: "دراسة تركيب الخلية الحية ووظائفها",
        subject: "biology",
        duration: "60 دقيقة",
        grade: "الصف الأول الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson5",
        thumbnail: "/thumbnails/lesson5.jpg",
        views: 1200,
        rating: 4.9
      },
      {
        id: 6,
        title: "الحركة والقوى",
        description: "شرح قوانين الحركة والقوى الأساسية",
        subject: "physics",
        duration: "65 دقيقة",
        grade: "الصف الأول الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson6",
        thumbnail: "/thumbnails/lesson6.jpg",
        views: 1050,
        rating: 4.6
      }
    ],
    second: [
      {
        id: 7,
        title: "الجدول الدوري الحديث",
        description: "دراسة شاملة للجدول الدوري وخصائص العناصر",
        subject: "chemistry",
        duration: "70 دقيقة",
        grade: "الصف الثاني الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson7",
        thumbnail: "/thumbnails/lesson7.jpg",
        views: 1400,
        rating: 4.9
      },
      {
        id: 8,
        title: "الروابط الكيميائية",
        description: "شرح أنواع الروابط الكيميائية وتطبيقاتها",
        subject: "chemistry",
        duration: "75 دقيقة",
        grade: "الصف الثاني الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson8",
        thumbnail: "/thumbnails/lesson8.jpg",
        views: 1300,
        rating: 4.8
      },
      {
        id: 9,
        title: "قوانين نيوتن للحركة",
        description: "شرح مفصل لقوانين نيوتن الثلاثة للحركة",
        subject: "physics",
        duration: "80 دقيقة",
        grade: "الصف الثاني الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson9",
        thumbnail: "/thumbnails/lesson9.jpg",
        views: 1250,
        rating: 4.7
      },
      {
        id: 10,
        title: "الطاقة وأنواعها",
        description: "دراسة أنواع الطاقة وتحولاتها",
        subject: "physics",
        duration: "65 دقيقة",
        grade: "الصف الثاني الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson10",
        thumbnail: "/thumbnails/lesson10.jpg",
        views: 1150,
        rating: 4.8
      },
      {
        id: 11,
        title: "الوراثة والجينات",
        description: "مقدمة في علم الوراثة والجينات",
        subject: "biology",
        duration: "70 دقيقة",
        grade: "الصف الثاني الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson11",
        thumbnail: "/thumbnails/lesson11.jpg",
        views: 1200,
        rating: 4.9
      },
      {
        id: 12,
        title: "علوم الأرض",
        description: "دراسة تركيب الأرض والظواهر الجيولوجية",
        subject: "biology",
        duration: "60 دقيقة",
        grade: "الصف الثاني الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson12",
        thumbnail: "/thumbnails/lesson12.jpg",
        views: 1100,
        rating: 4.6
      }
    ],
    third: [
      {
        id: 13,
        title: "الروابط الكيميائية المتقدمة",
        description: "دراسة متقدمة للروابط الكيميائية وتطبيقاتها",
        subject: "chemistry",
        duration: "85 دقيقة",
        grade: "الصف الثالث الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson13",
        thumbnail: "/thumbnails/lesson13.jpg",
        views: 1500,
        rating: 4.9
      },
      {
        id: 14,
        title: "الحموض والقواعد والأملاح",
        description: "شرح مفصل للحموض والقواعد وتفاعلاتها",
        subject: "chemistry",
        duration: "90 دقيقة",
        grade: "الصف الثالث الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson14",
        thumbnail: "/thumbnails/lesson14.jpg",
        views: 1450,
        rating: 4.8
      },
      {
        id: 15,
        title: "الكهرباء والمغناطيسية",
        description: "دراسة العلاقة بين الكهرباء والمغناطيسية",
        subject: "physics",
        duration: "95 دقيقة",
        grade: "الصف الثالث الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson15",
        thumbnail: "/thumbnails/lesson15.jpg",
        views: 1400,
        rating: 4.7
      },
      {
        id: 16,
        title: "الضوء والموجات",
        description: "شرح خصائص الضوء والموجات",
        subject: "physics",
        duration: "80 دقيقة",
        grade: "الصف الثالث الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson16",
        thumbnail: "/thumbnails/lesson16.jpg",
        views: 1350,
        rating: 4.8
      },
      {
        id: 17,
        title: "الوراثة المتقدمة",
        description: "دراسة متقدمة في علم الوراثة والجينات",
        subject: "biology",
        duration: "100 دقيقة",
        grade: "الصف الثالث الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson17",
        thumbnail: "/thumbnails/lesson17.jpg",
        views: 1300,
        rating: 4.9
      },
      {
        id: 18,
        title: "النظم البيئية",
        description: "دراسة النظم البيئية والتنوع الحيوي",
        subject: "biology",
        duration: "75 دقيقة",
        grade: "الصف الثالث الإعدادي",
        videoUrl: "https://www.youtube.com/embed/lesson18",
        thumbnail: "/thumbnails/lesson18.jpg",
        views: 1250,
        rating: 4.6
      }
    ]
  };

  const currentLessons = lessons[selectedGrade].filter(lesson => {
    const matchesSubject = selectedSubject === "all" || lesson.subject === selectedSubject;
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "chemistry":
        return <GiFizzingFlask className="text-2xl" />;
      case "physics":
        return <FaGraduationCap className="text-2xl" />;
      case "biology":
        return <FaEarthAfrica className="text-2xl" />;
      default:
        return <FaBookOpen className="text-2xl" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "chemistry":
        return "from-purple-500 to-pink-500";
      case "physics":
        return "from-blue-500 to-cyan-500";
      case "biology":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              الدروس المسجلة
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              دروس مسجلة عالية الجودة لجميع مراحل المرحلة الإعدادية مع أستاذ مصطفى خليل
            </p>
          </div>

          {/* Grade Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedGrade("first")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedGrade === "first"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              الصف الأول الإعدادي
            </button>
            <button
              onClick={() => setSelectedGrade("second")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedGrade === "second"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              الصف الثاني الإعدادي
            </button>
            <button
              onClick={() => setSelectedGrade("third")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedGrade === "third"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              الصف الثالث الإعدادي
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في الدروس..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSubject("all")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedSubject === "all"
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                جميع المواد
              </button>
              <button
                onClick={() => setSelectedSubject("chemistry")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedSubject === "chemistry"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                الكيمياء
              </button>
              <button
                onClick={() => setSelectedSubject("physics")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedSubject === "physics"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                الفيزياء
              </button>
              <button
                onClick={() => setSelectedSubject("biology")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedSubject === "biology"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                علوم الحياة
              </button>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Video Thumbnail */}
                <div className={`relative h-48 bg-gradient-to-br ${getSubjectColor(lesson.subject)} rounded-t-2xl flex items-center justify-center`}>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    {getSubjectIcon(lesson.subject)}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-t-2xl flex items-center justify-center">
                    <FaPlay className="text-white text-3xl" />
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {lesson.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {lesson.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400 text-sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {lesson.views} مشاهدة
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {lesson.rating}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2">
                    <FaPlay className="text-sm" />
                    مشاهدة الدرس
                  </button>
                </div>
              </div>
            ))}
          </div>

          {currentLessons.length === 0 && (
            <div className="text-center py-12">
              <FaBookOpen className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                لا توجد دروس متاحة
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                جرب تغيير الفلتر أو البحث عن شيء آخر
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              إحصائيات الدروس المسجلة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              أكثر من 500 درس مسجل عالي الجودة
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlay className="text-white text-3xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">درس مسجل</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-white text-3xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">200+</h3>
              <p className="text-gray-600 dark:text-gray-400">ساعة محتوى</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-white text-3xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">1000+</h3>
              <p className="text-gray-600 dark:text-gray-400">طالب نشط</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBookOpen className="text-white text-3xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">4.9</h3>
              <p className="text-gray-600 dark:text-gray-400">تقييم متوسط</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 