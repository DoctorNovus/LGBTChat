import NavBar from "../components/forum/nav-bar/nav-bar";
import EventsBar from "../components/forum/events-bar/events-bar";
import StaffOnline from "../components/forum/staff-online/staff-online";
import ForumPosts from "../components/forum/forum-posts/forum-posts";

export default function Forum() {
  return (
    <div className="w-full bg-magic-0 text-text-0">
      <NavBar />
      <div className="flex flex-row">
        <div className="flex flex-col mt-10 mx-10 w-[55vw]">
          <EventsBar />
          <ForumPosts />
        </div>
        <div className="flex flex-col mt-10 mx-auto">
          <StaffOnline staff={[{ role: "Owner", name: "Hiro" }]} />
        </div>
      </div>
    </div>
  );
}
