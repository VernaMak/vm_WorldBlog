import { createNewPost, getPostById, deletePostById, updatePostById } from "@/database";

export default async function handler(req, res) {
  const { postId } = req.query;

  switch (req.method) {
    case 'GET':
      const post = await getPostById(postId);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        break;
      }
      res.status(200).json(post);
      break;
    case 'POST':
      const { title, content } = req.body;
      const newPost = await createNewPost(title, content);
      res.status(201).json(newPost);
      break;
      case 'DELETE':
        await deletePostById(postId);
        res.status(204).end();
        break;

        case 'PATCH':
      const { updatedTitle, updatedContent } = req.body;
      if (!updatedTitle || !updatedContent) {
        res.status(400).json({ message: 'Please put your updated title and content' });
        break;
      }
      const updatedPost = await updatePostById(postId, updatedTitle, updatedContent);
      res.status(200).json(updatedPost);
      break;
  
    
    default:
        res.status(405).end();
        break;
  }
}
