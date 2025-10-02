'use client';

import { useEffect, useState } from 'react';
import { FaClock, FaSun, FaMoon } from 'react-icons/fa';

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      // Consider daytime between 6 AM and 6 PM
      const hours = newTime.getHours();
      setIsDaytime(hours >= 6 && hours < 18);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex select-none items-center gap-3 rounded-xl ">
      <div className="sm:block" />

      <div
        className="bg-primary/10 hidden h-10 w-10 items-center justify-center rounded-full sm:flex"
      >
        {isDaytime ? (
          <FaSun className="text-primary h-6 w-6 " />
        ) : (
          <FaMoon className="text-primary h-6 w-6 " />
        )}
      </div>

      <div className="bold-font z-10 flex flex-col items-start">
        <time
          className="text-foreground flex w-[200px] items-center gap-2 text-2xl !font-bold tracking-wide transition-colors text-primary"
        >
          {time
            .toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })
            .replace(/am|AM|pm|PM|$/g, '')
            .trim()}
        </time>
        <time
          className="text-muted-foreground text-sm !font-bold opacity-80"
        >
          {time.toLocaleDateString([], {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
    </div>
  );
}
