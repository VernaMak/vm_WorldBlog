import { createNewComment, getAllCommentsByPostId, deleteCommentById } from "@/database";

export default async function handler(req, res) {
  const { postId, commentId } = req.query;
  
  switch (req.method) {
    case 'GET':
      const comments = await getAllCommentsByPostId(postId);
      res.status(200).json(comments);
      break;

    case 'POST':
      const { content } = req.body;
      const newComment = await createNewComment(postId, content);
      res.status(201).json(newComment);
      break;

    case 'DELETE':
      await deleteCommentById(commentId);
      res.status(204).end();
      break;

    default:
      res.status(405).end();
      break;
  }
}
