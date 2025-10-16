import { useParams, Link } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `User ${params.userId}` },
    { name: "description", content: `Profile page for user ${params.userId}` },
  ];
};

export default function User() {
  const { userId } = useParams();

  return (
    <>
      <h3>User: {userId}</h3>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <Link to="/users">Back to Users</Link>
      </div>
      <p>This nested route is mounted under /users and matches /users/{userId}.</p>
      <p><strong>Framework mode:</strong> Enhanced with meta tags! ✨</p>
    </>
  );
}