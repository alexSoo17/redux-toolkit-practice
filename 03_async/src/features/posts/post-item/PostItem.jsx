import { useSelector } from "react-redux";
import ReactionButton from "../reaction-button/ReactionButton";
import { allUsers } from "../../users/userSlice";
import "./style.css";

const PostItem = ({ post }) => {
  const users = useSelector(allUsers);
  const author = users.find((user) => user.id === post.userId);

  return (
    <article key={post.id}>
      <h2>{post.title}</h2>
      <p>{`${post.body.substring(0, 100)}......`}</p>
      <ReactionButton post={post} />
      <p className="postInfo">
        {author ? <span>By {author.name}</span> : <span> Unknown author</span>}
        <span>{post.date}</span>
      </p>
    </article>
  );
};

export default PostItem;
