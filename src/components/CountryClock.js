import React, { useState, useEffect } from 'react';

function CountryClock({ timeZone }) {
  const [time, setTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);
  const [pauseStartTime, setPauseStartTime] = useState(null);

  useEffect(() => {
    const fetchTime = () => {
      fetch(`http://worldtimeapi.org/api/timezone/${timeZone}`)
        .then((response) => response.json())
        .then((data) => {
          // Extract the time from the API response and convert it to a JavaScript Date object
          const timeFromApi = new Date(data.utc_datetime);
          setTime(timeFromApi);
        });
    };

    // Fetch time on component mount
    fetchTime();

    // Set up an interval to fetch the time every second, but only if the clock is not paused
    const interval = setInterval(() => {
      if (!isPaused) {
        fetchTime();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone, isPaused]);

  const togglePause = () => {
    if (isPaused) {
      // Resume the clock and adjust the time to start from where it was paused
      setIsPaused(false);
      const pausedDuration = new Date() - pauseStartTime;
      setTime(new Date(time.getTime() + pausedDuration));
    } else {
      // Pause the clock and record the pause start time
      setIsPaused(true);
      setPauseStartTime(new Date());
    }
  };

  return (
    <div>
      <h2>Current Time</h2>
      <p>{time.toLocaleTimeString()}</p>
      <button onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
}

export default CountryClock;
