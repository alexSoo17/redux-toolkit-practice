import { useState } from "react";
import { createNewPost } from "../postSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { allUsers } from "../../users/userSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const navigate = useNavigate();

  const users = useSelector(allUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => {
    setUserId(e.target.value);
  };

  const canBeSaved =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const dispatch = useDispatch();

  const onSavePostClicked = () => {
    if (canBeSaved) {
      try {
        setAddRequestStatus("pending");

        dispatch(createNewPost({ title, content, user_id: userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");

        navigate("/");
      } catch (e) {
        console.log("Fail to add new post: ", e);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <button
          className={canBeSaved ? "postButton" : "disabledButton"}
          type="button"
          onClick={onSavePostClicked}
          disabled={!canBeSaved}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
