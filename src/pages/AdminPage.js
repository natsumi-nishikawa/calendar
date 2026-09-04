import "./AdminPage.css";

function AdminPage({ reservations, onBack, onLogout }) {
  const today = new Date();

  const todayText = `${today.getMonth() + 1}/${today.getDate()}`;

  const todayReservations = reservations.filter(
    (reservation) => reservation.dateText === todayText
  );

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const weekReservations = reservations.filter((reservation) => {
    const [month, day] = reservation.dateText.split("/").map(Number);

    const reservationDate = new Date(
      today.getFullYear(),
      month - 1,
      day
    );

    return (
      reservationDate >= startOfWeek &&
      reservationDate <= endOfWeek
    );
  });

  const sortedReservations = [...reservations].sort((a, b) => {
    const [aMonth, aDay] = a.dateText.split("/").map(Number);
    const [bMonth, bDay] = b.dateText.split("/").map(Number);

    const [aHour, aMinute] = a.time.split(":").map(Number);
    const [bHour, bMinute] = b.time.split(":").map(Number);

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

    return aDate - bDate;
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>予約管理</h1>

        <button
          className="admin-logout-button"
          onClick={onLogout}
        >
          ログオフ
        </button>
      </div>

      <div className="admin-summary">
        <div className="summary-card">
          本日の予約：{todayReservations.length}件
        </div>

        <div className="summary-card">
          今週の予約：{weekReservations.length}件
        </div>
      </div>

      <h2 className="admin-list-title">予約一覧</h2>

      <div className="admin-card">
        {reservations.length === 0 ? (
          <p className="empty-message">
            予約はまだありません。
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
              {sortedReservations.map((reservation, index) => (
                <tr key={index}>
                  <td>
                    {reservation.dateText} {reservation.time}
                  </td>
                  <td>{reservation.name}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.service}</td>
                  <td>{reservation.staff}</td>
                  <td>{reservation.request}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminPage;