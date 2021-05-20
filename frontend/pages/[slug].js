export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>by {post.author.username}</p>

      <div>{post.content}</div>
    </div>
  );
}

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
