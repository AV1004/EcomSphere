import React, { useEffect, useState } from "react";

export default function Timer({ duration, setResendEnable }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
  }, [time]);

  const getFormattedTime = (miliSeconds) => {
    let total_seconds = parseInt(Math.floor(miliSeconds / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);

    if (minutes === 0 && seconds === 0) {
      setResendEnable(true);
    }

    return `${minutes}:${seconds}`;
  };

  return <div>{getFormattedTime(time)}</div>;
}
