/*
  Warnings:

  - The primary key for the `Resume` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personalDetailsId` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `personal_details` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[peronalDetailsId]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `peronalDetailsId` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_pkey",
DROP COLUMN "personalDetailsId",
DROP COLUMN "personal_details",
ADD COLUMN     "peronalDetailsId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Resume_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Resume_id_seq";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "PeronalDetails" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "professional_summary" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PeronalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "peronalDetailsId" TEXT,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_peronalDetailsId_key" ON "Resume"("peronalDetailsId");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_peronalDetailsId_fkey" FOREIGN KEY ("peronalDetailsId") REFERENCES "PeronalDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_peronalDetailsId_fkey" FOREIGN KEY ("peronalDetailsId") REFERENCES "PeronalDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
