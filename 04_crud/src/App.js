import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddPostForm from "./features/posts/post-form/AddPostForm";
import PostList from "./features/posts/post-list/PostList";
import Layout from "./components/Layout";
import PostDetail from "./features/posts/post-detail/PostDetail";
import PostEdit from "./features/posts/post-edit/PostEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<PostDetail />} />
          <Route path="edit/:postId" element={<PostEdit />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
