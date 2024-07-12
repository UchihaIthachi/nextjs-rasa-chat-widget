import { useRouter } from 'next/router';

const Post = ({ post }) => {
  const router = useRouter();

  // If the page is not yet generated, display a loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Fetch the list of posts from an API or file system
  const res = await fetch('https://example.com/api/posts');
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map(post => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: true } will server-render pages on-demand if the path doesn't exist.
  return { paths, fallback: true };
}

// This function gets called at build time for each path specified in getStaticPaths
export async function getStaticProps({ params }) {
  // Fetch the post data based on the id
  const res = await fetch(`https://example.com/api/posts/${params.id}`);
  const post = await res.json();

  // Pass post data to the page component as props
  return { props: { post } };
}

export default Post;
