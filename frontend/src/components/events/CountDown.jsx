import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if(!data){
      return;
    }
    const timerInterval = setInterval(() => {
      setTimeLeft(prevTimeLeft => calculateTimeLeft(prevTimeLeft));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [data]);

  useEffect(() => {
    if (!data || (
      typeof timeLeft.days === 'undefined' &&
      typeof timeLeft.hours === 'undefined' &&
      typeof timeLeft.minutes === 'undefined' &&
      typeof timeLeft.seconds === 'undefined'
    )) {
      console.log("Deleting event:", data?._id);
      if(data?._id){
      axios.delete(`${server}/event/delete-shop-event/${data?._id}`)
        .then(response => {
          console.log("Delete request successful:", response.data);
        })
        .catch(error => {
          console.error("Delete request failed:", error);
        });
      }
    }
  }, [data, timeLeft]);

  function calculateTimeLeft(prevTimeLeft) {
    const difference = +new Date(data?.finish_date) - +new Date();
    let newTimeLeft = {};

    if (difference > 0) {
      newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return newTimeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  const isTimeUp = Object.values(timeLeft).every(value => value === undefined);

  return (
    <div>
      {isTimeUp ? (
        <span className="text-[red] text-[25px]">No Events Found</span>
      ) : (
        timerComponents
      )}
    </div>
  );
};

export default CountDown;


