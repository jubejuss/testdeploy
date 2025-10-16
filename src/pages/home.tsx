import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: `Tiitel` },
    { name: "description", content: `Piitel` },
  ];
};
export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <p>Welcome! Use the navigation above to explore the app.</p>
      <p><strong>Now using Framework Mode!</strong> ✨</p>
    </>
  );
}