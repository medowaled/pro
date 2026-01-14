"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle, Smartphone, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PaymentMethodCard = ({
  title,
  icon,
  number,
  steps,
  whatsapp,
}: {
  title: string;
  icon: React.ReactNode;
  number: string;
  steps: string[];
  whatsapp: string;
}) => {
  const { toast } = useToast();
  return (
    <Card className="shadow-xl overflow-hidden border-t-4 border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <CardHeader className="text-center items-center p-6">
        <div className="bg-primary/10 text-primary w-20 h-20 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="font-headline text-3xl">{title}</CardTitle>
        <CardDescription
          asChild
          className="font-body text-muted-foreground text-xl tracking-wider pt-2"
        >
          <div dir="ltr" className="flex items-center gap-2">
            <span>{number}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                navigator.clipboard.writeText(number.replace(/\s/g, ""));
                toast({ title: "تم نسخ الرقم" });
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="font-body text-lg space-y-4 text-right px-6">
        <ol className="list-decimal list-inside space-y-3">
          {steps.map((step, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
          ))}
        </ol>
        <div className="!mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="font-bold text-green-700 dark:text-green-300 mb-2">
            ملحوظة هامة جدا
          </p>
          <p className="text-green-600 dark:text-green-400">
            إذا تم التحويل من خلال رقم غير الرقم المسجل منه الرجاء ارسال صورة من التحويل على رقم الواتساب <br />
            <span dir="ltr" className="font-bold text-lg text-green-600 dark:text-green-400">
              {whatsapp}
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/50 p-4 mt-6">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold">
          <CheckCircle className="w-5 h-5" />
          <span>خدمة متاحة الآن</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default function PaymentInfoPage() {
  const instaPaySteps = [];

  const vodafoneCashSteps = [];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          طرق الدفع المتاحة
        </h1>
        <p className="font-body text-lg text-foreground/80 mt-4 max-w-2xl mx-auto">
          للاشتراك في الدورات، يمكنك الدفع بسهولة وأمان من خلال المحافظ
          الإلكترونية التالية.
        </p>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 max-w-2xl mx-auto">
          <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">خطط الاشتراك المتاحة:</h3>
          <div className="space-y-2 text-blue-600 dark:text-blue-400">
            <div className="flex justify-between items-center">
              <span>اشتراك شهري:</span>
              <span className="font-bold">100 جنيه</span>
            </div>
            <div className="flex justify-between items-center">
              <span>اشتراك كامل للترم:</span>
              <span className="font-bold text-green-600">300 جنيه</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <PaymentMethodCard
          title="InstaPay"
          icon={<Smartphone className="w-10 h-10" />}
          number="01092240848"
          steps={instaPaySteps}
          whatsapp="01092240848"
        />
        <PaymentMethodCard
          title="الدفع عبر فودافون كاش"
          icon={<Smartphone className="w-10 h-10" />}
          number="01092240848"
          steps={vodafoneCashSteps}
          whatsapp="01092240848"
        />
      </div>
    </div>
  );
}
