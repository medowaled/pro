

"use client";

import type { Viewport } from 'next';
import { useEffect, useState, useRef } from 'react';
import SiteFooter from "@/components/layout/footer";
import SiteHeader from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, FlaskConical, Lightbulb, Star, BookOpen, Trophy, GraduationCap, ChevronLeft } from "lucide-react";
import Image from 'next/image';
import Mostafa from '../images/mostafa-portrait.png';
import MostafaCertificate from '../images/mostafa.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#29ABE2',
};


const AnimatedNumber = ({ value, suffix = '', prefix = '' }: { value: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const duration = 2000; // 2 seconds

  useEffect(() => {
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
  }, [value]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
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


export default function AboutPage() {
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow bg-secondary/20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">أستاذ مصطفى خليل</h1>
                    <p className="font-body text-xl text-foreground/80 mt-2 max-w-3xl mx-auto">
                        مدرس علوم متميز مع أكثر من 22 عامًا من الخبرة في تدريس طلاب المرحلة الإعدادية.
                    </p>
                </div>
                 <div className="grid md:grid-cols-5 items-center gap-12">
                    <div className="md:col-span-2 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 bg-gradient-to-tr from-green-400 via-blue-500 to-orange-500 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative p-2 bg-background rounded-full ring-4 ring-white/30">
                                <Image
                                    src={Mostafa}
                                    alt="مستر مصطفى خليل"
                                    width={400}
                                    height={400}
                                    className="rounded-full object-cover w-full h-full"
                                    data-ai-hint="portrait teacher"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <Card className="shadow-2xl">
                          <CardHeader>
                            <CardTitle className="font-headline text-3xl">نبذة عني</CardTitle>
                          </CardHeader>
                          <CardContent className="font-body text-lg space-y-4 text-foreground/80">
                            <p>
                              مرحباً بكم، أنا أستاذ مصطفى خليل، مدرس علوم متميز مع أكثر من <strong className="text-primary">22 عامًا</strong> من الخبرة في تدريس طلاب المرحلة الإعدادية.
                            </p>
                            <p>
                              تخصصي الأساسي هو تبسيط المفاهيم العلمية المعقدة وجعلها سهلة الفهم للطلاب، مع التركيز على الفهم العميق بدلاً من الحفظ فقط.
                            </p>
                            <p>
                                فلسفتي في التدريس تعتمد على ربط العلوم بالحياة اليومية، مما يجعل التعلم أكثر متعة وفائدة للطلاب.
                            </p>
                             <p>
                                حاصل على شهادات متقدمة في طرق التدريس الحديثة وتكنولوجيا التعليم، وأساعد الطلاب على تطوير مهارات التفكير النقدي وحل المشكلات.
                            </p>
                          </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        {/* Teaching Philosophy Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-headline font-bold mb-2">فلسفة التدريس</h2>
                <p className="text-lg text-foreground/70 mb-12">منهجي في التدريس يعتمد على أسس علمية وتربوية متطورة</p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Card className="shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                        <CardHeader className="items-center text-center">
                            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                                <Lightbulb className="w-10 h-10 text-blue-500" />
                            </div>
                            <CardTitle className="font-headline text-2xl">الفهم العميق</CardTitle>
                        </CardHeader>
                        <CardContent className="font-body text-center text-lg text-foreground/80">
                            <p>أؤمن بأن الفهم العميق للمفاهيم العلمية أهم من الحفظ، لذلك أركز على شرح الأساسيات والتطبيقات بأساليب شيقة ومبتكرة.</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                        <CardHeader className="items-center text-center">
                            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                                <Heart className="w-10 h-10 text-green-500" />
                            </div>
                            <CardTitle className="font-headline text-2xl">ربط العلوم بالحياة</CardTitle>
                        </CardHeader>
                        <CardContent className="font-body text-center text-lg text-foreground/80">
                            <p>أربط المفاهيم العلمية بالحياة اليومية لتبسيط الفهم وجعل التعلم أكثر متعة وواقعية للطلاب.</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                        <CardHeader className="items-center text-center">
                            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                                <FlaskConical className="w-10 h-10 text-purple-500" />
                            </div>
                            <CardTitle className="font-headline text-2xl">التجارب العملية</CardTitle>
                        </CardHeader>
                        <CardContent className="font-body text-center text-lg text-foreground/80">
                            <p>أستخدم التجارب العملية والوسائل البصرية لتعزيز الفهم وتثبيت المعلومات في ذهن الطالب.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-4xl font-headline font-bold mb-2">آراء الطلاب</h2>
                 <p className="text-lg text-foreground/70 mb-12">ماذا يقول طلابي عني؟</p>
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
                                <Card className="h-full flex flex-col justify-center items-center text-center shadow-lg bg-card p-8">
                                  <CardContent className="p-6 flex-grow flex flex-col items-center justify-center">
                                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                         <GraduationCap className="w-10 h-10 text-primary" />
                                      </div>
                                      <div className="flex mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                        ))}
                                      </div>
                                      <h3 className="font-headline text-xl font-bold">{testimonial.name}</h3>
                                      <p className="text-sm text-muted-foreground mb-4">{testimonial.class}</p>
                                      <p className="font-body text-foreground/80 italic max-w-md">"{testimonial.quote}"</p>
                                  </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                 </Carousel>
            </div>
        </section>
        
        {/* Achievements Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-headline font-bold mb-2">إنجازاتي</h2>
                <p className="text-lg text-foreground/70 mb-12">أرقام تتحدث عن نفسها</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                           <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-lg transform rotate-45 shadow-2xl"></div>
                           <div className="relative bg-background p-4 rounded-lg shadow-inner text-center">
                            <h3 className="font-headline text-4xl font-bold text-blue-500"><AnimatedNumber value={22} /></h3>
                            <p className="font-body text-foreground/80 whitespace-nowrap">عام خبرة</p>
                           </div>
                        </div>
                    </div>
                     <div className="flex flex-col items-center gap-4">
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-500 p-6 rounded-full shadow-lg">
                           <Users className="w-12 h-12" />
                        </div>
                        <h3 className="font-headline text-4xl font-bold"><AnimatedNumber value={10000} prefix="+" /></h3>
                        <p className="font-body text-foreground/80">طالب</p>
                    </div>
                     <div className="flex flex-col items-center gap-4">
                        <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-500 p-6 rounded-full shadow-lg">
                           <Trophy className="w-12 h-12" />
                        </div>
                        <h3 className="font-headline text-4xl font-bold"><AnimatedNumber value={95} suffix="%" /></h3>
                        <p className="font-body text-foreground/80">معدل النجاح</p>
                    </div>
                     <div className="flex flex-col items-center gap-4">
                        <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-500 p-6 rounded-full shadow-lg">
                           <BookOpen className="w-12 h-12" />
                        </div>
                        <h3 className="font-headline text-4xl font-bold"><AnimatedNumber value={500} prefix="+" /></h3>
                        <p className="font-body text-foreground/80">درس مسجل</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Classroom Experience Section */}
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-headline font-bold mb-2">رحلتي التعليمية في الفصول الدراسية</h2>
                <p className="text-lg text-foreground/70 mb-12">لحظات من الإلهام والتعلم في بيئة تعليمية ديناميكية</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className="space-y-4">
                        <Card className="shadow-2xl overflow-hidden">
                            <CardContent className="p-0">
                                <Image
                                    src="/images/classroom-1.png"
                                    alt="فصل دراسي تفاعلي مع طلاب منتبهين"
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-80"
                                    data-ai-hint="interactive classroom with engaged students"
                                />
                            </CardContent>
                        </Card>
                        <div className="text-center">
                            <h3 className="font-headline text-2xl font-bold text-primary mb-2">بيئة تعليمية تفاعلية</h3>
                            <p className="text-foreground/80 font-body">
                                فصول دراسية مليئة بالحيوية والنشاط، حيث يلتقي الإلهام بالتعلم
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Card className="shadow-2xl overflow-hidden">
                            <CardContent className="p-0">
                                <Image
                                    src="/images/classroom-2.png"
                                    alt="محاضرة تفاعلية مع استخدام التكنولوجيا الحديثة"
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-80"
                                    data-ai-hint="interactive lecture with modern technology"
                                />
                            </CardContent>
                        </Card>
                        <div className="text-center">
                            <h3 className="font-headline text-2xl font-bold text-primary mb-2">التكنولوجيا في خدمة التعليم</h3>
                            <p className="text-foreground/80 font-body">
                                دمج التكنولوجيا الحديثة مع طرق التدريس التقليدية لخلق تجربة تعليمية فريدة
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-headline text-2xl font-bold text-primary mb-4">فلسفة التدريس في الممارسة</h3>
                    <p className="text-foreground/80 font-body text-lg leading-relaxed">
                        في هذه الفصول الدراسية، نرى فلسفة التدريس تتجسد في الواقع - حيث يلتقي الطلاب والمعلم في رحلة تعليمية مشتركة، 
                        مليئة بالتفاعل والإلهام. كل درس هو مغامرة جديدة في عالم العلوم، وكل طالب هو عالم صغير ينتظر الاكتشاف.
                    </p>
                </div>
            </div>
        </section>

        {/* Certificates Section */}
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-headline font-bold mb-2">الشهادات والتكريمات</h2>
                <p className="text-lg text-foreground/70 mb-12">تقدير للجهود المبذولة في سبيل العلم</p>
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-2xl overflow-hidden">
                        <CardContent className="p-0">
                            <Image
                                src={MostafaCertificate}
                                alt="شهادة تقدير"
                                width={1200}
                                height={800}
                                className="object-contain w-full h-auto"
                                data-ai-hint="certificate award"
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* In The Press Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline font-bold mb-2">في الصحافة</h2>
            <p className="text-lg text-foreground/70 mb-12 max-w-3xl mx-auto">تقارير صحفية عن مسيرة الأستاذ مصطفى خليل التعليمية</p>
            <div className="max-w-4xl mx-auto text-right">
              <Card className="shadow-2xl overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <h3 className="font-headline text-3xl font-bold text-primary mb-2">مصطفى خليل: أيقونة تعليمية تضيء سماء قليوب</h3>
                  <p className="text-sm text-muted-foreground mb-8">مجلة أخبار مصر • 2024</p>
                  
                  <blockquote className="border-r-4 border-primary pr-4 my-6">
                    <p className="text-xl italic font-semibold text-foreground/90 font-body">
                      "أستاذ مصطفى خليل يمثل نموذجاً ملهماً للمعلم المتميز الذي يضع مصلحة طلابه فوق كل اعتبار"
                    </p>
                  </blockquote>

                  <div className="prose prose-lg max-w-none text-foreground/80 font-body space-y-4 text-justify">
                    <p>
                      في قلب محافظة القليوبية، يبرز اسم أستاذ مصطفى خليل كأحد أبرز المعلمين المتميزين الذين غيروا مفهوم التدريس التقليدي وأحدثوا ثورة في عالم التعليم. مع أكثر من 22 عامًا من الخبرة في تدريس العلوم للمرحلة الإعدادية، استطاع الأستاذ مصطفى خليل أن يطور منهجية تعليمية فريدة تجمع بين الأصالة والحداثة، مما جعله محط إعجاب وتقدير من قبل الطلاب وأولياء الأمور على حد سواء.
                    </p>
                    
                    <div className="p-6 bg-background rounded-lg border-r-4 border-green-500 my-6">
                        <h4 className="font-headline text-2xl font-bold mb-3">فلسفة التدريس المتميزة</h4>
                        <p>
                        يؤمن الأستاذ مصطفى خليل بأن التعليم الناجح لا يعتمد على الحفظ والتلقين، بل على الفهم العميق وربط المفاهيم العلمية بالحياة اليومية. هذا النهج جعل من دروسه تجربة تعليمية ممتعة ومفيدة. من خلال استخدام التكنولوجيا الحديثة والوسائل التعليمية المتطورة، نجح الأستاذ مصطفى في جعل العلوم مادة محببة للطلاب، مما أدى إلى تحسن ملحوظ في مستوياتهم الدراسية وزيادة إقبالهم على التعلم.
                        </p>
                    </div>

                    <p>
                      "النجاح الحقيقي للمعلم ليس في عدد الطلاب الذين يحققون الدرجات العالية، بل في عدد الذين تلهمهم، ويطبقون ما تعلموه في حياتهم اليومية."
                      <br />- أستاذ مصطفى خليل
                    </p>
                    <p>
                      كما تميز الأستاذ مصطفى خليل باهتمامه الخاص بالطلاب ذوي الصعوبات التعليمية، حيث طور برامج خاصة لمساعدتهم على تجاوز تحدياتهم وتحقيق النجاح الأكاديمي.
                    </p>

                    <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border-r-4 border-yellow-500 my-6">
                        <h4 className="font-headline text-2xl font-bold mb-3">الإنجازات والتكريمات</h4>
                        <ul className="list-disc pr-5 space-y-2">
                          <li>حاصل على شهادة تقدير من مديرية التربية والتعليم بمحافظة القليوبية.</li>
                          <li>معلم متميز في استخدام التكنولوجيا في التعليم.</li>
                          <li>مطور مناهج تعليمية مبتكرة للمرحلة الإعدادية.</li>
                        </ul>
                    </div>

                    <p>
                      يؤكد أولياء الأمور على أن الأستاذ مصطفى خليل لم يكن مجرد معلم عادي، بل كان أبًا ومربيًا حقيقيًا ساعد أبناءهم على تطوير مهاراتهم العلمية والاجتماعية، مما جعله محط ثقة وتقدير من قبل المجتمع المحلي. في عصر يتسم بالتحديات التعليمية المتزايدة، يبرز الأستاذ مصطفى خليل كنموذج يحتذى به للمعلم المتميز الذي يضع مصلحة طلابه فوق كل اعتبار، ويبذل قصارى جهده لضمان مستقبل تعليمي مشرق لأجيال المستقبل.
                    </p>
                  </div>
                  <div className="text-left mt-8">
                    
                  <a 
                    href="https://exteranews.com/مصطفى-خليل-أيقونة-تعليمية-تضيء-سماء-ق/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                                        قراءة المقال الأصلي →
                     </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
