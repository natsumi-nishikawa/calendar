import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
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
  const [reservations, setReservations] = useState([]);

  // 予約フォームの入力内容をApp.jsで保持する
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    staff: "",
    request: "",
  });

  const handleAdminLoginSuccess = () => {
    setPage("admin");
  };

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

  const handleSubmitReservation = () => {
    const isSameStaffAlreadyBooked = reservations.some(
      (reservation) =>
        reservation.dateText === reservationData.dateText &&
        reservation.time === reservationData.time &&
        reservation.staff === reservationData.staff
    );
  
    if (isSameStaffAlreadyBooked) {
      alert("この時間帯のこの担当者はすでに予約されています");
      return;
    }
  
    setReservations([...reservations, reservationData]);
  
    alert("予約を確定しました");
  
    setPage("calendar");
  };

  return (
    <div>
      {page === "adminLogin" && (
        <AdminLoginPage
          onAdminLoginSuccess={handleAdminLoginSuccess}
          onBack={() => setPage("login")}
        />
      )}

      {page === "admin" && (
        <AdminPage
          reservations={reservations}
          onBack={() => setPage("calendar")}
        />
      )}

      {/* ログイン画面 */}
      {page === "login" && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onAdminLogin={() => setPage("adminLogin")}
        />
      )}

      {/* カレンダー画面 */}
      {page === "calendar" && (
        <CalendarPage
          reservations={reservations}
          onSelectSlot={handleSelectSlot}
          onLogout={() => setPage("login")}
        />
      )}

      {/* 予約フォーム画面 */}
      {page === "reservation" && (
        <ReservationFormPage
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          formData={formData}
          setFormData={setFormData}
          onBack={() => setPage("calendar")}
          onConfirm={handleConfirmReservation}
        />
      )}

      {/* 予約確認画面 */}
      {page === "confirm" && (
        <ConfirmPage
          reservationData={reservationData}
          onBack={() => setPage("reservation")}
          onSubmit={handleSubmitReservation}
        />
      )}
    </div>
  );
}

export default App;