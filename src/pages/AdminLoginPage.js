import { useState } from "react";

function AdminLoginPage({ onAdminLoginSuccess, onBack }) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (adminId === "admin" && password === "1234") {
      onAdminLoginSuccess();
    } else {
      alert("管理者IDまたはパスワードが違います");
    }
  };

  return (
    <div>
      <h1>管理者ログイン</h1>

      <form onSubmit={handleAdminLogin}>
        <label>管理者ID</label>
        <br />
        <input
          type="text"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />

        <br /><br />

        <label>パスワード</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">ログイン</button>
        <button type="button" onClick={onBack}>
          戻る
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;