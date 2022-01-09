import NavBar from "../components/forum/nav-bar/nav-bar";
import EventsBar from "../components/forum/events-bar/events-bar";
import StaffOnline from "../components/forum/staff-online/staff-online";
import ForumPosts from "../components/forum/forum-posts/forum-posts";
import CreatePost from "../components/forum/create-post/create-post";
import { Component, useState } from "react";
import RecentThreads from "../components/forum/recent-threads/recent-threads";
import LatestResources from "../components/forum/latest-resources/latest-resources";

class Forum extends Component {
  state = {
    selected: null,
  };

  handleSelectChange = selected => {
    this.setState({ selected });
  }

  render() {
    return (
      <div className="w-full bg-magic-0 text-text-0">
        <NavBar selected={this.state.selected} setSelected={this.handleSelectChange} />
        <div className="flex flex-row">
          <div className="flex flex-col mt-10 mx-10 w-[55vw]">
            <EventsBar />
            <ForumPosts />
          </div>
          <div className="flex flex-col mt-10 mx-auto">
            <StaffOnline staff={[{ role: "Owner", name: "Hiro" }]} />
            <RecentThreads threads={[{ name: "This is a test thread to see length xD", author: "Hiro" }]} />
            <LatestResources resources={[{ name: "This is a test resource", author: "Hiro" }]} />
          </div>
          <div className="absolute flex flex-col">
            <CreatePost selected={this.state.selected} setSelected={this.handleSelectChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default Forum;
