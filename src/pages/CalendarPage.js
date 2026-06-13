import "./CalendarPage.css";
import { useState } from "react";

function CalendarPage({ reservations, onSelectSlot, onLogout }) {
  const times = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const [weekStart, setWeekStart] = useState(new Date());

  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      return date;
    });
  };

  const getDateText = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const weekLabels = ["日", "月", "火", "水", "木", "金", "土"];

  const getReservationStatus = (date, time) => {
    const dateText = getDateText(date);

    const sameSlotReservations = reservations.filter(
      (reservation) =>
        reservation.dateText === dateText &&
        reservation.time === time
    );

    if (sameSlotReservations.length === 0) {
      return "○";
    }

    if (sameSlotReservations.length < 3) {
      return "△";
    }

    return "×";
  };

  const weekDays = getWeekDays();

  const goPrevWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() - 7);
    setWeekStart(newDate);
  };

  const goNextWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() + 7);
    setWeekStart(newDate);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-title">時間予約</div>
  
      <p className="calendar-description">
        希望予約日時を選択してください
      </p>
  
      <div className="calendar-buttons">
        <button onClick={goPrevWeek}>前の週</button>
        <button onClick={goNextWeek}>次の週</button>
      </div>
  
      <table className="calendar-table">
        <thead>
          <tr>
            <th>時間 / 日付</th>
            {weekDays.map((day) => (
              <th key={day.toISOString()}>                
                <div>{getDateText(day)}</div>
                <div>{weekLabels[day.getDay()]}</div>
              </th>
            ))}
          </tr>
        </thead>
  
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="time-cell">{time}</td>
  
              {weekDays.map((day) => {
                const status = getReservationStatus(day, time);
  
                return (
                  <td
                    key={`${day.toISOString()}-${time}`}
                    onClick={() => {
                      if (status === "×") return;
                      onSelectSlot(day, time);
                    }}
                    className={`status-cell status-${status}`}
                  >
                    {status}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="calendar-buttons">
        <button onClick={goPrevWeek}>前の週</button>
        <button onClick={goNextWeek}>次の週</button>
      </div>

      <div className="calendar-legend">
        <span className="legend-ok">○：予約可能時間です。</span>
        <span className="legend-triangle">△：残り枠あり僅かです。</span>
        <span className="legend-ng">×：予約済みです。</span>
      </div>
  
      <button className="logout-button" onClick={onLogout}>
        ログオフ
      </button>
    </div>
  );
}

export default CalendarPage;