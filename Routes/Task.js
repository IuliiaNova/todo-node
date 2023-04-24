import express from 'express'
import { VerifyJwtToken } from '../middleware/VerifyToken.js';

import { 
  CreateTask, 
  GetTask, 
  GetTasks,
  UpdateTask
} from '../Controllers/Task.js'

const router = express.Router()

router.post("/create", VerifyJwtToken, CreateTask);
router.put("/:id", VerifyJwtToken, UpdateTask);
router.get("/:id", VerifyJwtToken, GetTask);
router.get("/", VerifyJwtToken, GetTasks);

export default router