import { useDispatch, useSelector } from "react-redux";
import { getPostsStatus, updatePost } from "../postSlice";
import "./style.css";
import { useNavigate } from "react-router-dom";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(getPostsStatus);

  const handleReactionButtonClick = (post, name) => {
    dispatch(
      updatePost({
        id: post.id,
        title: post.title,
        content: post.content,
        user_id: post.user_id,
        reactions: {
          ...post.reactions,
          [name]: post.reactions[name] + 1,
        },
      })
    );
    if (status === "succeeded") {
      navigate(0);
    }
  };

  const reactButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        className="reactionButton"
        key={name}
        onClick={() => handleReactionButtonClick(post, name)}
      >
        {emoji} {post?.reactions[name]}
      </button>
    );
  });
  return <span>{reactButtons}</span>;
};

export default ReactionButton;
