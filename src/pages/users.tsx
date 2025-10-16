import { Link, Outlet, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

// Mock data
const USERS = [
  { id: "1", fullName: "Robin Wieruch" },
  { id: "2", fullName: "Sarah Finnley" },
  { id: "3", fullName: "Ada Lovelace" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return { users: USERS };
}

export default function Users() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <>
      <h2>Users</h2>
      <ul style={{ marginBottom: "1rem" }}>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>{user.fullName}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}