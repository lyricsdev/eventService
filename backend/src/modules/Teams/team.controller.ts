import { JsonController, Param, Body, Get, Post, Patch } from "routing-controllers";
import teamsService from "./teams.service";
import { Team } from "@prisma/client";
import { createTeam } from "./dto/createTeam.dto";
import { acceptInvitation } from "./dto/acceptInvitation.dto";

@JsonController("/teams")
export class teamController {
    private teamsService: teamsService;
    constructor() {
        this.teamsService = new teamsService();
    }
    @Post("/")
    async createTeam(@Body() body : createTeam) {
        return await this.teamsService.createTeam("null",body)
    }
    @Patch("/accept")
    async acceptInvitation(@Body() body : acceptInvitation) {
        return await this.teamsService.acceptInvitation("null",body)
    }
}