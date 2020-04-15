import React from "react";

function Card({ user }) {
  return (
    <div className="card">
      <img className="responsive-img" src={user.avatar_url} alt={user.name} />
      <div className="card-info">
        <h3 className="name">{user.name}</h3>
        <p className="username">{user.login}</p>
        <p>Location: {user.location || "null"}</p>
        <p>
          Profile: {user.login} <br />
          <a href={user.html_url}>{user.html_url}</a>
        </p>
        <p>Followers: {user.followers} </p>
        <p>Following: {user.following}</p>
        <p>Bio: {user.bio || "null"}</p>
      </div>
    </div>
  );
}

export default Card;
