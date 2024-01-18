import { Router } from "express";
import { ChatController } from "../controller/ChatController";
import checkToken from "../middleware/checkToken";

const createConversation = new ChatController.CreateConversationController();
const getInfoConversation = new ChatController.GetConversationInfoController();
const createMessage = new ChatController.CreateMessageController();

const chatRouter = Router();

chatRouter.post('/create/:userId1/:userId2', checkToken, createConversation.handle);
chatRouter.get('/get-info/:conversationId', checkToken, getInfoConversation.handle);
chatRouter.post('/create-message', checkToken, createMessage.handle)

export {chatRouter}