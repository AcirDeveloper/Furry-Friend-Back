import { PrismaClient } from '@prisma/client';

class Database {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' 
          ? ['query', 'error', 'warn'] 
          : ['error'],
      });
    }

    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      const prisma = Database.getInstance();
      await prisma.$connect();
      console.log('✅ Database connection established');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      process.exit(1);
    }
  }

  public static async disconnect(): Promise<void> {
    try {
      await Database.instance.$disconnect();
      console.log('Database disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting from database:', error);
      process.exit(1);
    }
  }
}

export default Database.getInstance();