import { useDispatch, useSelector } from "react-redux";
import {
  allPosts,
  fetchPosts,
  getPostsError,
  getPostsStatus,
} from "../postSlice";
import PostItem from "../post-item/PostItem";
import { useEffect } from "react";

const PostList = () => {
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const posts = useSelector(allPosts);

  let renderContent;
  if (status === "loading") {
    renderContent = <p>Loading...</p>;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    renderContent = orderedPosts.map((post) => (
      <PostItem key={post.id} post={post} />
    ));
  } else if (status === "failed") {
    renderContent = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts here</h2>
      {renderContent}
    </section>
  );
};

export default PostList;
