/**
 * Client Prisma — Wrapper global.
 *
 * Mode Mock (USE_MOCK_DB=true) : Utilise une implémentation en mémoire (mock-prisma).
 * Mode Réel : Utilise le client Prisma généré (MySQL).
 */
import { PrismaClient } from '@/generated/prisma_v2/client';
import mockPrismaClient from './mock-prisma';

const prismaClientSingleton = () => {
  if (process.env.USE_MOCK_DB === 'true') {
    return mockPrismaClient as unknown as PrismaClient;
  }
  return new PrismaClient();
};

const g = global as typeof global & {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
};

const prisma = g.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  g.prismaGlobal = prisma;
}

export default prisma;