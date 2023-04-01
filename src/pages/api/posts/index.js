import {  getAllPosts, createNewPost } from "@/database";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const posts = await getAllPosts();
      res.status(200).json(posts);
      break;
    case 'POST':
      const { title, content } = req.body;
      const newPost = await createNewPost(title, content);
      res.status(201).json(newPost);
      break;
    default:
      res.status(405).end();
      break;
  }
}
