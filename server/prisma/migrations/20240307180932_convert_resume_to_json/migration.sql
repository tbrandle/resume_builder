/*
  Warnings:

  - You are about to drop the column `education` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `employment_history` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `peronalDetailsId` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `resume_title` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `social_media` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PeronalDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resume` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_peronalDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_peronalDetailsId_fkey";

-- DropIndex
DROP INDEX "Resume_peronalDetailsId_key";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "education",
DROP COLUMN "employment_history",
DROP COLUMN "peronalDetailsId",
DROP COLUMN "resume_title",
DROP COLUMN "skills",
DROP COLUMN "social_media",
ADD COLUMN     "resume" JSONB NOT NULL;

-- DropTable
DROP TABLE "Field";

-- DropTable
DROP TABLE "PeronalDetails";
