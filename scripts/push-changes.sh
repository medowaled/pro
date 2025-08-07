#!/bin/bash

echo "🔍 فحص حالة Git..."
git status

echo "📦 إضافة جميع التغييرات..."
git add .

echo "�� حفظ التغييرات..."
git commit -m "إصلاح جميع الأخطاء في الكود - تحسين العمليات المنطقية وتصحيح template literals"

echo "🚀 رفع التغييرات إلى GitHub..."
git push origin main

echo "✅ تم رفع التغييرات بنجاح!"
