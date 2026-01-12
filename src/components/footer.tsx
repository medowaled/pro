import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-gray-800 dark:bg-gray-900 text-white py-16 relative"
    >
      {/* Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500"></div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">أستاذ مصطفى خليل</h3>
            <p className="text-gray-300 leading-relaxed">
              مدرس علوم متميز مع 22 عام من الخبرة في تدريس طلاب المرحلة المتوسطة
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-2 text-gray-300">
              <p>📧 mostafakhalil10@gmail.com</p>
              <p>
                📱
                <span dir="ltr"> +20 11 16822035 </span>
              </p>
              <p>📍 القليوبية، جمهورية مصر العربية</p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">تابعنا</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <BsFacebook size={24} />
              </Link>
              <Link
                href="#"
                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <BsYoutube size={24} />
              </Link>
              <Link
                href="#"
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
              >
                <FaTiktok size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                عني
              </Link>
              <Link href="/courses" className="text-gray-400 hover:text-white transition-colors">
                الدورات
              </Link>
              <Link href="/practical-experiments" className="text-gray-400 hover:text-white transition-colors">
                التجارب العملية
              </Link>
              <Link href="/recorded-lessons" className="text-gray-400 hover:text-white transition-colors">
                الدروس المسجلة
              </Link>
              <Link href="/periodic-tests" className="text-gray-400 hover:text-white transition-colors">
                الاختبارات الدورية
              </Link>
              <Link href="/certificate" className="text-gray-400 hover:text-white transition-colors">
                شهادة الإتمام
              </Link>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                تواصل معنا
              </a>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2025 مستر مصطفى خليل. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
