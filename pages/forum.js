import NavBar from "../components/forum/nav-bar/nav-bar";
import EventsBar from "../components/forum/events-bar/events-bar";
import StaffOnline from "../components/forum/staff-online/staff-online";

export default function Forum() {
  return (
    <div className="w-full">
      <NavBar />
      <div>
        <div className="flex flex-row mt-10 mx-10">
          <EventsBar />
          <StaffOnline staff={[{role: "Owner", name: "Hiro"}]}/>
        </div>
      </div>
    </div>
  );
}
