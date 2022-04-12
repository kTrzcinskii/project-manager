/*
  Warnings:

  - You are about to drop the column `prority` on the `projects` table. All the data in the column will be lost.
  - Added the required column `priority` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "prority",
ADD COLUMN     "priority" "Priority" NOT NULL;

-- DropEnum
DROP TYPE "Prority";
