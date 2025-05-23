import { Router } from "express"
import { generateArticleController, listArticlesController, deleteArticleController, getArticleByIdController } from "../controllers/articleController"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = Router()

router.post("/generate", authMiddleware, generateArticleController)
router.get("/", authMiddleware, listArticlesController)
router.get("/:id", authMiddleware, getArticleByIdController)
router.delete("/:id", authMiddleware, deleteArticleController)

export default router 