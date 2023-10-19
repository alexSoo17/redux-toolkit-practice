import "./App.css";
import AddPostForm from "./features/posts/post-form/AddPostForm";
import PostList from "./features/posts/post-list/PostList";

function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostList />
    </main>
  );
}

export default App;
