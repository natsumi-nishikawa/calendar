import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  // 今表示している画面
  const [page, setPage] = useState("login");

  // 選択した日時
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  // ログイン成功時
  const handleLoginSuccess = () => {
    setPage("calendar");
  };

  // カレンダーの時間枠クリック時
  const handleSelectSlot = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);

    setPage("reservation");
  };

  return (
    <div>
      {/* ログイン画面 */}
      {page === "login" && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}

      {/* カレンダー画面 */}
      {page === "calendar" && (
        <CalendarPage onSelectSlot={handleSelectSlot} />
      )}

      {/* 予約フォーム画面 */}
      {page === "reservation" && (
        <div>
          <h1>予約フォーム</h1>

          <p>
            選択日時：
            {selectedDate?.getMonth() + 1}/
            {selectedDate?.getDate()}
            {" "}
            {selectedTime}
          </p>

          <input type="text" placeholder="名前" />
          <br />

          <input type="email" placeholder="メールアドレス" />
          <br />

          <button>予約する</button>

          <button onClick={() => setPage("calendar")}>
            戻る
          </button>
        </div>
      )}
    </div>
  );
}

export default App;