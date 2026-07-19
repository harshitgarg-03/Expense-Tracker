// import "dotenv/config";

// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../generated/prisma/client";

// const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });

// export { prisma };


import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// const connectionString = "postgresql://neondb_owner:npg_Rv7mDBZd5jwV@ep-soft-base-apz06tg5-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=15";

const connectionString = process.env.DATABASE_URL!;
// console.log("helo", connectionString);

if (!connectionString) {
    throw new Error("ERROR:: Connection String not found. Please set DATABASE_URL.");
}

const adapter = new PrismaPg({ connectionString });
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;