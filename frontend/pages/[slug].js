import Link from "next/link";
import styled from "styled-components";

export default function Post({ post }) {
  return (
    <PostContainer>
      <header>
        <h1>{post.title}</h1>
        <p className="post__author">by {post.author.username}</p>
      </header>

      <div className="post__content">{post.content}</div>
      <div className="post__backlink">
        <Link href="/">
          <a>◀ Home </a>
        </Link>
      </div>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  padding-bottom: 4rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #eef2ff;
  color: #312e81;

  & header {
    display: flex;
    flex-direction: column;
    align-items: center;
    & h1 {
      margin-bottom: 0.25rem;
    }
    & .post__author {
      background-color: #312e81;
      color: #eef2ff;
      padding: 0.125rem 1rem;
      border-radius: 1rem;
      margin: 0;

      font-size: 0.875rem;
      letter-spacing: 0.05rem;
      text-transform: uppercase;
    }
    margin-bottom: 1.5rem;
  }

  .post__content {
    font-size: 1.25rem;
    background: #fff;
    padding: 1em 2rem;
    border-radius: 1rem;
    margin: 1rem;
    transition: box-shadow 300ms ease-in;
  }
`;

// step 1: tell nextjs about all the post that we need to make
export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/posts");
  const posts = await res.json();

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

// step 2: tell nextjs how to get data for a single post
export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:1337/posts?slug=${params.slug}`);

  const data = await res.json();

  return { props: { post: data[0] } };
}
