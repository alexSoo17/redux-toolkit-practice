import { useSelector } from "react-redux";
import { allUsers } from "../../users/userSlice";
const PostAuthor = ({ userId }) => {
  const users = useSelector(allUsers);
  const author = users.find((user) => user.id === Number(userId));
  return <span> By {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
