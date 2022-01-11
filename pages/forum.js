import NavBar from "../components/forum/nav-bar/nav-bar";
import EventsBar from "../components/forum/events-bar/events-bar";
import StaffOnline from "../components/forum/staff-online/staff-online";
import ForumPosts from "../components/forum/forum-posts/forum-posts";
import CreatePost from "../components/forum/create-post/create-post";
import { useState } from "react";
import RecentThreads from "../components/forum/recent-threads/recent-threads";
import LatestResources from "../components/forum/latest-resources/latest-resources";

function Forum({ posts }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full bg-magic-0 text-text-0">
      <NavBar selected={selected} setSelected={setSelected} />
      <div className="flex flex-row">
        <div className="flex flex-col mt-10 mx-10 w-[55vw]">
          <EventsBar />
          <ForumPosts posts={posts} />
        </div>
        <div className="flex flex-col mt-10 mx-auto">
          <StaffOnline staff={[{ role: "Owner", name: "Hiro" }]} />
          <RecentThreads />
          <LatestResources
            resources={[{ name: "This is a test resource", author: "Hiro" }]}
          />
        </div>
        <div className="absolute flex flex-col">
          <CreatePost selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </div>
  );
}

export default Forum;
