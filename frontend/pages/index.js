import Link from "next/link";
import styled from "styled-components";
export default function Home({ posts }) {
  return (
    <HomeContainer>
      <h1>My Strapi Blog</h1>

      <div className="posts__container">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <Link href={`/${post.slug}`}>
              <a>
                <h2>{post.title} ▶</h2>
                <div className="[posts__username">
                  by {post.author.username}
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  padding-bottom: 4rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #eef2ff;
  color: #312e81;

  & h1 {
    font-size: 4rem;
    text-align: center;
  }
  & .posts__container {
    & .post {
      background: #fff;
      padding: 1em 2rem;
      border-radius: 1rem;
      margin: 1rem;
      & a {
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
            rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        }
        & h2 {
          margin: 0.25rem auto;
          color: #3730a3;
        }
      }
    }
  }
`;

export async function getStaticProps() {
  // get Data from our api
  const res = await fetch("http://localhost:1337/posts");
  const posts = await res.json();

  // pass it to component
  return { props: { posts } };
}
