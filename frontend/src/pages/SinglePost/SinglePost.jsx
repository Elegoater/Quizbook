import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import { getSinglePostByID } from "../../services/posts";
import Post from "../../components/Post/Post";
import { useParams } from "react-router";
import "./SinglePost.css";
import "../Background.css";

export const SinglePost = () => {
    let [post, setPost] = useState(null);
    const navigate = useNavigate();
    let { post_id } = useParams();
    // console.log(post_id);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");
    
        getSinglePostByID(token, post_id)
          .then((data) => {
            setPost(data.post);
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            if (err.message === "Post not found") {
              navigate("/posts"); // Redirect to FeedPage if post is not found
            } else {
              navigate("/login"); // Redirect to login for other errors
            }
          });
      }, [navigate, post_id]);
    
      const logOutHandler = () => {
        localStorage.removeItem("token");
        navigate("/");
      };
    
    return (
      <div className="home">
        <div className="backim"></div>
        <LoggedInHeader onLogout={logOutHandler} />
        <h2>Post</h2>
        <div className="feed" role="feed">
        {post ? <Post post={post} key={post._id} /> : <p>Loading post...</p>}
        </div>
      </div>
    )
};

