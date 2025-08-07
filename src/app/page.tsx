

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from '@/components/layout/header';
import SiteFooter from '@/components/layout/footer';
import { useRef, useState, useEffect } from 'react';
import Mostafa from './images/hero-latest.png';
import { Smile, Users, Star, Award, Trophy, FlaskConical, Lightbulb, GraduationCap, Atom, Dna } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay"
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


const AnimatedNumber = ({ value, suffix = '' }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const duration = 2000; // 2 seconds

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          if (start === end) return;

          const startTime = Date.now();
          const frame = () => {
            const now = Date.now();
            const progress = (now - startTime) / duration;
            const current = Math.min(Math.floor(end * progress), end);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(frame);
            }
          };
          requestAnimationFrame(frame);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, isClient]);

  // Show 0 on server, actual count on client
  const displayValue = isClient ? count : 0;

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
};

const testimonials = [
  {
    name: 'Heba Ahmad',
    class: 'أم طالبة',
    avatar: 'https://placehold.co/100x100.png',
    rating: 5,
    quote: 'تستحق التقدير والاحترام يا مستر مصطفى من أفضل المدرسين ومتمكن في مادتك وشكرك علي مجهودك الرائع مع اولادي'
  },
  {
    name: 'Ahmed W Sama',
    class: 'طالب',
    avatar: 'https://placehold.co/100x100.png',
    rating: 5,
    quote: 'احسن مستر علوم علي كوكب الارض بعد عن تجربه تلات سنين عمرنا مازلنا ف الماده بتاعته ابدا وبيكون اب قبل ما يكون معلم ربنا يبارك ف حضرتك يارب'
  },
  {
    name: 'Sama Ashraf',
    class: 'طالبة',
    avatar: 'https://placehold.co/100x100.png',
    rating: 5,
    quote: 'اجمل مستر كدا كدا بجد وحشتنا وحشتنا الحصص بتاعتك ي مستر واللهي نفسي ف حصه من الحصص بتاعتك تاني يعني من أفضل وانجح المدرسين الي روحتلهم بجد ربنا يوفقك وديما من نجاح ل نجاح ❤️🤍'
  }
];

