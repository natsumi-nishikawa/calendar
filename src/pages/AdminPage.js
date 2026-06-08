import "./AdminPage.css";

function AdminPage({ reservations, onBack, onLogout }) {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>予約一覧</h1>

        <div>

          <button className="admin-logout-button" onClick={onLogout}>
            ログオフ
          </button>
        </div>
      </div>

      <div className="admin-card">
        {reservations.length === 0 ? (
          <p className="empty-message">予約はまだありません。</p>
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
              {reservations.map((reservation, index) => (
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