import ReactionButton from "../reaction-button/ReactionButton";
import "./style.css";
import PostAuthor from "../post-author/PostAuthor";
import PostDate from "../post-date/PostDate";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <article key={post.id}>
      <h2>{post.title}</h2>
      <p>{`${post.body.substring(0, 100)}......`}</p>
      <p className="postInfo">
        <Link className="link" to={`/post/${post.id}`}>
          View Post
        </Link>
        <PostAuthor userId={post.userId} />
        <PostDate date={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

export default PostItem;
