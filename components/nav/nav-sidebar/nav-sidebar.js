import NavItem from "../nav-item/nav-item";

import logo from "../../../public/logo.png";
import hotlines from "../../../public/hotlines.png";
import forum from "../../../public/forum.png";
import mail from "../../../public/mail.png";
import messages from "../../../public/messages.png";
import settings from "../../../public/settings.png";
import logout from "../../../public/logout.png";

export default function NavSidebar() {
    return (
        <div id="sidebar" className="h-screen w-20 flex">
            <aside className="flex flex-col items-center bg-magic-1 text-gray-700 shadow h-full">
                <ul className="flex flex-col">
                    <NavItem src={logo} href="/" logo />
                </ul>
                <ul className="flex flex-col h-full justify-center">
                    <NavItem src={hotlines} href="/hotlines" text="Hotlines" />
                    <NavItem src={forum} href="/forum" text="Forum" />
                    <NavItem src={mail} href="/mail" text="Mail" />
                    <NavItem src={messages} href="/messages" text="Messages" />
                    <NavItem src={settings} href="/settings" text="Settings" />
                </ul>
                <ul className="flex flex-col">
                    <NavItem src={logout} href="/logout" text="Logout" />
                </ul>
            </aside>
        </div>
    )
}