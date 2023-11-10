import { PrismaClient } from '@prisma/client';

export default new class DatabaseService {
    prisma : PrismaClient
    constructor() {
        this.prisma = new PrismaClient();
      }
}