import { Pool } from 'pg';
import { getAllPosts, getPostById, updatePostById, deletePostById } from "@/database";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"


const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  
  switch (req.method) {
    case 'GET':
      if (req.query.postId) {
        const postId = req.query.postId;
        const post = await getPostById(postId);
        if (!post) {
          res.status(404).json({ message: 'Post not found' });
          break;
        }
        res.status(200).json(post);
      } else {
        const result = await dbPool.query('SELECT * FROM posts');
        res.status(200).json(result.rows);
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
