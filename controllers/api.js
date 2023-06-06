const Post = require('../models/posts');

module.exports = class API {
    static async fetchAllPost(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async fetchPostByID(req, res) {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async createdPost(req, res) {
        console.log(req)
        const post = req.body;

        let imageNames = [];
        if (req.files?.image) {
            imageNames = req.files.image.map(file => file.filename);
        }

        const videoName = req.files.video ? req.files.video[0].filename : null;
        post.image = imageNames;
        post.video = videoName;
        try {
            await Post.create(post);
            res.status(201).json({ message: 'Post created successfully!' })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    static async updatePost(req, res) {
        res.send('update Post');
    }
};
