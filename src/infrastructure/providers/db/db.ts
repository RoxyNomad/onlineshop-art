import { PrismaClient } from './prisma/generated/client';

// ✅ Singleton-PrismaClient: verhindert mehrfaches Erstellen in dev/hot-reload
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // 🔹 Dev-Umgebung: PrismaClient einmal global speichern, um Hot Reload-Probleme zu vermeiden
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;

/**
 * Beispiel für eine einfache Query-Funktion:
 * Kann optional erweitert werden, um generische Abfragen zu kapseln.
 */
export const query = async <T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> => {
  try {
    return await fn(prisma);
  } catch (error) {
    console.error('❌ Database query error:', error);
    throw error;
  }
};