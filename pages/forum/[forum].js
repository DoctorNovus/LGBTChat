import { useRouter } from "next/router";

export default function ForumSection() {
  const router = useRouter();
  const { forum } = router.query;

  return <p>{forum}</p>;
}
