import { useState } from "react";

function ReservationFormPage({ selectedDate, selectedTime, onBack, onConfirm }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [staff, setStaff] = useState("");
  const [request, setRequest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      date: selectedDate,
      time: selectedTime,
      name,
      phone,
      email,
      service,
      staff,
      request,
    });

    onConfirm({
      date: selectedDate,
      dateText: `${selectedDate?.getMonth() + 1}/${selectedDate?.getDate()}`,
      time: selectedTime,
      name,
      phone,
      email,
      service,
      staff,
      request,
    });
  };

  return (
    <div>
      <h1>予約フォーム</h1>

      <p>
        予約日時：
        {selectedDate?.getMonth() + 1}/{selectedDate?.getDate()} {selectedTime}
      </p>

      <form onSubmit={handleSubmit}>
        <label>氏名</label>
        <br />
        <input
          type="text"
          placeholder="氏名を入力"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <label>電話番号</label>
        <br />
        <input
          type="tel"
          placeholder="電話番号を入力"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

        <label>メールアドレス</label>
        <br />
        <input
          type="email"
          placeholder="メールアドレスを入力"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <label>サービス</label>
        <br />
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">選択してください</option>
          <option value="カット">カット</option>
          <option value="カラー">カラー</option>
          <option value="カット×カラー">カット×カラー</option>
          <option value="カット×カラー×トリートメント">
            カット×カラー×トリートメント
          </option>
          <option value="パーマ">パーマ</option>
          <option value="髪質改善">髪質改善</option>
        </select>

        <br /><br />

        <label>担当者</label>
        <br />
        <select value={staff} onChange={(e) => setStaff(e.target.value)}>
          <option value="">選択してください</option>
          <option value="田中">田中</option>
          <option value="鈴木">鈴木</option>
          <option value="鈴木">担当者指定なし</option>
        </select>

        <br /><br />

        <label>要望</label>
        <br />
        <textarea
          placeholder="要望を入力"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        />

        <br /><br />

        <button type="submit">予約する</button>
        <button type="button" onClick={onBack}>
          戻る
        </button>
      </form>
    </div>
  );
}

export default ReservationFormPage;