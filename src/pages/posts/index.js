import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSession,signOut } from 'next-auth/react';
import NavBar from 'src/pages/components/navbar';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      axios.get('/api/posts')
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [session]);

  const postTitle = (event) => {
    setTitle(event.target.value);
  };

  const postContent = (event) => {
    setContent(event.target.value);
  };

  const sumbitPost = async (event) => {
    event.preventDefault();

    const newPost = { title, content };
    await axios.post('/api/posts', newPost);
    setTitle('');
    setContent('');

    const res = await axios.get('/api/posts');
    setPosts(res.data);

  };


  const deletePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`);

    const res = await axios.get('/api/posts');
    setPosts(res.data);
  };

  const editPost = (post) => {
    setIsEditing(true);
    setUpdatedContent(post.content);
    setPostId(post.id);
  };

  return (
    <>
      <Head>
        <title>WorldBlog</title>
      </Head>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.h1}>Share your thoughts </h1> <br/>  <h1 className={styles.h1_right} > with the world  </h1>
        {session ? (
          <div className={styles.input_cnt}>
            <form onSubmit={sumbitPost}>
              <div>
                <span>Title:</span>
                <input className={styles.input} type="text" value={title} onChange={postTitle} />
              </div>
              <div>
                <span>Content:</span>
                <textarea className={styles.input2} value={content} onChange={postContent} />
              </div>
              <div className={styles.bnt_cnt}>
                <button className={styles.post_bnt} type="submit">Post!</button>
              </div>
            </form>
          </div>
          
        ) : (
          <div className={styles.main}>
          <p  className={styles.alert_message}>Please sign in to see the post </p>
          </div>
        )}
        <div className={styles.post_cnt}>
          {posts.map((post) => (
            <div className={styles.post} key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <div className={styles.title_cnt}>
                  <h2 className={styles.post_title}>{post.title}</h2>
                </div>
                <div className={styles.p_cnt}>
                  <p className={styles.p}>{post.content}</p>
    
                </div>
                
              </Link>
              {session && (
                <button className={styles.delete_bnt} onClick={() => deletePost(post.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
