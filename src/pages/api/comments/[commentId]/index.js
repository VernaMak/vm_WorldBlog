import { getAllCommentsByCommentId, deleteCommentById,updateCommentById } from "@/database";

export default async function handler(req, res) {
  const { commentId } = req.query;

  switch (req.method) {
    case 'GET':
      const comment = await getAllCommentsByCommentId(commentId);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        break;
      }
      res.status(200).json(comment);
      break;

    case 'DELETE':
        await deleteCommentById(commentId);
        res.status(204).end();
        break;
    
    case 'PATCH':
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ message: 'Please put the content here' });
            break;
        }
        const updatedComment = await updateCommentById(commentId, text);
        res.status(200).json(updatedComment);
        break;

    default:
      res.status(405).end();
      break;
  }
}
