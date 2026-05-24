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
    <div>
      <h1>予約カレンダー</h1>

      <button onClick={goPrevWeek}>前の週</button>
      <button onClick={goNextWeek}>次の週</button>

      <table border="1">
        <thead>
          <tr>
            <th>時間 / 日付</th>
            {weekDays.map((day) => (
              <th key={day.toISOString()}>
                {getDateText(day)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td>{time}</td>

              {weekDays.map((day) => {
                const status = getReservationStatus(day, time);

                return (
                  <td
                    key={`${day.toISOString()}-${time}`}
                    onClick={() => {
                      if (status === "×") {
                        return;
                      }

                      onSelectSlot(day, time);
                    }}
                    style={{
                      cursor: status === "×" ? "not-allowed" : "pointer",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    {status}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onLogout}>ログオフ</button>

    </div>
  );
}

export default CalendarPage;