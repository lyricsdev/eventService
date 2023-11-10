import { Event,Team, PrismaClient } from '@prisma/client';
import DatabaseService from '../Database';
import { TeamResponse } from '../../middleware/responses/teamResponses';
import { createTeam } from './dto/createTeam.dto';
import { assignTheme } from '../Theme/dto/assignTheme.dto';
import { acceptInvitation } from './dto/acceptInvitation.dto';

export default class teamsService {
    private dataBase : typeof DatabaseService
    constructor() {
        this.dataBase = DatabaseService
    }
    createTeam = async(userId: string, data : createTeam)=> {
       if(userId === data.creatorId) {
        await this.dataBase.prisma.team.create({
          data: {
            ...data
          }
        })
        return {}
       }
       return {}
    }
    ifOwnerOfTeam = async(userId: string,teamId: string) => {
      const find = await this.dataBase.prisma.team.findFirst({
        where: {
          creatorId: userId,
          id: teamId
        }
      })
      return find ? true : false
    }
    generateLink = async(userId: string,teamId: string) => {
      const find = await this.ifOwnerOfTeam(userId,teamId)
      if(find) {
        const data = await this.dataBase.prisma.invitation.create({
          data: {
            TeamId: teamId,
            closed: false,
            type: 0
          }
        })
        return data
      }
      return {}
    }
    acceptInvitation = async(userId: string,acceptInvitation: acceptInvitation)=> {
      if(userId === acceptInvitation.userId) return {}
      const correctTeam = await this.dataBase.prisma.invitation.findFirst({
        where: {
          id: acceptInvitation.id
        },
        select: {
          type: true,
          team: {
            select: {
              id: true,
              event: {
                select: {
                  id: true,
                  dateStart: true
                }
              }
            }
          },
        }
      })
      if(correctTeam) {
        if(new Date() > new Date(correctTeam.team.event.dateStart)) return {}
        switch(correctTeam.type) {
          case 0: {
            await this.dataBase.prisma.team.update({
              where: {
                id: correctTeam.team.id
              },
              data: {
                users: {
                  connect: {
                    id: userId
                  }
                }
              }
            })
          }break;
          case 1: {
            await this.dataBase.prisma.event.update({
              where: {
                id: correctTeam.team.id
              },
              data: {
                judges: {
                  connect: {
                    id: userId
                  }
                }
              }
            })
          } break;
        }
        return {}
      }
      return {}
    }
}