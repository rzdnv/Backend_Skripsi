import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Cek apakah sudah ada admin
  const existing = await prisma.admin.findFirst({
    where: {
      telephone: "081234567890", // bisa diganti
    },
  });

  const hashedPassword = await bcrypt.hash("admin123", 10);

  if (!existing) {
    await prisma.admin.create({
      data: {
        telephone: "081234567890",
        name: "Admin Utama",
        email: "admin@dishub.go.id",
        password: hashedPassword,
        isActive: true,
        adminRole: "SUPERADMIN",
        division: {
          connectOrCreate: {
            where: { id: 1 },
            create: {
              title: "Divisi Umum", // ganti sesuai kebutuhan
            },
          },
        },
      },
    });
    console.log("Admin berhasil ditambahkan.");
  } else {
    console.log("Admin sudah ada, tidak ditambahkan.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
