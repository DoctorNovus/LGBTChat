import Image from "next/image";
import { useState } from "react";
import CreatePost from "../../components/forum/create-post/create-post";
import NavBar from "../../components/forum/nav-bar/nav-bar";
import ThreadPosts from "../../components/forum/thread-posts/thread-posts";

import avatar from "../../public/avatar.png";

function ForumSection({ data }) {
  const [selected, setSelected] = useState(null);

  if (!data) return <></>;
  return (
    <div className="w-full h-full bg-magic-0 text-text-0">
      <NavBar selected={selected + 1} setSelected={setSelected} indent={1} />
      <div className="flex flex-col">
        <div className="w-full flex flex-col mt-10 mx-10">
          <div className="flex flex-row w-full text-center items-center">
            <div className="flex flex-row text-center items-center">
              <div className="mr-4 rounded-xl invert-icon">
                <Image
                  src={data.icon ? data.icon : avatar}
                  alt={data.name}
                  height="60"
                  width="60"
                />
              </div>
              <p className="text-[30px]">{data.name}</p>
            </div>
            <div className="ml-auto">
              <button className="text-[30px] bg-bubble-0 p-2 text-text-0 rounded-lg">{data.isMember ? "Joined!" : "Join!"}</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-10 mx-10 w-[55vw]">
          <ThreadPosts forum={data.name} />
        </div>
        <div className="absolute flex flex-col">
          <CreatePost
            selected={selected}
            setSelected={setSelected}
            forum={data.name}
          />
        </div>
      </div>
    </div>
  );
}

ForumSection.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  const { forum } = query;

  if (!req || !req.headers) {
    setTimeout(() => window.location.reload(), 1000);
    return;
  }

  let res = await fetch(`http://${req.headers.host}/api/forum/${forum}`);
  res = await res.json();
  return { data: res };
};

export default ForumSection;
