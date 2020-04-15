import React from "react";
import Card from "../Card/Card.js";

function Followers({ followers }) {
  return (
    <>
      {followers.map(follower => {
        return <Card key={follower.id} user={follower} />;
      })}
    </>
  );
}

export default Followers;
