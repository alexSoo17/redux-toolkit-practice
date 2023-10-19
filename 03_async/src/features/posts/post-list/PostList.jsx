import { useDispatch, useSelector } from "react-redux";
import {
  allPosts,
  fetchPosts,
  getPostsError,
  getPostsStatus,
} from "../postSlice";
import { useEffect, useState } from "react";
import PostItem from "../post-item/PostItem";

const PostList = () => {
  const posts = useSelector(allPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const [hasFetched, setHasFetched] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle" && !hasFetched) {
      setHasFetched(true);
      dispatch(fetchPosts());
    }
  }, [status, dispatch, hasFetched]);

  let renderContent;
  if (status === "loading") {
    renderContent = <p>Loading...</p>;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
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
