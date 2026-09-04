import "./MyReservationsPage.css";

function MyReservationsPage({
  reservations,
  onBack,
  onCancel,
}) {
  return (
    <div className="reservation-list-page">
      <div className="reservation-list-card">
        <h1>予約一覧</h1>

        {reservations.length === 0 ? (
          <p className="no-reservations">予約はありません。</p>
        ) : (
          reservations.map((reservation, index) => (
            <div className="reservation-item" key={index}>
              <p>
                <strong>予約日時：</strong>
                {reservation.dateText} {reservation.time}
              </p>

              <p>
                <strong>サービス：</strong>
                {reservation.service}
              </p>

              <p>
                <strong>担当者：</strong>
                {reservation.staff}
              </p>

              <button
                className="cancel-button"
                onClick={() => onCancel(index)}
              >
                予約をキャンセル
              </button>
            </div>
          ))
        )}

        <button className="back-button" onClick={onBack}>
          カレンダーに戻る
        </button>
      </div>
    </div>
  );
}

export default MyReservationsPage;