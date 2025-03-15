"use client";

import { useEffect, useRef, useState } from "react";

import importedStyles from "./Calendar.module.css";

const MONTHS = { en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], sv: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"] };

export default function Calendar(props) {
  const bookings = props.bookings || {};
  const country = props.country || "US";
  const endDate = props.endDate;
  const isCentered = props.isCentered;
  const language = props.language || "en";
  const setEndDate = props.setEndDate;
  const setStartDate = props.setStartDate;
  const startDate = props.startDate;
  const styles = props.styles || importedStyles;

  const calendarRef = useRef(null);
  const intervalRef = useRef(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [day, setDay] = useState(null);
  const [days, setDays] = useState([]);
  const [halfHeight, setHalfHeight] = useState(0);
  const [hour, setHour] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  function isBookable(day, hour) {
    if (!startDate) {
      return false;
    }

    const currentDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour, 59, 59, 999);

    for (const [key, value] of Object.entries(bookings)) {
      const keyComponents = key.split("-");

      const year = Number.parseInt(keyComponents[0]);
      const month = Number.parseInt(keyComponents[1]);
      const date = Number.parseInt(keyComponents[2]);

      for (let i = 0; i < 24; i++) {
        if (value[i] !== undefined) {
          const bookedDate = new Date(year, month - 1, date, i, 59, 59);

          if (bookedDate >= startDate && bookedDate <= currentDate) {
            return false;
          }
        }
      }
    }

    return true;
  }

  function isBooked(day, hour = null) {
    const year = day.date.getFullYear();
    const month = (day.date.getMonth() + 1 < 10 ? "0" : "") + (day.date.getMonth() + 1);
    const date = (day.date.getDate() < 10 ? "0" : "") + day.date.getDate();
    const key = year + "-" + month + "-" + date;
    const booking = bookings[key];

    return booking && ((hour !== null && booking[hour] === true) || (hour === null && booking.isBooked));
  }

  function isFullyBooked(day) {
    const year = day.date.getFullYear();
    const month = (day.date.getMonth() + 1 < 10 ? "0" : "") + (day.date.getMonth() + 1);
    const date = (day.date.getDate() < 10 ? "0" : "") + day.date.getDate();
    const key = year + "-" + month + "-" + date;
    const booking = bookings[key];

    return booking && booking.isFullyBooked;
  }

  function onClickDay(e, newDay) {
    if (day && newDay && day.date && newDay.date && day.date.getFullYear() === newDay.date.getFullYear() && day.date.getMonth() === newDay.date.getMonth() && day.date.getDate() === newDay.date.getDate()) {
      setDay(null);
    } else {
      setDay(newDay);
    }
  }

  function onClickNext(e) {
    setMonthIndex(monthIndex >= 11 ? 0 : monthIndex + 1);
    setYear(monthIndex >= 11 ? year + 1 : year);
  }

  function onClickPrevious(e) {
    setMonthIndex(monthIndex <= 0 ? 11 : monthIndex - 1);
    setYear(monthIndex <= 0 ? year - 1 : year);
  }

  function onClickReset(e) {
    setStartDate(null);
    setEndDate(null);
    setHour(null);
  }

  function onClickSelectFrom(e) {
    setStartDate(new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour, 0, 0, 0));
    setEndDate(null);
    setHour(null);
  }

  function onClickSelectTo(e) {
    setEndDate(new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour, 59, 59, 999));
    setHour(null);
  }

  function onClickToggleCalendar(e) {
    setIsCalendarVisible(!isCalendarVisible);
  }

  function updateDays() {
    const newDays = [];

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(year, monthIndex, i + 1);
      const key = date.toISOString();
      const number = i + 1;

      newDays.push({ date, key, number });
    }

    const firstDay = newDays[0].date.getDay();

    if (firstDay === 0) {
      for (let i = 0; i < 6; i++) {
        newDays.unshift({ date: null, key: "previous-" + i, number: "" });
      }
    } else if (firstDay > 1) {
      for (let i = firstDay - 1; i > 0; i--) {
        newDays.unshift({ date: null, key: "previous-" + i, number: "" });
      }
    }

    const numberOfDays = newDays.length;

    if (numberOfDays % 7 !== 0) {
      for (let i = 0; i < 7 - (numberOfDays % 7); i++) {
        newDays.push({ date: null, key: "next-" + i, number: "" });
      }
    }

    setDays(newDays);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isCalendarVisible && calendarRef.current) {
      setHalfHeight(calendarRef.current.offsetHeight / 2);
    }
  }, [endDate, isCalendarVisible, isCentered, day, startDate]);

  useEffect(() => {
    updateDays();
  }, [monthIndex]);

  return (
    <div className={styles.calendar_container}>
      <button className={styles.button} onClick={onClickToggleCalendar}>
        {isCalendarVisible ? (language === "sv" ? "Dölj Kalender" : "Hide Calendar") : language === "sv" ? "Visa Kalender" : "Show Calendar"}
      </button>
      {isCalendarVisible && (
        <div className={styles.calendar} ref={calendarRef} style={isCentered ? { position: "fixed", right: "calc(50% - 150px)", top: `calc(50% - ${halfHeight}px)` } : { position: "absolute", right: "-75px", top: "100%" }}>
          <div className={styles.bar}>
            <div className={styles.month_and_year}>
              <button className={styles.previous} onClick={onClickPrevious}>
                <span className="fa fa-chevron-left"></span>
              </button>
              <span className={styles.month}>{language === "sv" ? MONTHS.sv[monthIndex] : MONTHS.en[monthIndex]}</span>
              <span className={styles.year}>{year}</span>
              <button className={styles.next} onClick={onClickNext}>
                <span className="fa fa-chevron-right"></span>
              </button>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.close_container}>
              <button className={styles.close} onClick={onClickToggleCalendar}>
                <span className="fa fa-times-circle"></span>
              </button>
            </div>
          </div>
          <div className={styles.day_container}>
            <div className={styles.day + " " + styles.day_label}>{language === "sv" ? "Mån" : "Mon"}</div>
            <div className={styles.day + " " + styles.day_label}>{language === "sv" ? "Tis" : "Tue"}</div>
            <div className={styles.day + " " + styles.day_label}>{language === "sv" ? "Ons" : "Wed"}</div>
            <div className={styles.day + " " + styles.day_label}>{language === "sv" ? "Tor" : "Thu"}</div>
            <div className={styles.day + " " + styles.day_label}>{language === "sv" ? "Fre" : "Fri"}</div>
            <div className={styles.day + " " + styles.day_label}>{language === "sv" ? "Lör" : "Sat"}</div>
            <div className={styles.day + " " + styles.day_label + " " + styles.day_label_sunday}>{language === "sv" ? "Sön" : "Sun"}</div>
            {days.map((currentDay) => (
              <div className={styles.day + (currentDay.date !== null && currentDay.date.getFullYear() === currentDate.getFullYear() && currentDay.date.getMonth() === currentDate.getMonth() && currentDay.date.getDate() === currentDate.getDate() ? " " + styles.day_current : "") + (currentDay.date !== null && day && currentDay.date.getFullYear() === day.date.getFullYear() && currentDay.date.getMonth() === day.date.getMonth() && currentDay.date.getDate() === day.date.getDate() ? " " + styles.day_selected : "") + (currentDay.date === null ? " " + styles.day_unavailable : "")} key={currentDay.key} onClick={currentDay.date !== null ? (e) => onClickDay(e, currentDay) : undefined}>
                {currentDay.number}
                <div className={styles.day_tags}>
                  {currentDay.date !== null && isBooked(currentDay) && !isFullyBooked(currentDay) && <div className={styles.booked}></div>}
                  {currentDay.date !== null && isFullyBooked(currentDay) && <div className={styles.fully_booked}></div>}
                  {currentDay.date !== null && startDate && endDate && currentDay.date >= new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) && currentDay.date <= endDate && <div className={styles.in_range}></div>}
                </div>
              </div>
            ))}
          </div>
          {day && (
            <div className={styles.day}>
              <div className={styles.date}>{day.date.toLocaleDateString(`${language}-${country}`)}</div>
              <div className={styles.hours}>
                {new Array(24).fill(null).map((value, index) => (
                  <div className={styles.hour + (isBooked(day, index) ? " " + styles.hour_booked : "") + (startDate && endDate && new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), index) >= startDate && new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), index) <= endDate ? " " + styles.hour_in_range : "") + (hour === index ? " " + styles.hour_selected : "")} key={"hour-" + index} onClick={(e) => setHour(hour === index ? null : index)}>
                    {index < 10 ? "0" : ""}
                    {index}
                    {hour === index && (
                      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                        <ul>
                          <li>
                            <button disabled={isBooked(day, index) || new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour) < new Date()} onClick={onClickSelectFrom}>
                              {language === "sv" ? "Välj från" : "Select from"}
                            </button>
                          </li>
                          <li>
                            <button disabled={startDate === null || new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour, 59, 59, 999) <= startDate || isBooked(day, index) || !isBookable(day, index)} onClick={onClickSelectTo}>
                              {language === "sv" ? "Välj till" : "Select to"}
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {(startDate || endDate) && (
            <div className={styles.date_range}>
              {startDate && (
                <div className={styles.from}>
                  <div className={styles.text}>{language === "sv" ? "Från:" : "From:"}</div>
                  <div className={styles.date}>{startDate.toLocaleString(`${language}-${country}`)}</div>
                </div>
              )}
              {endDate && (
                <div className={styles.to}>
                  <div className={styles.text}>{language === "sv" ? "Till:" : "To:"}</div>
                  <div className={styles.date}>{endDate.toLocaleString(`${language}-${country}`)}</div>
                </div>
              )}
              <button className={styles.reset} onClick={onClickReset}>
                {language === "sv" ? "Nollställ" : "Reset"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function computeBookings(startDate, endDate, bookings = {}, collisions = false) {
  const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), 0, 0, 0);
  const normalizedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), 59, 59, 999);

  if (normalizedStartDate < normalizedEndDate) {
    for (let currentDate = normalizedStartDate; currentDate <= normalizedEndDate; currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60)) {
      const date = currentDate.getDate();
      const fullYear = currentDate.getFullYear();
      const hours = currentDate.getHours();
      const month = currentDate.getMonth();
      const key = fullYear + "-" + (month + 1 < 10 ? "0" : "") + (month + 1) + "-" + (date < 10 ? "0" : "") + date;

      if (!bookings[key]) {
        bookings[key] = { isBooked: false, isFullyBooked: false };
      }

      if (bookings[key][hours] && collisions) {
        bookings[key][hours] += 1;
      } else if (bookings[key][hours]) {
        bookings[key][hours] = true;
      } else if (collisions) {
        bookings[key][hours] = 1;
      } else {
        bookings[key][hours] = true;
      }

      let hoursFilled = 0;

      for (let i = 0; i < 24; i++) {
        if (bookings[key][i]) {
          hoursFilled++;
        } else if (hoursFilled > 0) {
          break;
        }
      }

      if (hoursFilled > 0) {
        bookings[key].isBooked = true;
      }

      if (hoursFilled === 24) {
        bookings[key].isFullyBooked = true;
      }
    }
  }

  return bookings;
}
