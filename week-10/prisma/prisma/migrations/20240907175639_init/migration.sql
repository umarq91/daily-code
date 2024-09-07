/*
  Warnings:

  - You are about to drop the column `published_on` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "published_on";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updated_at";
