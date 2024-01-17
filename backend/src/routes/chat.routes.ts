import { Router } from "express";
import { ChatController } from "../controller/ChatController";
import checkToken from "../middleware/checkToken";

const createConversation = new ChatController.CreateConversationController();
const getInfoConversation = new ChatController.GetConversationInfoController()

const chatRouter = Router();

chatRouter.post('/create/:userId1/:userId2', checkToken, createConversation.handle);
chatRouter.get('/get-info/:conversationId', checkToken, getInfoConversation.handle);

export {chatRouter}