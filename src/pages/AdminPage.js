function AdminPage({ reservations, onBack }) {
    return (
      <div>
        <h1>予約一覧</h1>
        <button onClick={onBack}>戻る</button>
      </div>
    );
  }
  
  export default AdminPage;