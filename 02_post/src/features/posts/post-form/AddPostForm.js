import { useState } from "react";
import { addPost } from "../postSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { allUsers } from "../../users/userSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(allUsers);
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => {
    setUserId(e.target.value);
  };

  const disabled = title.length === 0 || content.length === 0;

  const dispatch = useDispatch();

  const onSavePostClicked = () => {
    dispatch(addPost(title, content, userId));
    setTitle("");
    setContent("");
    setUserId("");
  };

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
          className={disabled ? "disabledButton" : "postButton"}
          type="button"
          onClick={onSavePostClicked}
          disabled={disabled}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
