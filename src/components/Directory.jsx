import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
function Directory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        // Initialize the totalPosts property for each user
        const usersWithTotalPosts = data.map((user) => ({ ...user, totalPosts: null }));
        setUsers(usersWithTotalPosts);

        // Fetch total posts for each user and update the state
        usersWithTotalPosts.forEach((user) => {
          fetchTotalPosts(user.id).then((totalPosts) => {
            // Update the user's totalPosts property in the state
            setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? { ...u, totalPosts } : u)));
          });
        });
      });
  }, []);

  // Function to fetch the total number of posts for a user
  const fetchTotalPosts = (userId) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => data.length); // Get the number of posts for the user
  };

  return (
    <>
      <h1>User Directory</h1>
      {users.map((user) => (
         <div className="card"  key={user.id}>
          <div className="left-side">
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </div>
          <div className="right-side">
            Total Posts: <span>{user.totalPosts !== null ? user.totalPosts : 'Loading...'}</span>
          </div>
        </div>
        
      ))}
    </>
  );
}

export default Directory;