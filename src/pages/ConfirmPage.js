function ConfirmPage({ reservationData, onBack, onSubmit }) {
    return (
      <div>
        <h1>予約確認</h1>
  
        <p>予約日時：{reservationData.dateText} {reservationData.time}</p>
        <p>氏名：{reservationData.name}</p>
        <p>電話番号：{reservationData.phone}</p>
        <p>メールアドレス：{reservationData.email}</p>
        <p>サービス：{reservationData.service}</p>
        <p>担当者：{reservationData.staff}</p>
        <p>要望：{reservationData.request}</p>
  
        <button onClick={onSubmit}>予約決定</button>
        <button onClick={onBack}>戻る</button>
      </div>
    );
  }
  
  export default ConfirmPage;