import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthProvider"; // your auth context
import "./CommentComponent.css";

const CommentComponent = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { user, token } = useContext(AuthContext); // assume you store token in context

  // Fetch comments when component loads
useEffect(() => {
  if (!newsId) return; // don’t fetch without id
  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/comments/${newsId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  fetchComments();
}, [newsId, token]);

  // Submit new comment
// Submit new comment
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!text.trim()) return;

  const token = localStorage.getItem("userToken"); // ✅ correct key
  if (!token) {
    alert("You must be logged in to comment.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:8080/api/comments/${newsId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // ✅ include Bearer
      },
      body: JSON.stringify({ text })
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setText("");
    } else {
      const errorText = await res.text();
      console.error("Failed to post comment:", errorText);
    }
  } catch (err) {
    console.error("Error posting comment:", err);
  }
};


  return (
    <div className="comment-container">
      <h3>Comments</h3>

      {/* List Comments */}
      <ul className="comment-list">
        {comments.length > 0 ? (
          comments.map((c) => (
            <li key={c.id}>
  <strong>{c.username}:</strong> {c.text}
</li>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </ul>

      {/* Add Comment (only if logged in) */}
      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Post</button>
        </form>
      ) : (
        <p>You must be logged in to comment.</p>
      )}
    </div>
  );
};

export default CommentComponent;
