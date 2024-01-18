import { PrismaClient } from '@prisma/client';
import { AppError } from '../error/AppError';

const prisma = new PrismaClient();

export namespace chatService {
  export class CreateConversationService {
    async execute({ userId1, userId2 }: { userId1: number; userId2: number }) {
      try {
        const user1 = await prisma.user.findUnique({ where: { id: userId1 } });
        const user2 = await prisma.user.findUnique({ where: { id: userId2 } });

        if (!user1 || !user2) {
          throw new AppError('Usuários não encontrados');
        }

        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              connect: [{ id: userId1 }, { id: userId2 }],
            },
          },
        });

        return conversation;
      } catch (error) {
        console.error('Erro ao criar a conversa:', error);
        throw error;
      }
    }
  }
  export class GetConversationInfoService {
    async execute(conversationId: number) {
      try {
        const conversation = await prisma.conversation.findUnique({
          where: {
            id: conversationId,
          },
          include: {
            participants: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
            messages: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                sender: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
                receiver: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        });
  
        return conversation;
      } catch (error) {
        console.error('Error getting conversation info:', error);
        throw error;
      }
    }
  }
  export class CreateMessageService {
    async execute({ content, senderId, conversationId }: { content: string, senderId: number, conversationId: number }) {
      try {
        const conversation = await prisma.conversation.findUnique({
          where: {
            id: conversationId,
          },
          include: {
            participants: {
              select: {
                id: true,
              },
            },
          },
        });
  
        const receiverId = conversation?.participants.find(participant => participant.id !== senderId)?.id;
  
        const message = await prisma.message.create({
          data: {
            content,
            senderId,
            receiverId,
            conversationId,
          },
        });
  
        return {
          message,
          success: true,
        };
      } catch (error) {
        console.error('Error creating message:', error);
        throw error;
      }
    }
  }
}
