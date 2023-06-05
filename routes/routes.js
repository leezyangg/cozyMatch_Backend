const express = require('express');
const router = express.Router();
const API = require("../controllers/api");
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]);

router.get("/", API.fetchAllPost);
router.get("/:id", API.fetchPostByID);
router.post("/", upload, API.createdPost);
router.patch("/:id", API.updatePost);

module.exports = router;