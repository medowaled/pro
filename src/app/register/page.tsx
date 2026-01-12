"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    parentPhone: "",
    governorate: "",
    grade: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const governorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الشرقية",
    "الغربية",
    "المنوفية",
    "القليوبية",
    "المنيا",
    "أسيوط",
    "سوهاج",
    "قنا",
    "الأقصر",
    "أسوان",
    "بني سويف",
    "الفيوم",
    "الوادي الجديد",
    "مطروح",
    "شمال سيناء",
    "جنوب سيناء",
    "البحر الأحمر",
    "دمياط",
    "كفر الشيخ",
    "الدقهلية",
    "البحيرة",
  ];

  const grades = [
    "الصف الأول الإعدادي",
    "الصف الثاني الإعدادي",
    "الصف الثالث الإعدادي",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "الاسم الأول مطلوب";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "الاسم الأخير مطلوب";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح";
    }

    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = "رقم هاتف ولي الأمر مطلوب";
    } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.parentPhone)) {
      newErrors.parentPhone = "رقم هاتف ولي الأمر غير صحيح";
    }

    if (!formData.governorate) {
      newErrors.governorate = "المحافظة مطلوبة";
    }

    if (!formData.grade) {
      newErrors.grade = "المرحلة مطلوبة";
    }

    if (!formData.password) {
      newErrors.password = "كلمة السر مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة السر يجب أن تكون 6 أحرف على الأقل";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة السر مطلوب";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة السر غير متطابقة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-20 md:py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            إنشاء حساب جديد
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            انضم إلى منصة أستاذ مصطفى خليل
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  الاسم الأول
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.firstName
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                  placeholder="أدخل الاسم الأول"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  الاسم الأخير
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.lastName
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                  placeholder="أدخل الاسم الأخير"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.lastName}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                  placeholder="01xxxxxxxxx"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Parent Phone */}
              <div>
                <label
                  htmlFor="parentPhone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  رقم هاتف ولي الأمر
                </label>
                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.parentPhone
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                  placeholder="01xxxxxxxxx"
                />
                {errors.parentPhone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.parentPhone}
                  </p>
                )}
              </div>

              {/* Governorate */}
              <div>
                <label
                  htmlFor="governorate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  المحافظة
                </label>
                <select
                  id="governorate"
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.governorate
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                >
                  <option value="">اختر المحافظة</option>
                  {governorates.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
                {errors.governorate && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.governorate}
                  </p>
                )}
              </div>

              {/* Grade */}
              <div>
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  المرحلة
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.grade
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                >
                  <option value="">اختر المرحلة</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                {errors.grade && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.grade}
                  </p>
                )}
              </div>
            </div>

            {/* Password - Full Width */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                كلمة السر
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.password
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                }`}
                placeholder="أدخل كلمة السر"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password - Full Width */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                تأكيد كلمة السر
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.confirmPassword
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                }`}
                placeholder="أعد إدخال كلمة السر"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              إنشاء الحساب
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              لديك حساب بالفعل؟{" "}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
              >
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
