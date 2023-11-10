import { Event, PrismaClient } from '@prisma/client';
import DatabaseService from '../Database';

export default class eventService {
    private dataBase
    constructor() {
        this.dataBase = DatabaseService
    }
    async getEvents(): Promise<Event[]> {
        const event = await this.dataBase.prisma.event.findMany();
        return event;
    }

    async getEventById(id: string): Promise<Event | null> {
        const event = await this.dataBase.prisma.event.findUnique({
            where: { id },
        });
        return event;
    }

    async createEvent(data: Event): Promise<Event> {
        const event = await this.dataBase.prisma.event.create({ data });
        return event;
    }
}