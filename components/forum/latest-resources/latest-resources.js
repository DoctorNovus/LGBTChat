import PostThread from "../post-thread/post-thread";

export default function LatestResources({ resources = [] }) {
  return (
    <div className="ml-auto mr-4 w-[20vw] h-fit">
      <p className="text-[20px] mb-4">Latest Resources</p>
      {resources.map((thread, index) => (
        <PostThread key={index} thread={thread} />
      ))}
    </div>
  );
}
