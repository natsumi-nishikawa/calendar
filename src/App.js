import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import { useState } from "react";
import { signOut } from "firebase/auth";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import ReservationFormPage from "./pages/ReservationFormPage";
import ConfirmPage from "./pages/ConfirmPage";
import MyReservationsPage from "./pages/MyReservationsPage";
import { db, auth } from "./firebase/config";
import { addDoc, collection, getDocs, deleteDoc, doc, query, where, } from "firebase/firestore";

function App() {
  // 今表示している画面
  const [page, setPage] = useState("login");

  // 選択した日時
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservationData, setReservationData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [reservationSlots, setReservationSlots] = useState([]);
  const [loginUserId, setLoginUserId] = useState("");

  // 予約フォームの入力内容をApp.jsで保持する
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    staff: "",
    request: "",
  });

  const handleAdminLoginSuccess = async () => {
    const querySnapshot = await getDocs(
      collection(db, "reservations")
    );
  
    const reservationList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    setReservations(reservationList);
    setPage("admin");
  };

  // ログイン成功時
  const handleLoginSuccess = async (email, uid) => {
    setLoginUserEmail(email);
    setLoginUserId(uid);
  
    const q = query(
      collection(db, "reservations"),
      where("userId", "==", uid)
    );
  
    const querySnapshot = await getDocs(q);
  
    const reservationList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const slotSnapshot = await getDocs(
      collection(db, "reservationSlots")
    );
    
    const slotList = slotSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setReservationSlots(slotList);
     
    setReservations(reservationList);
    setPage("calendar");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setLoginUserEmail("");
    setLoginUserId("");
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
    const isSameStaffAlreadyBooked = reservationSlots.some(
      (slot) =>
        slot.dateText === reservationData.dateText &&
        slot.time === reservationData.time &&
        slot.staff === reservationData.staff
    );
  
    if (isSameStaffAlreadyBooked) {
      alert("この時間帯のこの担当者はすでに予約されています");
      return;
    }

    console.log("ログインユーザー:", loginUserEmail);
    console.log("予約データ:", reservationData);

    const docRef = await addDoc(collection(db, "reservations"), {
      ...reservationData,
      userEmail: loginUserEmail,
      userId: loginUserId,
    });

    const slotDocRef = await addDoc(collection(db, "reservationSlots"), {
      dateText: reservationData.dateText,
      time: reservationData.time,
      staff: reservationData.staff,
      userId: loginUserId,
      reservationId: docRef.id,
    });

    const q = query(
      collection(db, "reservations"),
      where("userId", "==", loginUserId)
    );
    
    const querySnapshot = await getDocs(q);
    
    const reservationList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    setReservations(reservationList);
  
    setReservationSlots([
      ...reservationSlots,
      {
        id: slotDocRef.id,
        dateText: reservationData.dateText,
        time: reservationData.time,
        staff: reservationData.staff,
        userId: loginUserId,
        reservationId: docRef.id,
      },
    ]);
  
    alert("予約を確定しました");
  
    setPage("calendar");
  };

  const handleCancelReservation = async (index) => {
    const userReservations = reservations.filter(
      (reservation) => reservation.userId === loginUserId
    );
  
    const targetReservation = userReservations[index];
  
    // reservationsから予約を削除
    await deleteDoc(
      doc(db, "reservations", targetReservation.id)
    );
  
    // 同じ予約に対応するreservationSlotsを探す
    const targetSlot = reservationSlots.find(
      (slot) => slot.reservationId === targetReservation.id
    );
  
    // reservationSlotsから予約枠を削除
    if (targetSlot) {
      await deleteDoc(
        doc(db, "reservationSlots", targetSlot.id)
      );
    }
  
    // 画面上の予約一覧からも削除
    setReservations(
      reservations.filter(
        (reservation) => reservation.id !== targetReservation.id
      )
    );
  
    // 画面上の予約枠からも削除
    setReservationSlots(
      reservationSlots.filter(
        (slot) => slot.reservationId !== targetReservation.id
      )
    );
  
    alert("予約をキャンセルしました");
  };

  console.log("現在のログインメール:", loginUserEmail);
  console.log("現在の予約一覧:", reservations);
  console.log("現在のログインUID:", loginUserId);

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
          onLogout={handleLogout}
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
          reservations={reservationSlots}
          onSelectSlot={handleSelectSlot}
          onLogout={handleLogout}
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
            (reservation) => reservation.userId === loginUserId
          )}
          onBack={() => setPage("calendar")}
          onCancel={handleCancelReservation}
        />
      )}
      
    </div>
  );
}

export default App;