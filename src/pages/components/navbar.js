import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import PostPage from "../posts/[postId]";
import styles from '../../styles/Home.module.css';

export default function NavBar() {
    const { data: session } = useSession();
    const router = useRouter();
  
    const navigation = [
      { href: '/posts', label: 'Home' },
    ];
  
    return (
      <nav className={styles.navbar}>
        {navigation.map((navItem, index) => (
          <a
            key={index}
            href={navItem.href}
            className={`${router.pathname === navItem.href ? 'active' : ''} ${navItem.current ? 'current' : ''}`}
          >
            {navItem.label}
          </a>
        ))}
        {session ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </nav>
    );
  }
