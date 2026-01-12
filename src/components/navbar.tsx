"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center p-0.5 shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src="/mr-mostafa-removebg.png"
                  className="rounded-full"
                  alt="logo"
                  width={50}
                  height={50}
                />
              </div>
            </Link>
            <div className="hidden sm:block">
              <Link href="/">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  مستر مصطفى خليل
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  مدرس العلوم
                </p>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              الرئيسية
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              عني
            </Link>
            <Link
              href="/courses"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              الدورات
            </Link>
            <Link
              href="/recorded-lessons"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              الدروس المسجلة
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Login Button */}
            <Link
              href={"/login"}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              سجل دخولك
            </Link>

            {/* Signup Button */}
            <Link
              href={"/register"}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full hover:from-blue-600 hover:to-green-600 transition-all duration-300 hover:shadow-lg font-medium"
            >
              انشئ حسابك
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
            >
              {isDarkMode ? (
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center"
            >
              <span
                className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 my-1 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4 space-y-reverse">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                الرئيسية
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                عني
              </Link>
              <Link
                href="/courses"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                الدورات
              </Link>
              <Link
                href="/recorded-lessons"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                الدروس المسجلة
              </Link>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                تواصل معنا
              </a>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/login" className="block w-full mb-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-right rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  سجل دخولك
                </Link>
                <Link href="/register" className="block w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full hover:from-blue-600 hover:to-green-600 transition-all duration-300 text-center">
                  انشئ حسابك
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
