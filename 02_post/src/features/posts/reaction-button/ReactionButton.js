import { useDispatch } from "react-redux";
import { addReaction } from "../postSlice";
import "./style.css";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();
  const reactButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        className="reactionButton"
        key={name}
        onClick={() =>
          dispatch(addReaction({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <span>{reactButtons}</span>;
};

export default ReactionButton;
