import { useSearchParams } from "react-router-dom";
import ArchitectureLearning from "./ArchitectureLearning";
import ArchitectureChat from "./ArchitectureChat";
import { useAuth } from "./context/AuthContext";
import "./LearningMode.css";

export default function LearningMode() {
  const [params, setParams] = useSearchParams();
  const lessons = params.get("view") === "lessons";
  const { user, loading } = useAuth();
  return <div className="architecture-learning">
    <nav className="learning-course-switch" aria-label="Architecture learning tools">
      <button aria-pressed={!lessons} onClick={() => setParams({})}>Ask the tutor</button>
      <button aria-pressed={lessons} onClick={() => setParams({ view: "lessons" })}>Exercises &amp; progress</button>
    </nav>
    {loading ? <p>Loading…</p> : lessons ? <ArchitectureLearning key={user?.uid || "guest"} ownerId={user?.uid || "guest"} /> : <ArchitectureChat key={user?.uid || "guest"} ownerId={user?.uid || "guest"} />}
  </div>;
}
