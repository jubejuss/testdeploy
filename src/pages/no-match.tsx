import { Link } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "404 - Page Not Found" },
    { name: "description", content: "The page you're looking for doesn't exist." },
  ];
};

export default function NoMatch() {
  return (
    <>
      <h2>404 — Not Found</h2>
      <p>There's nothing here.</p>
      <Link to="/">Go to Home</Link>
      <p><strong>Framework mode:</strong> Now with proper 404 meta tags! ✨</p>
    </>
  );
}