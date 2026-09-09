import "./CalendarPage.css";

import { useState } from "react";

function CalendarPage({
  reservations,
  onSelectSlot,
  onLogout,
  onMyReservations,
}) {
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

  // 今日が含まれる週の「月曜日」を取得する
  const getMonday = (date) => {
    const newDate = new Date(date);

    // getDay()
    // 日=0、月=1、火=2、水=3、木=4、金=5、土=6
    const day = newDate.getDay();

    // 月曜日まで何日戻るか計算
    const diff = day === 0 ? -6 : 1 - day;

    newDate.setDate(newDate.getDate() + diff);

    return newDate;
  };

  // 最初に表示する日は、その週の月曜日
  const [weekStart, setWeekStart] = useState(() =>
    getMonday(new Date())
  );

  // 月曜日から7日分を作る
  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);

      date.setDate(weekStart.getDate() + index);

      return date;
    });
  };

  // 9/7 のような形にする
  const getDateText = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 曜日
  const weekLabels = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
  ];

  // 予約状況を○△×で判定
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

  // 前の週
  const goPrevWeek = () => {
    const newDate = new Date(weekStart);

    newDate.setDate(weekStart.getDate() - 7);

    setWeekStart(newDate);
  };

  // 次の週
  const goNextWeek = () => {
    const newDate = new Date(weekStart);

    newDate.setDate(weekStart.getDate() + 7);

    setWeekStart(newDate);
  };

  // 曜日に合わせたCSSクラスを決める
  const getDayClass = (day) => {
    if (day.getDay() === 6) {
      return "saturday";
    }

    if (day.getDay() === 0) {
      return "sunday";
    }

    return "";
  };

  return (
    <div className="calendar-page">

      <div className="calendar-title">
        時間予約
      </div>

      <p className="calendar-description">
        希望予約日時を選択してください
      </p>

      <div className="calendar-buttons">
        <button onClick={goPrevWeek}>
          前の週
        </button>

        <button onClick={goNextWeek}>
          次の週
        </button>
      </div>

      <table className="calendar-table">

        <thead>
          <tr>

            <th>
              時間 / 日付
            </th>

            {weekDays.map((day) => (
              <th
                key={day.toISOString()}
                className={getDayClass(day)}
              >
                <div>
                  {getDateText(day)}
                </div>

                <div>
                  {weekLabels[day.getDay()]}
                </div>
              </th>
            ))}

          </tr>
        </thead>

        <tbody>

          {times.map((time) => (

            <tr key={time}>

              <td className="time-cell">
                {time}
              </td>

              {weekDays.map((day) => {

                const status =
                  getReservationStatus(day, time);

                return (

                  <td
                    key={`${day.toISOString()}-${time}`}

                    onClick={() => {

                      if (status === "×") {
                        return;
                      }

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

        <button onClick={goPrevWeek}>
          前の週
        </button>

        <button onClick={goNextWeek}>
          次の週
        </button>

      </div>

      <div className="calendar-legend">

        <span className="legend-ok">
          ○：予約可能時間です。
        </span>

        <span className="legend-triangle">
          △：残り枠わずかです。
        </span>

        <span className="legend-ng">
          ×：予約済みです。
        </span>

      </div>

      <div className="calendar-footer">

        <button
          className="my-reservations-button"
          onClick={onMyReservations}
        >
          自分の予約を見る
        </button>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          ログオフ
        </button>

      </div>

    </div>
  );
}

export default CalendarPage;