import { JsonController, Param, Body, Get, Post } from "routing-controllers";
import { Event } from "@prisma/client";
import eventService from "./event.service";

@JsonController("/event")
export class eventController {
    private eventService: eventService;
    constructor() {
        this.eventService = new eventService();
    }
    @Get("/")
    async getEvents(): Promise<Event[]> {
        return await this.eventService.getEvents();
    }

    @Get("/:id")
    async getEvent(@Param("id") id: string): Promise<Event | null> {
        return await this.eventService.getEventById(id);
    }

    @Post("/")
    async createEvent(@Body() eventData: Event): Promise<Event> {
        return await this.eventService.createEvent(eventData);
    }
}