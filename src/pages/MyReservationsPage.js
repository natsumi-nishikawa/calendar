function MyReservationsPage({
    reservations,
    onBack,
    onCancel,
  }) {
    return (
      <div>
        <h1>予約一覧</h1>
  
        {reservations.length === 0 ? (
          <p>予約はありません。</p>
        ) : (
          reservations.map((reservation, index) => (
            <div key={index}>
              <p>
                予約日時：
                {reservation.dateText} {reservation.time}
              </p>
  
              <p>サービス：{reservation.service}</p>
              <p>担当者：{reservation.staff}</p>
  
              <button onClick={() => onCancel(index)}>
                予約をキャンセル
              </button>
            </div>
          ))
        )}
  
        <button onClick={onBack}>
          カレンダーに戻る
        </button>
      </div>
    );
  }
  
  export default MyReservationsPage;