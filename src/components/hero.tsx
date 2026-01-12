import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 py-20 mt-16"
    >
      <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-right animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg dark:text-yellow-300 dark:drop-shadow-2xl">
              مستر مصطفى خليل
            </h1>
            <h2 className="text-2xl lg:text-3xl text-white/90 dark:text-cyan-300 mb-8 drop-shadow-md dark:drop-shadow-xl">
              مدرس العلوم المتميز
            </h2>
            <p className="text-xl text-white/80 dark:text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-sm dark:drop-shadow-lg">
              كبير معلمي العلوم بوزارة التربية والتعليم خبرة 22 سنة في تدريس
              العلوم للمرحلة الإعدادية شرح مبسط – مراجعات قوية – متابعة مستمرة
              معانا... الفهم أول خطوة للتفوق
            </p>
            <button className="bg-white dark:bg-yellow-400 text-blue-600 dark:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover-lift animate-pulse-slow shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-blue-200 dark:hover:border-yellow-300 dark:shadow-yellow-500/50">
              ابدأ التعلم الآن
            </button>
          </div>
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 bg-white/20 dark:bg-yellow-400/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl dark:shadow-yellow-500/20">
                <div className="w-72 h-72 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/20 dark:ring-yellow-400/40 dark:shadow-yellow-500/30">
                  <Image
                    src="/mr-mostafa.png"
                    alt="Profile"
                    width={288}
                    height={288}
                    className="rounded-full shadow-inner dark:shadow-inner dark:shadow-yellow-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
