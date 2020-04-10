import React, { Component } from "react";
import axios from "axios";
import Profile from "./Components/Profile/Profile.js";
import Followers from "./Components/Followers/Followers.js";
import "./App.css";

function getFollowers(followers_url) {
  return axios
    .get(followers_url)
    .then(res => {
      return res.data.map(follower => {
        return follower.url;
      });
    })
    .then(followers => {
      return followers.map(followerlink => {
        return axios.get(`https://cors-anywhere.herokuapp.com/${followerlink}`);
      });
    })
    .catch(err => {
      throw new Error(err);
    });
}

class App extends Component {
  state = {
    profile: {},
    followers: []
  };

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.github.com/users/rjsmith25"
      )
      .then(res => {
        this.setState({
          profile: res.data
        });
        return getFollowers(
          `https://cors-anywhere.herokuapp.com/${res.data.followers_url}`
        );
      })
      .then(followers => {
        return Promise.all(followers);
      })
      .then(followersData => {
        followersData = followersData.map(res => {
          return res.data;
        });
        this.setState({
          followers: followersData
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Github User Cards</h1>
          <div className="card-container">
            <Profile user={this.state.profile} />
            <Followers followers={this.state.followers} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
