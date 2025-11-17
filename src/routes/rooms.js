import express from "express";
import Room from "../models/Room.js";
import { generateRoomId } from "../utils/generateId.js";

const router = express.Router();

// create room
router.post("/create", async (req, res) => {
  try {
    const { userId, mode = "one-to-one", maxUsers = 2, language = "javascript" } = req.body;
    const roomId = generateRoomId(8);
    const room = await Room.create({ roomId, createdBy: userId, mode, maxUsers, language });
    res.json({ success: true, room });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// get room details
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });
    if (!room) return res.status(404).json({ error: "Not found" });
    res.json(room);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
