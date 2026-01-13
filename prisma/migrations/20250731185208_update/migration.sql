-- CreateTable
CREATE TABLE "StaticCourse" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "students" TEXT NOT NULL,
    "lessons" TEXT NOT NULL,
    "gradient" TEXT NOT NULL,
    "shadowColor" TEXT NOT NULL,
    "imageBase64" TEXT,
    "units" JSONB NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaticCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticEnrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StaticEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaticCourse_courseId_key" ON "StaticCourse"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "StaticEnrollment_userId_courseId_key" ON "StaticEnrollment"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "StaticEnrollment" ADD CONSTRAINT "StaticEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaticEnrollment" ADD CONSTRAINT "StaticEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "StaticCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
