import "./ConfirmPage.css";
import salonImage from "../salon.jpg";

function ConfirmPage({ reservationData, onBack, onSubmit }) {
  return (
    <div className="confirm-page">
      <h1 className="confirm-title">ご予約内容</h1>

      <div className="confirm-content">
        <div className="shop-card">
          <h2>店舗名：〇〇</h2>
          <p>📞 00-0000-0000</p>
          <a href="/">日本 - Japan</a>

          <img
            src={salonImage}
            alt="店舗画像"
            className="shop-image"
          />
        </div>

        <div className="confirm-card">
          <p>予約日時：{reservationData.dateText} {reservationData.time}</p>
          <p>氏名：{reservationData.name}</p>
          <p>電話番号：{reservationData.phone}</p>
          <p>メールアドレス：{reservationData.email}</p>
          <p>サービス：{reservationData.service}</p>
          <p>担当者：{reservationData.staff}</p>
          <p>要望：{reservationData.request}</p>
        </div>
      </div>

      <div className="confirm-buttons">
        <button className="confirm-submit" onClick={onSubmit}>
          予約決定
        </button>
        <button className="confirm-back" onClick={onBack}>
          戻る
        </button>
      </div>
    </div>
  );
}

export default ConfirmPage;