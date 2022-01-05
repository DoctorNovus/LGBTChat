import NavBar from "../components/forum/nav-bar/nav-bar";
import EventsBar from "../components/forum/events-bar/events-bar";

export default function Forum() {
  return (
    <div>
      <NavBar />
      <div>
        <div className="flex flex-col mt-10 ml-10">
          <EventsBar />
        </div>
      </div>
    </div>
  );
}
