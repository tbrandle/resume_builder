-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "resume_title" TEXT NOT NULL,
    "personal_details" TEXT NOT NULL,
    "social_media" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "employment_history" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "personalDetailsId" INTEGER NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);
