import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactionButton from "../reaction-button/ReactionButton";
import PostAuthor from "../post-author/PostAuthor";
import PostDate from "../post-date/PostDate";
import { fetchPostById, getPostById, getPostItemStatus } from "../postSlice";
import { useEffect } from "react";
const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => getPostById(state, postId));
  const status = useSelector(getPostItemStatus);

  console.log(status);
  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, []);

  let renderContent;
  if (status !== "succeeded") {
    renderContent = (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  } else {
    renderContent = (
      <article key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p className="postInfo">
          <Link
            className="link"
            state={{ post: post }}
            to={`/post/${post.id}/edit`}
          >
            Edit Post
          </Link>
          <PostAuthor userId={post.user_id} />
          <PostDate date={post.updated_at} />
        </p>
        <ReactionButton post={post} />
      </article>
    );
  }
  return <section>{renderContent}</section>;
};

export default PostDetail;
