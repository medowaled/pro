"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  FaGraduationCap, 
  FaUsers, 
  FaTrophy, 
  FaBookOpen, 
  FaStar,
  FaMicroscope,
  FaFlask,
  FaAtom,
  FaHeart,
  FaSmile,
  FaLightbulb
} from "react-icons/fa";
import { 
  GiFizzingFlask, 
  GiMicroscope, 
  GiAtom, 
  GiTestTubes 
} from "react-icons/gi";
import { HiMiniBeaker } from "react-icons/hi2";

export default function AboutPage() {
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    students: 0,
    success: 0,
    lessons: 0
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "عبدالله أيمن عبدالهادي",
      grade: "الصف الثاني متوسط",
      text: "بجد والله العظيم أحسن مستر في الكون كله مش في قليوب بس ربنا معاك يارب يا أغلى مستر في الكون كله بجد مش مقصر مع أي حد في أولى وتانية 💕",
      rating: 5,
      avatar: "👨‍🎓"
    },
    {
      name: "جنى أحمد",
      grade: "الصف الثالث متوسط",
      text: "أحسن مدرس علوم والله العظيم في قليوب كلها 😍🥰 شرحه سهل ومفهوم ومش مقصر مع حد",
      rating: 5,
      avatar: "👩‍🎓"
    },
    {
      name: "سما أشرف",
      grade: "الصف الأول متوسط",
      text: "مستر مصطفى التوب وأشطر مدرس كدا كدا 😍 شرحه ممتاز وبيخلي العلوم سهلة",
      rating: 5,
      avatar: "👩‍🎓"
    },
    {
      name: "محمد علي",
      grade: "الصف الثاني متوسط",
      text: "أفضل مدرس علوم قابلته في حياتي، شرحه واضح ومفهوم ومش مقصر مع حد 💯",
      rating: 5,
      avatar: "👨‍🎓"
    }
  ];

  useEffect(() => {
    // Animate stats
    const timer = setTimeout(() => {
      setAnimatedStats({
        experience: 22,
        students: 1000,
        success: 95,
        lessons: 500
      });
    }, 500);

    // Auto-rotate testimonials
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(testimonialTimer);
    };
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="hidden md:block absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none z-0">
          <div className="absolute top-10 left-10 text-blue-400 dark:text-blue-300 animate-pulse">
            <GiAtom size={120} />
          </div>
          <div className="absolute bottom-20 left-20 text-purple-400 dark:text-purple-300 animate-bounce">
            <GiFizzingFlask size={120} />
          </div>
          <div className="absolute top-20 right-20 text-green-400 dark:text-green-300 animate-pulse">
            <GiMicroscope size={120} />
          </div>
          <div className="absolute bottom-10 right-10 text-orange-400 dark:text-orange-300 animate-bounce">
            <GiTestTubes size={120} />
          </div>
          <div className="absolute top-1/3 left-1/4 text-cyan-400 dark:text-cyan-300 animate-pulse">
            <HiMiniBeaker size={120} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              أستاذ مصطفى خليل
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              مدرس علوم متميز مع أكثر من 22 عام من الخبرة في تدريس طلاب المرحلة الإعدادية
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 animate-slide-in-left">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                  نبذة عني
                </h2>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    مرحباً بكم، أنا أستاذ مصطفى خليل، مدرس علوم متميز مع أكثر من{" "}
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      22 عام
                    </span>{" "}
                    من الخبرة في تدريس طلاب المرحلة الإعدادية.
                  </p>
                  <p>
                    تخصصي الأساسي هو تبسيط المفاهيم العلمية المعقدة وجعلها سهلة الفهم
                    للطلاب، مع التركيز على الفهم العميق بدلاً من الحفظ فقط.
                  </p>
                  <p>
                    فلسفتي في التدريس تعتمد على ربط العلوم بالحياة اليومية، مما يجعل
                    التعلم أكثر متعة وفائدة للطلاب.
                  </p>
                  <p>
                    حاصل على شهادات متقدمة في طرق التدريس الحديثة وتكنولوجيا التعليم،
                    وأساعد الطلاب على تطوير مهارات التفكير النقدي وحل المشكلات.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center animate-slide-in-right">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-2xl p-2 animate-pulse-slow">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/mr-mostafa-removebg.png"
                      alt="أستاذ مصطفى خليل"
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

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              إنجازاتي
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              أرقام تتحدث عن نفسها
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaGraduationCap className="text-white text-3xl" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {animatedStats.experience}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">سنة خبرة</p>
            </div>
            <div className="text-center hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaUsers className="text-white text-3xl" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {animatedStats.students}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">طالب</p>
            </div>
            <div className="text-center hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaTrophy className="text-white text-3xl" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {animatedStats.success}%
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">معدل النجاح</p>
            </div>
            <div className="text-center hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaBookOpen className="text-white text-3xl" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {animatedStats.lessons}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">درس مسجل</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              فلسفة التدريس
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              منهجي في التدريس يعتمد على أسس علمية وتربوية متطورة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <FaMicroscope className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                الفهم العميق
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                أؤمن بأن الفهم العميق للمفاهيم العلمية أهم من الحفظ، لذلك أركز على
                شرح الأسباب والعلاقات بين الظواهر العلمية.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                ربط العلوم بالحياة
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                أربط المفاهيم العلمية بالحياة اليومية لتسهيل الفهم وجعل التعلم أكثر
                متعة وواقعية للطلاب.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <FaFlask className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                التجارب العملية
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                أستخدم التجارب العملية والوسائل البصرية لتعزيز الفهم وتثبيت
                المعلومات في ذهن الطلاب.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              آراء الطلاب
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              ماذا يقول طلابي عني
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-xl mx-1" />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {testimonials[currentTestimonial].grade}
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-blue-500 scale-125"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              لماذا تختارني؟
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              مميزات تجعلني الخيار الأفضل لتعلم العلوم
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                شرح مبسط
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                أشرح المفاهيم المعقدة بطريقة سهلة ومفهومة
              </p>
            </div>

            <div className="text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSmile className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                جو مرح
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                أجواء تعليمية ممتعة ومشجعة للتعلم
              </p>
            </div>

            <div className="text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAtom className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                تجارب عملية
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                تجارب تفاعلية لتعزيز الفهم
              </p>
            </div>

            <div className="text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                نتائج مضمونة
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                معدل نجاح عالي للطلاب
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 