import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const lessons = new URLSearchParams(location.search).get("view") === "lessons";
  const { user, logout, setShowSignIn } = useAuth();
  return <aside className="sb architecture-sidebar" aria-label="Main navigation">
    <div className="sb-top"><NavLink to="/" className="sb-brand"><span className="sb-brand-mark">△</span><span className="sb-brand-name">Architecture Tutor</span></NavLink></div>
    <div className="sb-shell">
      <div className="sb-group-label">Workspace</div>
      <nav className="sb-nav">
        <NavLink to="/studio" className={({ isActive }) => `sb-link${isActive ? " is-active" : ""}`}>Studio Brainstorm</NavLink>
      </nav>
      <div className="sb-group-label sb-group-label--gap">Study</div>
      <nav className="sb-nav" aria-label="Study tools">
        <NavLink to="/learning" className={({ isActive }) => `sb-link${isActive && !lessons ? " is-active" : ""}`}>Learning Mode</NavLink>
        <NavLink to="/learning?view=lessons" className={`sb-link${location.pathname === "/learning" && lessons ? " is-active" : ""}`}>Exercises &amp; progress</NavLink>
      </nav>
      <p className="sb-empty">Studio projects and learning notes stay in this browser.</p>
    </div>
    <div className="sb-footer">
      <NavLink to="/profile" className="sb-link">Profile &amp; settings</NavLink>
      {user ? <button className="sb-signin" onClick={() => void logout()}>Sign out</button> : <button className="sb-signin" onClick={() => setShowSignIn(true)}>Sign in</button>}
    </div>
  </aside>;
}
