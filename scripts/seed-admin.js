import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const password =
    process.env.SEED_ADMIN_PASSWORD || "Admin@123456";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`Admin user already exists with email ${email}`);
    return;
  }

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "ADMIN",
      name: "Admin",
      emailVerified: new Date(),
    },
  });

  console.log("Admin user created:");
  console.log(` email:    ${email}`);
  console.log(` password: ${password}`);
}

main()
  .catch((error) => {
    console.error("Failed to seed admin user:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
