import PostThread from "../post-thread/post-thread";

function RecentThreads({ threads = [] }) {
  return (
    <div className="ml-auto mr-4 w-[20vw] h-fit">
      <p className="text-[20px] mb-4">Recent Threads</p>
      {threads.map((thread, index) => (
        <PostThread key={index} thread={thread} />
      ))}
      <hr className="bg-gray-200 h-[2px] border-none my-8"></hr>
    </div>
  );
}

RecentThreads.getInitialProps = async(ctx) => {
    const res = await fetch("/api/forum/recents");
    const json = await res.json();
    return { threads: json.threads };
}

export default RecentThreads;
