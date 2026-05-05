import { useState } from "react";
import { auth } from "./firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("新規登録しました");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("ログインしました");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>{isRegister ? "新規登録" : "ログイン"}</h1>

      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isRegister ? "登録" : "ログイン"}
        </button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "ログイン画面へ" : "新規登録へ"}
      </button>
    </div>
  );
}

export default App;