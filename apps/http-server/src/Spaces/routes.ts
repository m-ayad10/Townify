import express, { Router } from "express"
import { userMiddleware } from "../lib/middleware.js"
import { createSpace, updateSpace, deleteSpace, getSpace, joinSpace, leaveSpace, blockUserInSpace } from "./controller.js"

const router: Router = express.Router()

router.post("/", userMiddleware, createSpace)

router.get("/:id",userMiddleware, getSpace)

router.patch("/:id", userMiddleware, updateSpace)

router.delete("/:id", userMiddleware, deleteSpace)

router.post("/join/:slug", userMiddleware, joinSpace)
router.post("/leave/:slug", userMiddleware, leaveSpace)
router.post("/block/:slug/:userIdToBlock", userMiddleware, blockUserInSpace)

export default router