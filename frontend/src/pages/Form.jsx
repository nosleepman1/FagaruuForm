import UserQuestionnaire from "../components/users/UserQuestionnaire";

export default function FormPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "24px 16px" }}>
      <UserQuestionnaire />
    </main>
  );
}
