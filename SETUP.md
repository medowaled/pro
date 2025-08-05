# 🎓 Course Management System Setup

## 🚀 Quick Setup

### 1. Database Setup
Run the following command to set up the database with static courses:

```bash
npm run setup:db
```

This will:
- Generate Prisma client
- Run database migrations
- Seed static courses with gradient data

### 2. Start Development Server
```bash
npm run dev
```

## 🎨 New Features

### Gradient Course Cards
- **User Dashboard**: Students can view their enrolled courses with beautiful gradient cards
- **Course Display**: All courses now use gradient backgrounds instead of images
- **Responsive Design**: Cards work perfectly on all screen sizes

### Admin Enrollment System
- **Enroll Students**: Admins can enroll students in both regular and static courses
- **Course Management**: View and manage all enrollments from admin dashboard
- **Static Course Support**: Full support for the 3 static grade level courses

### User Dashboard
- **Enrolled Courses Only**: Students see only courses they're enrolled in
- **Gradient Cards**: Beautiful gradient backgrounds for each course
- **Course Access**: Direct access to course content and videos

## 📁 File Structure

### New Components
- `src/components/gradient-course-card.tsx` - Gradient course card component
- `src/app/user/my-courses/page.tsx` - Updated user dashboard

### Updated APIs
- `src/app/api/courses/route.ts` - Enhanced to handle static course enrollments
- `src/app/api/enrollments/route.ts` - Updated to handle both course types

### Database
- `prisma/schema.prisma` - Added StaticCourse and StaticEnrollment models
- `src/lib/db-seeder.ts` - Database seeding functions

## 🎯 Usage

### For Admins
1. Go to `/admin/enrollments/new`
2. Select a student and course
3. Click "تسجيل الطالب" to enroll

### For Students
1. Login to your account
2. Go to `/user/my-courses`
3. View your enrolled courses with gradient cards
4. Click on any course to access content

## 🔧 Troubleshooting

### If gradients don't show:
1. Make sure database is seeded: `npm run seed:static-courses`
2. Check that Prisma client is generated: `npx prisma generate`
3. Verify database connection

### If enrollments don't work:
1. Run database migrations: `npx prisma migrate dev`
2. Check admin permissions
3. Verify user authentication

## 🎨 Gradient Colors

The system uses these beautiful gradients:
- **الصف الأول الإعدادي**: Purple to Pink (`from-purple-500 to-pink-600`)
- **الصف الثاني الإعدادي**: Blue to Indigo (`from-blue-500 to-indigo-600`)
- **الصف الثالث الإعدادي**: Green to Teal (`from-green-500 to-teal-600`)

## 📱 Responsive Design

All gradient cards are fully responsive:
- **Desktop**: 3 columns layout
- **Tablet**: 2 columns layout  
- **Mobile**: 1 column layout

## 🔐 Security

- Admin-only enrollment creation
- User authentication required for course access
- Proper authorization checks throughout the system 