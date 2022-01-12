import { useEffect, useState } from "react";
import ForumPost from "../forum-post/forum-post";

function ForumPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const res = await fetch("/api/forums");
    const json = await res.json();
    if (!posts || posts.length == 0) setPosts(json);
  });

  return (
    <div>
      <p>Community Forums</p>
      <div>
        {posts.map((post, index) => (
          <ForumPost
            key={index}
            icon={post.icon}
            title={post.title}
            threadCount={post.threadCount}
            messageCount={post.messageCount}
          />
        ))}
      </div>
    </div>
  );
}

export default ForumPosts;
