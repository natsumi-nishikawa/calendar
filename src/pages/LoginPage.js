import { useState } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./LoginPage.css";

function LoginPage({ onLoginSuccess, onAdminLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("新規登録しました");
        onLoginSuccess(email);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("ログインしました");
        onLoginSuccess(email);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("このメールアドレスはすでに登録されています。");
      } else if (error.code === "auth/invalid-email") {
        alert("正しいメールアドレスを入力してください。");
      } else if (error.code === "auth/weak-password") {
        alert("パスワードは6文字以上で入力してください。");
      } else if (error.code === "auth/invalid-credential") {
        alert("メールアドレスまたはパスワードが正しくありません。");
      } else if (error.code === "auth/too-many-requests") {
        alert("ログイン試行回数が多すぎます。しばらくしてからもう一度お試しください。");
      } else if (error.code === "auth/network-request-failed") {
        alert("通信に失敗しました。インターネット接続を確認してください。");
      } else {
        alert("ログインまたは新規登録に失敗しました。");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{isRegister ? "新規登録" : "ログイン"}</h1>

        <form onSubmit={handleAuth}>
          <label>メールアドレス</label>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="main-button" type="submit">
            {isRegister ? "登録" : "ログイン"}
          </button>
        </form>

        <p>
          {isRegister ? "ログイン画面は" : "新規登録は"}{" "}
          <button
            className="link-button"
            type="button"
            onClick={() => setIsRegister(!isRegister)}
          >
            こちら
          </button>
          から。
        </p>

        <button className="admin-button" type="button" onClick={onAdminLogin}>
          管理者ログインへ
        </button>
      </div>
    </div>
  );
}

export default LoginPage;