"use client";

import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import UpcomingMeetings from "@/components/v1-manager/UpcomingMeetings";
import ScheduleMeeting from "@/components/v1-manager/ScheduleMeeting";

const MeetingSchedulerIcon = () => (
  <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="32" rx="8" fill="#0C6746"/>
    <path d="M19 6V9.99998M11 6V9.99998M24 15.9999C24 12.229 24 10.343 22.828 9.17198C21.656 8.00099 19.771 7.99999 16 7.99999H14C10.229 7.99999 8.343 7.99999 7.172 9.17198C6.001 10.344 6 12.229 6 15.9999V17.9999C6 21.7709 6 23.6569 7.172 24.8279C8.344 25.9989 10.229 25.9999 14 25.9999M6 14H24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.267 22.7L20 21.999V20.266M24 21.999C24 23.0599 23.5786 24.0773 22.8284 24.8274C22.0783 25.5775 21.0609 25.999 20 25.999C18.9391 25.999 17.9217 25.5775 17.1716 24.8274C16.4214 24.0773 16 23.0599 16 21.999C16 20.9381 16.4214 19.9207 17.1716 19.1706C17.9217 18.4204 18.9391 17.999 20 17.999C21.0609 17.999 22.0783 18.4204 22.8284 19.1706C23.5786 19.9207 24 20.9381 24 21.999Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function MeetingSchedulerPage() {
  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar
        pageTitle="Meeting Scheduler"
        pageIcon={<MeetingSchedulerIcon />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        <UpcomingMeetings />
        <ScheduleMeeting />
      </div>
    </div>
  );
}