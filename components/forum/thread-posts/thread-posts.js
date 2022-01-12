import { useEffect, useState } from "react";
import ThreadPost from "../thread-post/thread-post";

function ThreadPosts({ forum }) {
  const [threads, setThreads] = useState([]);

  useEffect(async () => {
    const res = await fetch(`/api/forums/${forum}/threads`);
    const json = await res.json();
    if (!threads || threads.length == 0) setThreads(json);
  });

  return (
    <div>
      <p>Community Threads</p>
      <div>
        {threads.map((thread, index) => (
          <ThreadPost
            key={index}
            icon={thread.icon}
            title={thread.name}
            messageCount={thread.messageCount || 0}
          />
        ))}
      </div>
    </div>
  );
}

export default ThreadPosts;
