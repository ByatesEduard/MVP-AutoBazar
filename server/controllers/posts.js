import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


// create post
export const createPost = async (req, res) => {
  try {
    const { title, text, price, engine, transmission, mileage, fuel, imgUrl } = req.body;
    const user = await User.findById(req.userId); 

    if (!title || !text || !price || !engine || !transmission || !mileage || !fuel) { 
      return res.status(400).json({ message: 'Заповніть всі поля, включаючи ціну' });
    }

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url)); 
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        price,
        engine,
        transmission,
        mileage,
        fuel,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      price,
      engine,
      transmission,
      mileage,
      fuel,
      imgUrl: '',
      author: req.userId,
    });

    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    res.json(newPostWithoutImage);
  } catch (error) {
    console.error(error);
    res.json({ message: 'Что-то пошло не так' });
  }
};

// get all posts
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    const popularPosts = await Post.find().limit(5).sort('-views');

    if (posts.length === 0) {
      return res.json({ message: 'Постов нет' });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

// get post by id
export const getById = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { new: true } // Вернем обновленный пост
    );

    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

// get my posts
export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    const list = await Promise.all(
      user.posts.map(post =>{
        return Post.findById(post._id)
      })
    )
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

// remove post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if(!post) return res.json({message: 'Такого поста не существует'})

    await User.findByIdAndDelete(req.userId,{
      $pull: {posts: req.params.id},
    })
    res.json({message: 'Пост был удален'});
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};