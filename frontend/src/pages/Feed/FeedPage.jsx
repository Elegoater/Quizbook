import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getPosts(token)
      .then((data) => {
        setPosts(data.posts);
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="home">
      <LoggedInHeader onLogout={logOutHandler} />
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post.ID} />
        ))}
      </div>
    </div>
  );
};