const ScienceBackground = () => {
  const icons = [
    { Icon: Atom, size: 'w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16', position: 'top-1/4 left-1/4' },
    { Icon: FlaskConical, size: 'w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20', position: 'top-1/2 right-1/4' },
    { Icon: Dna, size: 'w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12', position: 'bottom-1/4 left-1/3' },
    { Icon: Atom, size: 'w-8 h-8 sm:w-12 sm:h-12 md:w-10 md:h-10', position: 'top-1/3 right-1/2' },
    { Icon: FlaskConical, size: 'w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24', position: 'bottom-1/3 left-1/4' },
    { Icon: Dna, size: 'w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16', position: 'top-2/3 right-1/3' },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {icons.map((item, index) => (
        <item.Icon
          key={index}
          className={`absolute text-foreground/5 animate-float ${item.size} ${item.position} hidden sm:block`}
          style={{ animationDuration: `${15 + index * 5}s` }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    // يمكن عرض سبينر أو شاشة انتظار بسيطة
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <span className="text-muted-foreground ml-4">جاري التحقق من تسجيل الدخول...</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow relative">
        <ScienceBackground />
        
        {/* Hero Section - محسّن للاستجابة */}
        <section className="relative text-white py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-l from-orange-500 via-green-500 to-blue-500 z-0 dark:from-yellow-500/80 dark:via-purple-500/80 dark:to-blue-600/80"></div>
           <div className="responsive-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
                    <div className="flex justify-center lg:order-last">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 dark:bg-yellow-400/20 rounded-full -m-2 sm:-m-4 blur-xl"></div>
                            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 p-2 bg-white/10 dark:bg-black/20 rounded-full ring-2 sm:ring-4 ring-white/30 dark:ring-yellow-400/30">
                                <Image
                                    src={Mostafa}
                                    alt="مستر مصطفى خليل"
                                    width={400}
                                    height={400}
                                    className="rounded-full object-cover w-full h-full"
                                    data-ai-hint="portrait teacher"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2">مستر مصطفى خليل</h1>
                        <h2 className="font-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200 dark:text-cyan-300 mb-4">مدرس العلوم المتميز</h2>
                        <p className="font-body text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8">
                            كبير معلمي العلوم بوزارة التربية والتعليم خبرة 22 سنة في تدريس العلوم للمرحلة الإعدادية. شرح مبسط - مراجعات قوية – متابعة مستمرة. معانا... الفهم أول خطوة للتفوق.
                        </p>
                        <Button asChild size="lg" className="font-headline bg-white text-blue-600 hover:bg-gray-100 dark:bg-yellow-400 dark:text-background dark:hover:bg-yellow-500 rounded-full px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-6 text-base sm:text-lg">
                            <Link href="/courses">ابدأ التعلم الآن</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Grades Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background dark:bg-transparent">
          <div className="responsive-container">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="responsive-heading font-headline font-bold text-foreground">المراحل الإعدادية</h2>
              <p className="font-body responsive-text text-foreground/80 mt-2 max-w-2xl mx-auto">
                دروس شاملة ومفصلة لجميع مراحل المرحلة الإعدادية
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {/* Card 1 */}
                <div className="responsive-card p-6 sm:p-8 text-center flex flex-col items-center border-t-4 border-purple-400 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="relative mb-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-purple-200 dark:bg-purple-500/20 flex items-center justify-center">
                            <Image src={Mostafa} alt="Avatar" width={88} height={88} className="rounded-full w-full h-full object-cover" />
                        </div>
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2">الصف الأول الإعدادي</h3>
                    <p className="font-body text-foreground/80 mb-4 h-20 text-sm sm:text-base">
                       🎯 ابدأ صح من أول سنة... وافهم العلوم خطوة بخطوة مع أ/ مصطفى خليل
                    </p>
                    <Link href="/courses?grade=1" className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors text-sm sm:text-base">
                        الأساس القوي بيبدأ من هنا!
                    </Link>
                </div>
                {/* Card 2 */}
                <div className="responsive-card p-6 sm:p-8 text-center flex flex-col items-center border-t-4 border-blue-400 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="relative mb-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-blue-200 dark:bg-blue-500/20 flex items-center justify-center">
                            <Image src={Mostafa} alt="Avatar" width={88} height={88} className="rounded-full w-full h-full object-cover" />
                        </div>
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2">الصف الثاني الإعدادي</h3>
                    <p className="font-body text-foreground/80 mb-4 h-20 text-sm sm:text-base">
                       🚀 طور مهاراتك وابني على الأساس القوي مع أ/ مصطفى خليل
                    </p>
                    <Link href="/courses?grade=2" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors text-sm sm:text-base">
                        التطور والتقدم خطوة بخطوة!
                    </Link>
                </div>
                {/* Card 3 */}
                <div className="responsive-card p-6 sm:p-8 text-center flex flex-col items-center border-t-4 border-green-400 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl md:col-span-2 lg:col-span-1">
                    <div className="relative mb-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-green-200 dark:bg-green-500/20 flex items-center justify-center">
                            <Image src={Mostafa} alt="Avatar" width={88} height={88} className="rounded-full w-full h-full object-cover" />
                        </div>
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold mb-2">الصف الثالث الإعدادي</h3>
                    <p className="font-body text-foreground/80 mb-4 h-20 text-sm sm:text-base">
                       🏆 احترف العلوم واهزم الامتحانات مع أ/ مصطفى خليل
                    </p>
                    <Link href="/courses?grade=3" className="font-bold text-green-600 dark:text-green-400 hover:text-green-700 transition-colors text-sm sm:text-base">
                       النجاح والتفوق في انتظارك!
                    </Link>
                </div>
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="bg-background dark:bg-transparent text-foreground py-12 sm:py-16 md:py-20">
            <div className="responsive-container text-center">
                 <h2 className="responsive-heading font-headline font-bold mb-4">لماذا تختارني؟</h2>
                 <p className="font-body responsive-text text-foreground/80 mt-2 mb-8 sm:mb-12 max-w-2xl mx-auto">
                    مميزات تجعلني الخيار الأفضل لتعلم العلوم
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-card text-center border border-transparent hover:border-purple-500 transition-colors">
                        <div className="p-3 sm:p-5 bg-purple-500/10 text-purple-500 rounded-full mb-4">
                           <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="font-headline text-lg sm:text-xl lg:text-2xl font-semibold mb-2">نتائج مضمونة</h3>
                        <p className="font-body text-center text-foreground/80 text-xs sm:text-sm">معدل نجاح عالي للطلاب</p>
                    </div>
                     <div className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-card text-center border border-transparent hover:border-orange-500 transition-colors">
                        <div className="p-3 sm:p-5 bg-orange-500/10 text-orange-500 rounded-full mb-4">
                            <FlaskConical className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="font-headline text-lg sm:text-xl lg:text-2xl font-semibold mb-2">تجارب عملية</h3>
                        <p className="font-body text-center text-foreground/80 text-xs sm:text-sm">تجارب تفاعلية لتعزيز الفهم</p>
                    </div>
                     <div className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-card text-center border border-transparent hover:border-green-500 transition-colors">
                        <div className="p-3 sm:p-5 bg-green-500/10 text-green-500 rounded-full mb-4">
                           <Smile className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="font-headline text-lg sm:text-xl lg:text-2xl font-semibold mb-2">جو مرح</h3>
                        <p className="font-body text-center text-foreground/80 text-xs sm:text-sm">أجواء تعليمية ممتعة ومشجعة</p>
                    </div>
                    <div className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-card text-center border border-transparent hover:border-blue-500 transition-colors">
                        <div className="p-3 sm:p-5 bg-blue-500/10 text-blue-500 rounded-full mb-4">
                           <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="font-headline text-lg sm:text-xl lg:text-2xl font-semibold mb-2">شرح مبسط</h3>
                        <p className="font-body text-center text-foreground/80 text-xs sm:text-sm">شرح المفاهيم المعقدة بطريقة سهلة</p>
                    </div>
                 </div>
            </div>
        </section>

        {/* About Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-secondary/20 dark:bg-transparent">
          <div className="responsive-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-right space-y-4">
                <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-primary dark:text-yellow-400">عن أستاذ مصطفى</h2>
                <p className="font-body responsive-text text-foreground/80">
                  مدرس علوم متميز مع أكثر من 22 عام من الخبرة في تدريس طلاب المرحلة الإعدادية. متخصص في تبسيط المفاهيم العلمية المعقدة وجعلها سهلة الفهم للطلاب. حاصل على شهادات متقدمة في طرق التدريس الحديثة وتكنولوجيا التعليم. ساعد أكثر من 10,000 طالب في تحسين درجاتهم في مادة العلوم.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
                  <div className="flex items-center gap-2 sm:gap-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold p-2 sm:p-3 rounded-lg text-sm sm:text-base">
                    <Award className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span><AnimatedNumber value={22} suffix="+" /> سنة خبرة</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold p-2 sm:p-3 rounded-lg text-sm sm:text-base">
                    <Users className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span><AnimatedNumber value={10000} suffix="+" /> طالب</span>
                  </div>
                   <div className="flex items-center gap-2 sm:gap-3 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-bold p-2 sm:p-3 rounded-lg text-sm sm:text-base">
                    <Star className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span><AnimatedNumber value={95} suffix="%" /> نسبة نجاح</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-500 dark:from-yellow-400/50 dark:to-purple-600/50 rounded-full blur-2xl opacity-50"></div>
                  <div className="absolute inset-0 rounded-full border-4 sm:border-8 border-white/20 dark:border-white/10"></div>
                  <div className="relative w-full h-full p-2 bg-background/10 rounded-full">
                     <Image
                        src={Mostafa}
                        alt="مستر مصطفى خليل"
                        width={288}
                        height={288}
                        className="rounded-full object-cover w-full h-full"
                     />
                  </div>
                  <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-card p-2 sm:p-4 rounded-full shadow-lg border border-border">
                     <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-400 to-green-500 dark:from-yellow-400 dark:to-purple-600 rounded-full flex flex-col items-center justify-center text-white">
                        <div className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold">
                           <AnimatedNumber value={22} />
                        </div>
                        <div className="text-xs sm:text-sm font-body">عام خبرة</div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

         {/* Testimonials Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary/20 dark:bg-transparent">
            <div className="responsive-container text-center">
                 <h2 className="responsive-heading font-headline font-bold mb-2">آراء الطلاب</h2>
                 <p className="responsive-text text-foreground/70 mb-8 sm:mb-12">ماذا يقول طلابي عني؟</p>
                 <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                        direction: 'rtl',
                    }}
                    className="w-full max-w-2xl mx-auto"
                 >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="basis-full">
                            <div className="p-1 h-full">
                                <Card className="h-full flex flex-col justify-center items-center text-center shadow-lg bg-card p-4 sm:p-6 md:p-8">
                                  <CardContent className="p-4 sm:p-6 flex-grow flex flex-col items-center justify-center">
                                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                         <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                                      </div>
                                      <div className="flex mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                        ))}
                                      </div>
                                      <h3 className="font-headline text-lg sm:text-xl font-bold">{testimonial.name}</h3>
                                      <p className="text-xs sm:text-sm text-muted-foreground mb-4">{testimonial.class}</p>
                                      <p className="font-body text-foreground/80 italic max-w-md text-sm sm:text-base">"{testimonial.quote}"</p>
                                  </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                 </Carousel>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
