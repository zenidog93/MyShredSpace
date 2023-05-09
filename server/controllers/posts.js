import Post from "../models/Post.js"
import User from "../models/User.js";

//create actions

export const createPost = async (req, res) => {
    try {
        const{userId, description, picturePath } = req.body;
        const user = await User.findById(userId); 
        const newPost = new Post ({
            userId, 
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath, 
            likes: {},
            comments: []
        })
        await newPost.save();
        //grabbing all the posts
        //gets a list of all the posts
        const post = await Post.find();
        res.status(201).json(post)

    } catch(error) {
        res.status(409).json({msg: error.message})
    }
};

//read action

export const getFeedPosts = async(req, res) => {
    try {
        const post = await Post.find();
        //successful read response
        res.status(200).json(post)
    } catch(error) {
        res.status(404).json({msg: error.message})
    }
}

//will only find the specific users posts
export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId})
        res.status(200).json(post)
    } catch(error) {
        res.status(404).json({msg: error.message})
    }
}

//update posts
export const likePost = async (req, res) => {
    try { 
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            //if it exists, it deletes
            post.likes.delete(userId);
            //if it doesnt, it sets the like object to true
        } else {
            post.likes.set(userId, true);
        }
        // update our post by finding the post and then updating the likes
        const updatePost = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes},
            {new: true}
        );
        res.status(200).json(updatePost)
    } catch(error) {
        res.status(404).json({msg: error.message})
    }
}