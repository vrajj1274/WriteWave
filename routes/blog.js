const { Router } = require('express');
const multer = require('multer');
const Blog = require('../models/blog');
const Comment = require('../models/comment');  // ✅ Renamed for clarity
const path = require("path");
const router = Router();

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads/'));  // ✅ Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

// ✅ Route to Render Blog Creation Form
router.get('/add-new', (req, res) => {
    return res.render("addBlog", {
        user: req.user,  // ✅ Ensure req.user exists
    });
});

// ✅ Route to Fetch Blog Details and Comments
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy");

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
        console.log(comments);


        return res.render("blog", {
            user: req.user,
            blog,
            comments,
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// ✅ Route to Handle Blog Comments
router.post("/comment/:blogId", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Unauthorized: Please log in to comment.");
        }

        const newComment = await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });

        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// ✅ Route to Handle Blog Post Submission
router.post('/', upload.single("coverImage"), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Unauthorized: Please log in to create a blog.");
        }

        if (!req.file) {
            return res.status(400).send("Error: Cover image is required.");
        }

        const { title, body } = req.body;

        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImageUrl: `/uploads/${req.file.filename}`
        });

        return res.redirect(`/blog/${blog._id}`);

    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
