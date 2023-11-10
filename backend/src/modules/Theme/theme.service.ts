import { Event, PrismaClient } from "@prisma/client";
import DatabaseService from "../Database";
import { newTheme } from "./dto/newTheme.dto";
import { assignTheme } from "./dto/assignTheme.dto";
import { deleteTheme } from "./dto/deleteTheme.dto";

export default class themeService {
  private dataBase;
  constructor() {
    this.dataBase = DatabaseService;
  }
  newTheme = async (newTheme: newTheme) => {
    const newtheme = await this.dataBase.prisma.eventTheme.create({
      data: {
        ...newTheme,
      },
    });
    return newtheme;
  };
  ifOwnerOfTeam = async (userId: string, teamId: string) => {
    const find = await this.dataBase.prisma.team.findFirst({
      where: {
        creatorId: userId,
        id: teamId,
      },
    });
    return find ? true : false;
  };
  assignTheme = async (userId: string, assignData: assignTheme) => {
    const find = await this.ifOwnerOfTeam(userId, assignData.id);
    if (find) {
      await this.dataBase.prisma.team.update({
        where: {
          id: assignData.id,
        },
        data: {
          selectedEventThemeId: assignData.selectedEventThemeId,
        },
      });
    }
    return {};
  };
  deleteThemeforSpecificEvent = async(userid: string,deleteTheme: deleteTheme)=> {
    const res = await this.dataBase.prisma.eventTheme.delete({
        where: {
            id: deleteTheme.id,
            eventId: deleteTheme.eventId
        }
    })
    return res
  }
}
