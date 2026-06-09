"use client";

import ScheduleMeeting from "../ScheduleMeeting";
import UpcomingMeetings from "../UpcomingMeetings";

export default function WorkspaceMeetings({ clientId }: {clientId: string}) {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        <UpcomingMeetings clientId={clientId} />
        <ScheduleMeeting clientId={clientId} />
      </div>
    </div>
  );
}
