import "./AdminPage.css";

import { useState } from "react";

function AdminPage({
  reservations,
  onBack,
  onLogout,
}) {
  // 現在選択している表示
  const [filterType, setFilterType] = useState("future");

  const today = new Date();

  // 時刻を0:00にして日付だけで比較する
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // 予約データの日付をDate型に変換
  const getReservationDate = (reservation) => {
    const [month, day] = reservation.dateText
      .split("/")
      .map(Number);

    return new Date(
      today.getFullYear(),
      month - 1,
      day
    );
  };

  // 今日の日付
  const todayText =
    `${today.getMonth() + 1}/${today.getDate()}`;

  // =========================
  // 本日の予約
  // =========================
  const todayReservations = reservations.filter(
    (reservation) =>
      reservation.dateText === todayText
  );

  // =========================
  // 今週の月曜日と日曜日
  // =========================
  const startOfWeek = new Date(todayStart);

  const dayOfWeek = startOfWeek.getDay();

  const diffToMonday =
    dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  startOfWeek.setDate(
    startOfWeek.getDate() + diffToMonday
  );

  const endOfWeek = new Date(startOfWeek);

  endOfWeek.setDate(
    startOfWeek.getDate() + 6
  );

  // =========================
  // 今週の予約
  // =========================
  const weekReservations = reservations.filter(
    (reservation) => {
      const reservationDate =
        getReservationDate(reservation);

      return (
        reservationDate >= startOfWeek &&
        reservationDate <= endOfWeek
      );
    }
  );

  // =========================
  // 今後の予約
  // 今日も含む
  // =========================
  const futureReservations = reservations.filter(
    (reservation) => {
      const reservationDate =
        getReservationDate(reservation);

      return reservationDate >= todayStart;
    }
  );

  // =========================
  // 過去の予約
  // =========================
  const pastReservations = reservations.filter(
    (reservation) => {
      const reservationDate =
        getReservationDate(reservation);

      return reservationDate < todayStart;
    }
  );

  // =========================
  // 選択された予約を決める
  // =========================
  let displayedReservations = futureReservations;

  let listTitle = "今後の予約一覧";

  if (filterType === "today") {
    displayedReservations = todayReservations;
    listTitle = "本日の予約";
  }

  if (filterType === "week") {
    displayedReservations = weekReservations;
    listTitle = "今週の予約";
  }

  if (filterType === "future") {
    displayedReservations = futureReservations;
    listTitle = "今後の予約一覧";
  }

  if (filterType === "past") {
    displayedReservations = pastReservations;
    listTitle = "過去の予約";
  }

  // =========================
  // 日付・時間順に並べる
  // =========================
  const sortedReservations =
    [...displayedReservations].sort((a, b) => {
      const [aMonth, aDay] =
        a.dateText.split("/").map(Number);

      const [bMonth, bDay] =
        b.dateText.split("/").map(Number);

      const [aHour, aMinute] =
        a.time.split(":").map(Number);

      const [bHour, bMinute] =
        b.time.split(":").map(Number);

      const aDate = new Date(
        today.getFullYear(),
        aMonth - 1,
        aDay,
        aHour,
        aMinute
      );

      const bDate = new Date(
        today.getFullYear(),
        bMonth - 1,
        bDay,
        bHour,
        bMinute
      );

      // 過去の予約は新しいものから表示
      if (filterType === "past") {
        return bDate - aDate;
      }

      // それ以外は近い予約から表示
      return aDate - bDate;
    });

  return (
    <div className="admin-page">

      {/* =====================
          ヘッダー
      ===================== */}

      <div className="admin-header">

        <div>
          <p className="admin-small-title">
            ADMIN
          </p>

          <h1>予約管理</h1>
        </div>

        <button
          className="admin-logout-button"
          onClick={onLogout}
        >
          ログオフ
        </button>

      </div>


      {/* =====================
          予約件数
      ===================== */}

      <div className="admin-summary">

        <button
          className={`summary-card ${
            filterType === "today"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilterType("today")
          }
        >
          <span className="summary-title">
            本日の予約
          </span>

          <strong>
            {todayReservations.length}
          </strong>

          <span className="summary-unit">
            件
          </span>
        </button>


        <button
          className={`summary-card ${
            filterType === "week"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilterType("week")
          }
        >
          <span className="summary-title">
            今週の予約
          </span>

          <strong>
            {weekReservations.length}
          </strong>

          <span className="summary-unit">
            件
          </span>
        </button>


        <button
          className={`summary-card ${
            filterType === "future"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilterType("future")
          }
        >
          <span className="summary-title">
            今後の予約
          </span>

          <strong>
            {futureReservations.length}
          </strong>

          <span className="summary-unit">
            件
          </span>
        </button>


        <button
          className={`summary-card past-card ${
            filterType === "past"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilterType("past")
          }
        >
          <span className="summary-title">
            過去の予約
          </span>

          <strong>
            {pastReservations.length}
          </strong>

          <span className="summary-unit">
            件
          </span>
        </button>

      </div>


      {/* =====================
          予約一覧
      ===================== */}

      <div className="admin-list-header">

        <h2 className="admin-list-title">
          {listTitle}
        </h2>

        <span className="list-count">
          {sortedReservations.length}件
        </span>

      </div>


      <div className="admin-card">

        {sortedReservations.length === 0 ? (

          <p className="empty-message">
            該当する予約はありません。
          </p>

        ) : (

          <table className="admin-table">

            <thead>

              <tr>
                <th>予約日時</th>
                <th>氏名</th>
                <th>電話番号</th>
                <th>メールアドレス</th>
                <th>サービス</th>
                <th>担当者</th>
                <th>要望</th>
              </tr>

            </thead>

            <tbody>

              {sortedReservations.map(
                (reservation) => (

                  <tr
                    key={
                      reservation.id ??
                      `${reservation.dateText}-${reservation.time}-${reservation.email}`
                    }
                  >

                    <td className="reservation-date">
                      {reservation.dateText}
                      <br />
                      {reservation.time}
                    </td>

                    <td>
                      {reservation.name}
                    </td>

                    <td>
                      {reservation.phone}
                    </td>

                    <td>
                      {reservation.email}
                    </td>

                    <td>
                      {reservation.service}
                    </td>

                    <td>
                      {reservation.staff}
                    </td>

                    <td>
                      {reservation.request || "－"}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default AdminPage;