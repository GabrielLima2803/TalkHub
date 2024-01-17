import { Request, Response } from 'express';
import { chatService } from '../services/ChatService';

export namespace ChatController {
  export class CreateConversationController {
    async handle(req: Request, res: Response) {
      try {
        const { userId1, userId2 } = req.params;

        const conversationService = new chatService.CreateConversationService();
        const conversation = await conversationService.execute({
          userId1: Number(userId1),
          userId2: Number(userId2),
        });

        return res.status(201).json(conversation);
      } catch (error) {
        console.error('Erro no controlador de criar conversa:', error);
        return res.status(500).json({ error: 'Erro interno' });
      }
    }
  }
  export class GetConversationInfoController {
    async handle(req: Request, res: Response) {
      try {
        const { conversationId } = req.params;
        const service = new chatService.GetConversationInfoService();
        const conversationInfo = await service.execute(Number(conversationId));
  
        return res.json(conversationInfo);
      } catch (error) {
        console.error('Error getting conversation info:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
