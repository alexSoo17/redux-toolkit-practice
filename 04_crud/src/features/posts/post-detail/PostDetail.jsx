import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostById } from "../postSlice";
import ReactionButton from "../reaction-button/ReactionButton";
import PostAuthor from "../post-author/PostAuthor";
import PostDate from "../post-date/PostDate";
const PostDetail = () => {
  const { postId } = useParams();
  const post = useSelector((state) => getPostById(state, postId));
  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
  return (
    <article key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postInfo">
        <Link className="link" to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
        <PostAuthor userId={post.userId} />
        <PostDate date={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

export default PostDetail;
