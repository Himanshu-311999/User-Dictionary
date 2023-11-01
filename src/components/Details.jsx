import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountryClock from './CountryClock';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user data for the given id
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));

    // Fetch user's posts
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [id]);

  if (user) {
    return (
      <div>
        <button onClick={() => navigate("/")}>Back</button>
        <h1>{user.name}'s Profile</h1>
        <div><CountryClock timeZone="America/Argentina/Salta" /></div>
        <div>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Catchphrase: {user.company?.catchPhrase}</p>
          {/* Add other user details */}
        </div>
        <div>
          <h2>Posts</h2>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return(<div>Loading...</div>)
}

export default Details;
