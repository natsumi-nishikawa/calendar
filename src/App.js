import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import ReservationFormPage from "./pages/ReservationFormPage";
import ConfirmPage from "./pages/ConfirmPage";

function App() {
  // 今表示している画面
  const [page, setPage] = useState("login");

  // 選択した日時
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservationData, setReservationData] = useState(null);

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

  const handleConfirmReservation = (data) => {
    setReservationData(data);
    setPage("confirm");
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
        <ReservationFormPage
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onBack={() => setPage("calendar")}
          onConfirm={handleConfirmReservation}
        />
      )}

      {/* 予約確認画面 */}
      {page === "confirm" && (
        <ConfirmPage
          reservationData={reservationData}
          onBack={() => setPage("reservation")}
          onSubmit={() => alert("予約を確定しました")}
        />
      )}
    </div>
  );
}

export default App;