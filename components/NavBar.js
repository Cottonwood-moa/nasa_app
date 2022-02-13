/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <img
        src="https://media1.giphy.com/media/badVxz42hMSF5fgP8J/giphy.gif?cid=790b7611ee2f63ff3d08be6b12325020c82bdbab4718fab7&rid=giphy.gif&ct=s"
        alt=""
      />
      <Link href="/">
        <a className={router.pathname === '/' ? 'active' : ''}>APOD</a>
      </Link>
      <Link href="/library">
        <a className={router.pathname.includes('/library') ? 'active' : ''}>
          LIBRARY
        </a>
      </Link>
      <Link href="/about">
        <a className={router.pathname.includes('/about') ? 'active' : ''}>
          ABOUT
        </a>
      </Link>
      <style jsx>
        {`
          nav {
            width: 100%;
            height: 5rem;
            background-color: #222;
            display: flex;
            align-items: center;
            img {
              width: 200px;
              height: 200px;
            }
            a {
              color: white;
              font-size: 24px;
              margin: 2rem;
            }
            .active {
              color: royalblue;
            }
          }
        `}
      </style>
    </nav>
  );
}
