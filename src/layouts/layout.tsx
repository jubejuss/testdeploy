import { Outlet, NavLink } from "react-router";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  fontWeight: isActive ? "bold" : "normal",
  marginRight: "1rem",
});

export default function Layout() {
  return (
    <>
      <h1>React Router 7 • React 19 • Framework Mode</h1>
      <nav style={{ borderBottom: "solid 1px #ccc", paddingBottom: "1rem", marginBottom: "1rem" }}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/users" style={linkStyle}>Users</NavLink>
      </nav>
      <main style={{ padding: "1rem 0" }}>
        <Outlet />
      </main>
    </>
  );
}