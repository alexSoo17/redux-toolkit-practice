import { useSelector } from "react-redux";
import { allPosts } from "../postSlice";
import "./style.css";
import { allUsers } from "../../users/userSlice";
import ReactionButton from "../reaction-button/ReactionButton";

const PostList = () => {
  const posts = useSelector(allPosts);
  const users = useSelector(allUsers);

  const renderedPosts = posts.map((post) => {
    const author = users.find((user) => user.id === post.userId);
    return (
      <article key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <ReactionButton post={post} />
        <p className="postInfo">
          {author ? (
            <span>By {author.name}</span>
          ) : (
            <span> Unknown author</span>
          )}
          <span>{post.date}</span>
        </p>
      </article>
    );
  });
  return (
    <>
      <h2>Posts here</h2>
      <section>{renderedPosts}</section>
    </>
  );
};

export default PostList;
