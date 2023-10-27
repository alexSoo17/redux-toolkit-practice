import { useSelector } from "react-redux";
import { getUserById } from "../../users/userSlice";
const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => getUserById(state, userId));
  return <span> By {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
