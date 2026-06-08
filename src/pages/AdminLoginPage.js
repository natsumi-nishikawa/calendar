import { useState } from "react";
import "./AdminLoginPage.css";

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
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>管理者ログイン</h1>

        <form onSubmit={handleAdminLogin}>
          <label>管理者ID</label>
          <input
            type="text"
            placeholder="管理者ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />

          <label>パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="admin-login-main-button" type="submit">
            ログイン
          </button>

          <button className="admin-login-back-button" type="button" onClick={onBack}>
            戻る
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;