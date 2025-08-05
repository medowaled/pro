
'use client';

import Link from "next/link";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="w-full bg-[#232d3b] text-white pt-12 pb-4 relative"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500"></div>
      <footer className="w-full">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Column 1: Professor Info */}
            <div className="text-right">
              <h3 className="text-2xl font-bold mb-4 text-white font-headline">أستاذ مصطفى خليل</h3>
              <p className="text-gray-200 leading-relaxed">
                مدرس علوم متميز مع 22 عام من الخبرة في تدريس طلاب المرحلة المتوسطة
              </p>
            </div>
            
            {/* Column 2: Contact Info */}
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4 text-white font-headline">تواصل معنا</h4>
              <div className="space-y-3 text-gray-200 text-lg flex flex-col items-center">
                <a href="mailto:mostafa3595@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <span className="align-middle">mostafa3595@gmail.com</span>
                  <Mail className="h-5 w-5" />
                </a>
                 <a href="tel:966542528952" className="flex items-center gap-3 hover:text-primary transition-colors" dir="ltr">
                  <span className="align-middle">966542528952</span>
                   <Phone className="h-5 w-5" />
                </a>
                <div className="flex items-center gap-3">
                  <span className="align-middle">القليوبية، جمهورية مصر العربية</span>
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            {/* Column 3: Follow Us */}
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4 text-white font-headline">تابعنا</h4>
              <div className="flex justify-center gap-6">
                <Link
                  href="https://whatsapp.com/channel/0029VajKUGx5q08TC3SlY42b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <FaWhatsapp size={28} className="text-white" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@mr.mostafa.khalil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <FaTiktok size={28} className="text-white" />
                </Link>
                <Link
                  href="https://www.youtube.com/@Mr_Mostafa.khalil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <BsYoutube size={28} className="text-white" />
                </Link>
                <Link
                  href="https://www.facebook.com/share/1CGExzPxi3/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <BsFacebook size={28} className="text-white" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-600">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0 text-gray-300 text-base">
                 <Link href="/about" className="hover:text-white transition-colors">عني</Link>
                 <Link href="/courses" className="hover:text-white transition-colors">الدورات</Link>
                 <a href="#contact" className="hover:text-white transition-colors">تواصل معنا</a>
              </nav>
              <div className="text-gray-400 text-xs text-left">
                <p className="font-light">This platform was proudly developed by <a href="https://wa.me/201202021982?text=مرحبًا،%20محتاج%20استفسر%20عن%20المنصة%20التعليمية." target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-blue-300 transition-colors cursor-pointer">Eng. Ahmed Waleed</a> and <a href="https://wa.me/201095412229" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-blue-300 transition-colors cursor-pointer">Eng. Islam Saad</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
