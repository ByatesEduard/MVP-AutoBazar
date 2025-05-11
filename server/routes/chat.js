import { Router } from 'express';
import { sendMessage } from '../controllers/chat.js';

const router = new Router();

// httts://localhost:3001/api/chat
router.post('/chat', sendMessage);

export default router;
