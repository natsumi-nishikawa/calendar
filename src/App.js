import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import ReservationFormPage from "./pages/ReservationFormPage";
import ConfirmPage from "./pages/ConfirmPage";
import MyReservationsPage from "./pages/MyReservationsPage";
import { db, auth } from "./firebase/config";
import { addDoc, collection, getDocs, deleteDoc, doc, } from "firebase/firestore";

function App() {
  // 今表示している画面
  const [page, setPage] = useState("login");

  // 選択した日時
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservationData, setReservationData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loginUserEmail, setLoginUserEmail] = useState("");

  useEffect(() => {
    const loadReservations = async () => {
      const querySnapshot = await getDocs(collection(db, "reservations"));
  
      const reservationList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setReservations(reservationList);
    };
  
    loadReservations();
  }, []);

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
  const handleLoginSuccess = (email) => {
    setLoginUserEmail(email);
    setPage("calendar");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setLoginUserEmail("");
    setPage("login");
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

  const handleSubmitReservation = async () => {
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

    console.log("ログインユーザー:", loginUserEmail);
    console.log("予約データ:", reservationData);

    await addDoc(collection(db, "reservations"), {
      ...reservationData,
      userEmail: loginUserEmail,
    });
  
    setReservations([
      ...reservations,
      {
        ...reservationData,
        userEmail: loginUserEmail,
      },
    ]);
  
    alert("予約を確定しました");
  
    setPage("calendar");
  };

  const handleCancelReservation = async (index) => {
    const userReservations = reservations.filter(
      (reservation) => reservation.userEmail === loginUserEmail
    );
  
    const targetReservation = userReservations[index];

    await deleteDoc(doc(db, "reservations", targetReservation.id));
  
    setReservations(
      reservations.filter(
        (reservation) => reservation !== targetReservation
      )
    );
  
    alert("予約をキャンセルしました");
  };

  console.log("現在のログインメール:", loginUserEmail);
  console.log("現在の予約一覧:", reservations);

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
          onLogout={() => setPage("login")}
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
          onMyReservations={() => setPage("myReservations")}
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

      {page === "myReservations" && (
        <MyReservationsPage
          reservations={reservations.filter(
            (reservation) => reservation.userEmail === loginUserEmail
          )}
          onBack={() => setPage("calendar")}
          onCancel={handleCancelReservation}
        />
      )}
      
    </div>
  );
}

export default App;