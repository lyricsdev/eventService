import { JsonController, Param, Body, Get, Post, Patch } from "routing-controllers";
import themeService from "./theme.service";
import { Event } from "@prisma/client";
import { newTheme } from "./dto/newTheme.dto";
import { assignTheme } from "./dto/assignTheme.dto";

@JsonController("/event/theme")
export class themeController {
    private themeService: themeService;
    constructor() {
        this.themeService = new themeService();
    }
    @Post("/create")
    async createTheme(@Body() body: newTheme){
        return await this.themeService.newTheme(body)
    }
    @Patch("/assigntheme")
    async assigntheme(@Body() body: assignTheme){
        return await this.themeService.assignTheme("null",body)
    }
}