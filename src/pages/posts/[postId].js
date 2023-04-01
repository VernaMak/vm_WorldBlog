import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from "src/styles/Home.module.css";
import NavBar from 'src/pages/components/navbar';
import { useSession,signOut } from 'next-auth/react';

export default function PostPage() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const { data: session } = useSession();
 
  useEffect(() => {
    
    async function fetchPostAndCommentsData() {
        try {
          const [postRes, commentsRes] = await Promise.all([
            axios.get(`/api/posts/${postId}`),
            axios.get(`/api/comments?postId=${postId}`),
          ]);
          console.log(postRes.data);
          console.log(commentsRes.data); 
          setPost(postRes.data);
          setComments(commentsRes.data);
          console.log(comments.length);
        } catch (error) {
          console.error(error);
        }
        const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(`/api/comments?postId=${postId}`, { content: newComment });
    setComments([...comments, data]);
    setNewComment('');
  }
      }
      if (postId && session) {
        fetchPostAndCommentsData();
      }
    }, [postId, session]);

  const CommentSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(`/api/comments?postId=${postId}`, { content: newComment });
    setComments([...comments, data]);
    setNewComment('');
  }

  const DeleteComment = async (commentId) => {
    await axios.delete(`/api/comments/${commentId}`);
    setComments(comments.filter((comment) => comment.commentid !== commentId));
  };

if (!session) {
    return (
      <>
        <Head>
          <title>Please Sign In</title>
        </Head>
        <NavBar />
        <main className={styles.comment_page}>
          <div >
            <p className={styles.alert_message}>Please sign in to see the comments.</p>
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>{post ? post.title : 'Post'}</title>
      </Head>
      <NavBar />
      <main className={styles.comment_page}>
        <div className={styles.post}>
        {post   && (
          <>
            <h1 className={styles.post_title2}>{post.title}</h1>
            <p className={styles.post_p2}>{post.content}</p>
          </>
        )}
        </div>
        <h2 className={styles.comment_h2}>Comments</h2>
      
          <div >
            {comments.map((comment) => (
              <div className={styles.comment} key={comment.commentid}>
                {comment.commentid} : {comment.text}
                <div>
                <button className={styles.comment_del_bnt} type="button" onClick={() => DeleteComment(comment.commentid)}>Delete</button>
                </div>
                
              </div>
            ))}
          </div>
        
        <div className={styles.comment_bnt_cnt}>
          <span>
            <input className={styles.comment_input} type="text" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
          </span>
         
          <button className={styles.submit_bnt} type="button" onClick={CommentSubmit}>Submit</button>
     
        </div>
      </main>
    </>
  );
}
