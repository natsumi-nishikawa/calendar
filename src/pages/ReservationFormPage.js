function ReservationFormPage({
  selectedDate,
  selectedTime,
  onBack,
  onConfirm,
  formData,
  setFormData,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.service ||
      !formData.staff
    ) {
      alert("選択されていない項目、または未入力の項目があります");
      return;
    }

    onConfirm({
      date: selectedDate,
      dateText: `${selectedDate?.getMonth() + 1}/${selectedDate?.getDate()}`,
      time: selectedTime,
      ...formData,
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
          name="name"
          type="text"
          placeholder="氏名を入力"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <label>電話番号</label>
        <br />
        <input
          name="phone"
          type="tel"
          placeholder="電話番号を入力"
          value={formData.phone}
          onChange={handleChange}
        />

        <br /><br />

        <label>メールアドレス</label>
        <br />
        <input
          name="email"
          type="email"
          placeholder="メールアドレスを入力"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <label>サービス</label>
        <br />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
        >
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
        <select
          name="staff"
          value={formData.staff}
          onChange={handleChange}
        >
          <option value="">選択してください</option>
          <option value="田中">田中</option>
          <option value="鈴木">鈴木</option>
          <option value="担当者指定なし">担当者指定なし</option>
        </select>

        <br /><br />

        <label>要望</label>
        <br />
        <textarea
          name="request"
          placeholder="要望を入力"
          value={formData.request}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">確認画面へ</button>
        <button type="button" onClick={onBack}>
          戻る
        </button>
      </form>
    </div>
  );
}

export default ReservationFormPage;