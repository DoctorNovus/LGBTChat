import NavItem from "../../nav/nav-item/nav-item";
import NavSearch from "../../nav/nav-search/nav-search";
import UserAvatar from "../user-avatar/user-avatar";

import slider from "../../../public/slider.png";
import add from "../../../public/add.png";

export default function NavSidebar() {
    return (
        <div className="h-20 w-[63rem] flex bg-gray-200">
            <section className="flex flex-row items-center bg-white text-gray-700 w-full">
                <div className="flex flex-row items-center">
                    <NavItem src={slider} href="#" text="Show/Hide" customClickEvent={HideSideBar} />
                    <NavSearch /> 
                </div>
                <div className="flex flex-row items-center w-full justify-end mr-4">
                    <NavItem src={add} href="#" text="New Post" reverse />
                    <UserAvatar />
                </div>
            </section>
        </div>
    )
}

export function HideSideBar(){
    document.querySelector("#sidebar").classList.toggle("hidden");
}