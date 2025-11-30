import React from 'react';

export default function BaseCalendarDocs() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">BaseCalendar</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          The base class that defines the foundation for all calendars. The class can be extended to implement custom calendar structures, namely custom month lengths and custom number of months in a year. The plugin comes with a standard Gregorian calendar and a simple 30-day month / 360-day year calendar.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Defined Structs</h3>
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">
              <code className="bg-white/20 px-2 py-1 rounded">FGameDateTime</code>
            </h4>
            <p className="mb-4">
              Struct representing the datetime object used for mapping between game ticks and custom calendar structures. This struct takes the place of Unreal's <code className="bg-white/20 px-2 py-1 rounded">FDateTime</code> struct so it's possible to define things like "a world with 13 months of 35 days".
            </p>
            <h5 className="text-white font-medium mb-4">Fields:</h5>
            <ul className="list-none space-y-2 mb-4">
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Year</code>: 1-based year value
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Month</code>: 1-based month value
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Day</code>: 1-based day value
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Hour</code>: 0-based hour value; uses 24-hour structure so values are between 0-23
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Minute</code>: 0-based minute value; uses 60-minute structure so values are between 0-59
              </li>
              <li>
                <code className="bg-white/20 px-2 py-1 rounded">Second</code>: 0-based second value; uses 60-second structure so values are between 0-59
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-6">Class Functions</h3>
        <div className="space-y-8">
          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">GetSecondsPerTick</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual float GetSecondsPerTick() const</code>
              </p>
              <p className="mb-4">
                Returns how many in-game seconds pass per tick. A good default is 1.
              </p>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>A float of the in-game seconds per tick.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">GetTicksPerDay</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual int32 GetTicksPerDay() const</code>
              </p>
              <p className="mb-4">
                Returns the number of ticks per in-game day. A good default is 86,400.
              </p>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>An int32 of the ticks per in-game day.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">ToDateTime</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual FGameDateTime ToDateTime(int64 Tick) const</code>
              </p>
              <p className="mb-4">
                Converts a given game tick value to its corresponding FGameDateTime struct representation based on the calendar's structure.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Tick</code>: The game tick value to convert.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>An FGameDateTime struct representing the date and time at the specified tick.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">ToTicks</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual int64 ToTicks(const FGameDateTime& DT) const</code>
              </p>
              <p className="mb-4">
                Converts a given FGameDateTime struct to its corresponding game tick value. This is the inverse operation of ToDateTime.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">DT</code>: The FGameDateTime struct to convert.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>An int64 representing the game tick value for the specified date and time.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">FormatDate</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual FString FormatDate(const FGameDateTime& DT) const</code>
              </p>
              <p className="mb-4">
                Converts a given FGameDateTime struct to a human-readable formatted string. This function can be overridden to provide custom date formatting that matches your game world's conventions or localization requirements.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">DT</code>: The FGameDateTime struct to format.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>A formatted string representation of the date and time.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">NextCalendarDay</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual FGameDateTime NextCalendarDay(const FGameDateTime& CurrentDay) const</code>
              </p>
              <p className="mb-4">
                Returns the next calendar day following the provided date. This function automatically handles month and year boundaries according to the calendar's structure.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">CurrentDay</code>: The current FGameDateTime to advance from.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>An FGameDateTime representing the next calendar day.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">PrevCalendarDay</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual FGameDateTime PrevCalendarDay(const FGameDateTime& CurrentDay) const</code>
              </p>
              <p className="mb-4">
                Returns the previous calendar day before the provided date. This function automatically handles month and year boundaries in reverse. The function ensures the result does not go beyond the calendar's earliest representable date (Year 1, Month 1, Day 1, Hour 0, Minute 0, Second 0).
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">CurrentDay</code>: The current FGameDateTime to move back from.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>An FGameDateTime representing the previous calendar day, clamped to the calendar's minimum date if necessary.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">AddMinutes</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual FGameDateTime AddMinutes(const FGameDateTime& Start, int32 DeltaMinutes) const</code>
              </p>
              <p className="mb-4">
                Adds a specified number of minutes to a starting date and time in calendar space. This function properly handles all date and time boundaries including hour, day, month, and year rollovers. Negative values can be used to subtract minutes from the starting time.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Start</code>: The starting FGameDateTime.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">DeltaMinutes</code>: The number of minutes to add (positive) or subtract (negative).
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>An FGameDateTime representing the result after adding the specified minutes.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">MinutesBetween</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual int32 MinutesBetween(const FGameDateTime& A, const FGameDateTime& B) const</code>
              </p>
              <p className="mb-4">
                Calculates the signed number of minutes between two date and time values. The result is positive if B occurs after A, and negative if B occurs before A.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">A</code>: The first FGameDateTime for comparison.
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">B</code>: The second FGameDateTime for comparison.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>An int32 representing the signed number of minutes between A and B.</p>
            </div>
          </div>

          <div>
            <div className="border-l-4 border-blue-500/50 pl-6">
              <h4 className="text-lg font-medium text-white mb-4">
                <code className="bg-white/20 px-2 py-1 rounded">NextTimeOfDayTick</code>
              </h4>
              <p className="mb-4">
                <code className="bg-slate-800/50 px-2 py-1 rounded">virtual int64 NextTimeOfDayTick(int32 Hour, int32 Minute, int32 Second, int64 NowTick) const</code>
              </p>
              <p className="mb-4">
                Finds the next occurrence of a specific time of day starting from NowTick.
              </p>
              <h5 className="text-white font-medium mb-2">Parameters:</h5>
              <ul className="list-none space-y-2 mb-4">
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Hour</code>: The target hour (0-23).
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Minute</code>: The target minute (0-59).
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">Second</code>: The target second (0-59).
                </li>
                <li>
                  <code className="bg-white/20 px-2 py-1 rounded">NowTick</code>: The current game tick to start searching from.
                </li>
              </ul>
              <h5 className="text-white font-medium mb-2">Returns:</h5>
              <p>An int64 representing the next tick at which the specified time of day occurs.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
