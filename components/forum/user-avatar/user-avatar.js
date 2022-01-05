import Image from "next/image";

import avatar from "../../../public/avatar.png";

export default function UserAvatar({ user }){
    if(user)
        return <div></div>;
    else
        return <div className="w-9 align-center flex"><Image src={avatar} /></div>
}