import ForumPost from "../forum-post/forum-post";

export default function ForumPosts({ posts = [{ title: "Test Forum", threadCount: 1, messageCount: 1 }] }){
    return (
        <div>
            <p>Community Forums</p>
            <div>
                {posts.map((post, index) => <ForumPost key={index} icon={post.icon} title={post.title} threadCount={post.threadCount} messageCount={post.messageCount} />)}
            </div>
        </div>
    )
}