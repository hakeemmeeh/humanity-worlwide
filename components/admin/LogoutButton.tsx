"use client";

export function LogoutButton() {
  async function logout() {
    await fetch("/api/admin-login", { method: "DELETE" });
    window.location.assign("/admin-login");
  }
  return (
    <button onClick={logout} className="text-sm font-medium text-ink/60 hover:text-navy hover:underline">
      Sign out
    </button>
  );
}
