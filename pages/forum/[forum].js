import Image from "next/image";
import CreatePost from "../../components/forum/create-post/create-post";
import NavBar from "../../components/forum/nav-bar/nav-bar";

import avatar from "../../public/avatar.png";

function ForumSection({ selected, setSelected, data }) {
  return (
    <div className="w-full h-full bg-magic-0 text-text-0">
      <NavBar selected={selected + 1} setSelected={setSelected} indent={1} />
      <div className="flex flex-col mt-10 mx-10">
        <div className="flex flex-row w-full text-center items-center">
          <div className="mr-4 rounded-xl">
            <Image
              src={data.icon ? data.icon : avatar}
              alt={data.name}
              height="60"
              width="60"
            />
          </div>
          <p className="text-[30px]">{data.name}</p>
        </div>
      </div>
      <div className="absolute flex flex-col">
        <CreatePost selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
}

ForumSection.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  const { forum } = query;

  let res = await fetch(`http://${req.headers.host}/api/forum/${forum}`);
  res = await res.json();
  return { data: res };
};

export default ForumSection;
