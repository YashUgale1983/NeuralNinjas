import express from "express";
import {
  register,
  login,
  logout,
  protect,
  uploadFile,
} from "../controllers/authController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/videos");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/protect", protect);
router.post("/upload", upload.single("file"), uploadFile);

export default router;
