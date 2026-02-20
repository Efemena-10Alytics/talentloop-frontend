"use client";

import Link from "next/link";

/* ─── SVG Icons ─── */

const AlertCircleSVG = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.75 14.75H10.758M10.75 6.75V11.75M20.75 10.75C20.75 5.227 16.273 0.75 10.75 0.75C5.227 0.75 0.75 5.227 0.75 10.75C0.75 16.273 5.227 20.75 10.75 20.75C16.273 20.75 20.75 16.273 20.75 10.75Z" stroke="#C97D04" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightSVG = () => (
  <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.115 9.654V5.327H0V4.327H9.115V0L16.711 4.827L9.115 9.654Z" fill="#FE8401" />
  </svg>
);

const ApplicationsThisWeekSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M21.4969 14.8965C18.3836 14.8965 15.8599 17.4202 15.8599 20.5335C15.8599 23.6467 18.3836 26.1705 21.4969 26.1705C24.6101 26.1705 27.1336 23.6467 27.1336 20.5335C27.1336 17.4202 24.6099 14.8965 21.4969 14.8965ZM21.4969 23.6855C19.7559 23.6855 18.3446 22.2742 18.3446 20.5335C18.3446 18.7927 19.7559 17.3812 21.4969 17.3812C23.2379 17.3812 24.6489 18.7925 24.6489 20.5335C24.6489 22.2742 23.2376 23.6855 21.4969 23.6855Z" fill="#A2CE3A"/>
    <path d="M21.501 11.1584C16.323 11.1584 12.126 15.3567 12.126 20.5339C12.126 25.7112 16.323 29.9084 21.501 29.9084C26.679 29.9084 30.876 25.7114 30.876 20.5339C30.876 15.3564 26.679 11.1584 21.501 11.1584ZM21.501 27.4237C17.7012 27.4237 14.611 24.3332 14.611 20.5339C14.611 16.7352 17.7015 13.6434 21.501 13.6434C25.3005 13.6434 28.391 16.7352 28.391 20.5339C28.391 24.3327 25.3005 27.4237 21.501 27.4237Z" fill="#A2CE3A"/>
    <path d="M21.497 22.4387C22.5493 22.4387 23.4023 21.5857 23.4023 20.5335C23.4023 19.4812 22.5493 18.6282 21.497 18.6282C20.4448 18.6282 19.5918 19.4812 19.5918 20.5335C19.5918 21.5857 20.4448 22.4387 21.497 22.4387Z" fill="#A2CE3A"/>
  </svg>
);

const TotalApplicationsSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M20.507 29.5334H19.105C15.52 29.5334 13.728 29.5334 12.614 28.3984C11.5 27.2634 11.5 25.4374 11.5 21.7834C11.5 18.1304 11.5 16.3034 12.614 15.1684C13.728 14.0334 15.52 14.0334 19.105 14.0334H22.908C26.493 14.0334 28.286 14.0334 29.4 15.1684C30.257 16.0414 30.454 17.3244 30.5 19.5334" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M20.507 29.5334H19.105C15.52 29.5334 13.728 29.5334 12.614 28.3984C11.5 27.2634 11.5 25.4374 11.5 21.7834C11.5 18.1304 11.5 16.3034 12.614 15.1684C13.728 14.0334 15.52 14.0334 19.105 14.0334H22.908C26.493 14.0334 28.286 14.0334 29.4 15.1684C30.257 16.0414 30.454 17.3244 30.5 19.5334" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M29.5165 28.5564L31.4995 30.5334L29.5165 28.5564ZM30.5525 26.0594C30.5604 25.5913 30.475 25.1263 30.3013 24.6916C30.1276 24.2568 29.8691 23.861 29.5409 23.5271C29.2127 23.1933 28.8212 22.9282 28.3895 22.7472C27.9577 22.5662 27.4942 22.473 27.026 22.473C26.5579 22.473 26.0944 22.5662 25.6626 22.7472C25.2308 22.9282 24.8394 23.1933 24.5111 23.5271C24.1829 23.861 23.9244 24.2568 23.7507 24.6916C23.577 25.1263 23.4916 25.5913 23.4995 26.0594C23.5151 26.9844 23.8935 27.8663 24.5531 28.5149C25.2128 29.1635 26.1009 29.527 27.026 29.527C27.9512 29.527 28.8393 29.1635 29.4989 28.5149C30.1586 27.8663 30.5369 26.9844 30.5525 26.0594Z" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M29.5165 28.5564L31.4995 30.5334M30.5525 26.0594C30.5604 25.5913 30.475 25.1263 30.3013 24.6916C30.1276 24.2568 29.8691 23.861 29.5409 23.5271C29.2127 23.1933 28.8212 22.9282 28.3895 22.7472C27.9577 22.5662 27.4942 22.473 27.026 22.473C26.5579 22.473 26.0944 22.5662 25.6626 22.7472C25.2308 22.9282 24.8394 23.1933 24.5111 23.5271C24.1829 23.861 23.9244 24.2568 23.7507 24.6916C23.577 25.1263 23.4916 25.5913 23.4995 26.0594C23.5151 26.9844 23.8935 27.8663 24.5531 28.5149C25.2128 29.1635 26.1009 29.527 27.026 29.527C27.9512 29.527 28.8393 29.1635 29.4989 28.5149C30.1586 27.8663 30.5369 26.9844 30.5525 26.0594Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.5 14.0334L25.4 13.7234C24.905 12.1834 24.658 11.4134 24.069 10.9734C23.479 10.5334 22.697 10.5334 21.13 10.5334H20.867C19.302 10.5334 18.519 10.5334 17.93 10.9734C17.34 11.4134 17.093 12.1834 16.598 13.7234L16.5 14.0334" stroke="#A2CE3A" strokeWidth="1.5"/>
  </svg>
);

const InterviewsScheduledSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M25 11.5V15.5M17 11.5V15.5M30 21.5C30 17.729 30 15.843 28.828 14.672C27.656 13.501 25.771 13.5 22 13.5H20C16.229 13.5 14.343 13.5 13.172 14.672C12.001 15.844 12 17.729 12 21.5V23.5C12 27.271 12 29.157 13.172 30.328C14.344 31.499 16.229 31.5 20 31.5M12 19.5H30" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27.267 28.2008L26 27.4998V25.7668M30 27.4998C30 28.5607 29.5786 29.5781 28.8284 30.3283C28.0783 31.0784 27.0609 31.4998 26 31.4998C24.9391 31.4998 23.9217 31.0784 23.1716 30.3283C22.4214 29.5781 22 28.5607 22 27.4998C22 26.439 22.4214 25.4216 23.1716 24.6714C23.9217 23.9213 24.9391 23.4998 26 23.4998C27.0609 23.4998 28.0783 23.9213 28.8284 24.6714C29.5786 25.4216 30 26.439 30 27.4998Z" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ResponseRateSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M26 14.2335H33.2V21.4335" stroke="#A2CE3A" strokeWidth="1.83335" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M33.2008 14.2335L23.0308 24.4035C22.8625 24.5684 22.6364 24.6607 22.4008 24.6607C22.1652 24.6607 21.939 24.5684 21.7708 24.4035L17.6308 20.2635C17.4625 20.0986 17.2364 20.0062 17.0008 20.0062C16.7652 20.0062 16.539 20.0986 16.3708 20.2635L9.80078 26.8335" stroke="#A2CE3A" strokeWidth="1.83335" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarSmallSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBC02D" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const RecentActivityIconSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M20.507 29.5334H19.105C15.52 29.5334 13.728 29.5334 12.614 28.3984C11.5 27.2634 11.5 25.4374 11.5 21.7834C11.5 18.1304 11.5 16.3034 12.614 15.1684C13.728 14.0334 15.52 14.0334 19.105 14.0334H22.908C26.493 14.0334 28.286 14.0334 29.4 15.1684C30.257 16.0414 30.454 17.3244 30.5 19.5334" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M20.507 29.5334H19.105C15.52 29.5334 13.728 29.5334 12.614 28.3984C11.5 27.2634 11.5 25.4374 11.5 21.7834C11.5 18.1304 11.5 16.3034 12.614 15.1684C13.728 14.0334 15.52 14.0334 19.105 14.0334H22.908C26.493 14.0334 28.286 14.0334 29.4 15.1684C30.257 16.0414 30.454 17.3244 30.5 19.5334" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M29.5165 28.5565L31.4995 30.5335L29.5165 28.5565ZM30.5525 26.0595C30.5604 25.5914 30.475 25.1264 30.3013 24.6917C30.1276 24.2569 29.8691 23.8611 29.5409 23.5273C29.2127 23.1934 28.8212 22.9283 28.3895 22.7473C27.9577 22.5664 27.4942 22.4731 27.026 22.4731C26.5579 22.4731 26.0944 22.5664 25.6626 22.7473C25.2308 22.9283 24.8394 23.1934 24.5111 23.5273C24.1829 23.8611 23.9244 24.2569 23.7507 24.6917C23.577 25.1264 23.4916 25.5914 23.4995 26.0595C23.5151 26.9845 23.8935 27.8664 24.5531 28.515C25.2128 29.1637 26.1009 29.5271 27.026 29.5271C27.9512 29.5271 28.8393 29.1637 29.4989 28.515C30.1586 27.8664 30.5369 26.9845 30.5525 26.0595Z" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M29.5165 28.5565L31.4995 30.5335M30.5525 26.0595C30.5604 25.5914 30.475 25.1264 30.3013 24.6917C30.1276 24.2569 29.8691 23.8611 29.5409 23.5273C29.2127 23.1934 28.8212 22.9283 28.3895 22.7473C27.9577 22.5664 27.4942 22.4731 27.026 22.4731C26.5579 22.4731 26.0944 22.5664 25.6626 22.7473C25.2308 22.9283 24.8394 23.1934 24.5111 23.5273C24.1829 23.8611 23.9244 24.2569 23.7507 24.6917C23.577 25.1264 23.4916 25.5914 23.4995 26.0595C23.5151 26.9845 23.8935 27.8664 24.5531 28.515C25.2128 29.1637 26.1009 29.5271 27.026 29.5271C27.9512 29.5271 28.8393 29.1637 29.4989 28.515C30.1586 27.8664 30.5369 26.9845 30.5525 26.0595Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.5 14.0334L25.4 13.7234C24.905 12.1834 24.658 11.4134 24.069 10.9734C23.479 10.5334 22.697 10.5334 21.13 10.5334H20.867C19.302 10.5334 18.519 10.5334 17.93 10.9734C17.34 11.4134 17.093 12.1834 16.598 13.7234L16.5 14.0334" stroke="#A2CE3A" strokeWidth="1.5"/>
  </svg>
);

const AutoApplyIconSVG = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.37089 3.73804C6.25764 3.73804 3.73389 6.26179 3.73389 9.37504C3.73389 12.4883 6.25764 15.012 9.37089 15.012C12.4841 15.012 15.0076 12.4883 15.0076 9.37504C15.0076 6.26179 12.4839 3.73804 9.37089 3.73804ZM9.37089 12.527C7.62989 12.527 6.21864 11.1158 6.21864 9.37504C6.21864 7.63429 7.62989 6.22279 9.37089 6.22279C11.1119 6.22279 12.5229 7.63404 12.5229 9.37504C12.5229 11.1158 11.1116 12.527 9.37089 12.527Z" fill="#A2CE3A"/>
    <path d="M9.375 0C4.197 0 0 4.19825 0 9.3755C0 14.5527 4.197 18.75 9.375 18.75C14.553 18.75 18.75 14.553 18.75 9.3755C18.75 4.198 14.553 0 9.375 0ZM9.375 16.2652C5.57525 16.2652 2.485 13.1747 2.485 9.3755C2.485 5.57675 5.5755 2.485 9.375 2.485C13.1745 2.485 16.265 5.57675 16.265 9.3755C16.265 13.1742 13.1745 16.2652 9.375 16.2652Z" fill="#A2CE3A"/>
    <path d="M9.37107 11.2802C10.4233 11.2802 11.2763 10.4272 11.2763 9.37498C11.2763 8.32274 10.4233 7.46973 9.37107 7.46973C8.31883 7.46973 7.46582 8.32274 7.46582 9.37498C7.46582 10.4272 8.31883 11.2802 9.37107 11.2802Z" fill="#A2CE3A"/>
  </svg>
);

const BrowseJobsIconSVG = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.757 19.75H8.355C4.77 19.75 2.978 19.75 1.864 18.615C0.75 17.48 0.75 15.654 0.75 12C0.75 8.347 0.75 6.52 1.864 5.385C2.978 4.25 4.77 4.25 8.355 4.25H12.158C15.743 4.25 17.536 4.25 18.65 5.385C19.507 6.258 19.704 7.541 19.75 9.75" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M9.757 19.75H8.355C4.77 19.75 2.978 19.75 1.864 18.615C0.75 17.48 0.75 15.654 0.75 12C0.75 8.347 0.75 6.52 1.864 5.385C2.978 4.25 4.77 4.25 8.355 4.25H12.158C15.743 4.25 17.536 4.25 18.65 5.385C19.507 6.258 19.704 7.541 19.75 9.75" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18.767 18.773L20.75 20.75L18.767 18.773ZM19.803 16.276C19.8109 15.8079 19.7255 15.3429 19.5518 14.9081C19.3781 14.4733 19.1196 14.0775 18.7914 13.7437C18.4631 13.4099 18.0717 13.1447 17.6399 12.9638C17.2082 12.7828 16.7447 12.6896 16.2765 12.6896C15.8083 12.6896 15.3449 12.7828 14.9131 12.9638C14.4813 13.1447 14.0899 13.4099 13.7616 13.7437C13.4334 14.0775 13.1749 14.4733 13.0012 14.9081C12.8275 15.3429 12.7421 15.8079 12.75 16.276C12.7656 17.201 13.144 18.0828 13.8036 18.7314C14.4633 19.3801 15.3514 19.7436 16.2765 19.7436C17.2016 19.7436 18.0897 19.3801 18.7494 18.7314C19.409 18.0828 19.7874 17.201 19.803 16.276Z" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M18.767 18.773L20.75 20.75M19.803 16.276C19.8109 15.8079 19.7255 15.3429 19.5518 14.9081C19.3781 14.4733 19.1196 14.0775 18.7914 13.7437C18.4631 13.4099 18.0717 13.1447 17.6399 12.9638C17.2082 12.7828 16.7447 12.6896 16.2765 12.6896C15.8083 12.6896 15.3449 12.7828 14.9131 12.9638C14.4813 13.1447 14.0899 13.4099 13.7616 13.7437C13.4334 14.0775 13.1749 14.4733 13.0012 14.9081C12.8275 15.3429 12.7421 15.8079 12.75 16.276C12.7656 17.201 13.144 18.0828 13.8036 18.7314C14.4633 19.3801 15.3514 19.7436 16.2765 19.7436C17.2016 19.7436 18.0897 19.3801 18.7494 18.7314C19.409 18.0828 19.7874 17.201 19.803 16.276Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.75 4.25L14.65 3.94C14.155 2.4 13.908 1.63 13.319 1.19C12.729 0.75 11.947 0.75 10.38 0.75H10.117C8.552 0.75 7.769 0.75 7.18 1.19C6.59 1.63 6.343 2.4 5.848 3.94L5.75 4.25" stroke="#A2CE3A" strokeWidth="1.5"/>
  </svg>
);

const MockInterviewIconSVG = () => (
  <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.36621 10.8929C8.57826 10.8929 9.55371 9.92861 9.55371 8.75004V3.75003C9.55371 2.57146 8.57826 1.60718 7.36621 1.60718C6.15416 1.60718 5.17871 2.57146 5.17871 3.75003V8.75004C5.17871 9.92861 6.15416 10.8929 7.36621 10.8929Z" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M14.7321 8.7053C14.7321 8.60709 14.6518 8.52673 14.5536 8.52673H13.2143C13.1161 8.52673 13.0357 8.60709 13.0357 8.7053C13.0357 11.837 10.4978 14.3749 7.36607 14.3749C4.23437 14.3749 1.69643 11.837 1.69643 8.7053C1.69643 8.60709 1.61607 8.52673 1.51786 8.52673H0.178571C0.0803571 8.52673 0 8.60709 0 8.7053C0 12.4709 2.82589 15.5781 6.47321 16.0178V18.3035H3.22991C2.92411 18.3035 2.67857 18.6227 2.67857 19.0178V19.8214C2.67857 19.9196 2.74107 19.9999 2.81696 19.9999H11.9152C11.9911 19.9999 12.0536 19.9196 12.0536 19.8214V19.0178C12.0536 18.6227 11.808 18.3035 11.5022 18.3035H8.16964V16.029C11.8594 15.6272 14.7321 12.5022 14.7321 8.7053Z" fill="#A2CE3A"/>
    <path d="M7.36593 12.5C9.46191 12.5 11.1606 10.8214 11.1606 8.75V3.75C11.1606 1.67857 9.46191 0 7.36593 0C5.26995 0 3.57129 1.67857 3.57129 3.75V8.75C3.57129 10.8214 5.26995 12.5 7.36593 12.5ZM5.17843 3.75C5.17843 2.57143 6.15388 1.60714 7.36593 1.60714C8.57799 1.60714 9.55343 2.57143 9.55343 3.75V8.75C9.55343 9.92857 8.57799 10.8929 7.36593 10.8929C6.15388 10.8929 5.17843 9.92857 5.17843 8.75V3.75Z" fill="#A2CE3A"/>
  </svg>
);

const SkillInsightsIconSVG = () => (
  <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.1157 0.916626H24.3157V8.11662" stroke="#A2CE3A" strokeWidth="1.83335" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.3165 0.916626L14.1465 11.0866C13.9783 11.2515 13.7521 11.3439 13.5165 11.3439C13.2809 11.3439 13.0547 11.2515 12.8865 11.0866L8.7465 6.94663C8.57827 6.78172 8.35208 6.68935 8.1165 6.68935C7.88093 6.68935 7.65474 6.78172 7.4865 6.94663L0.916504 13.5166" stroke="#A2CE3A" strokeWidth="1.83335" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QuickActionArrowSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PriorityAlertSVG = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.75 14.75H10.758M10.75 6.75V11.75M20.75 10.75C20.75 5.227 16.273 0.75 10.75 0.75C5.227 0.75 0.75 5.227 0.75 10.75C0.75 16.273 5.227 20.75 10.75 20.75C16.273 20.75 20.75 16.273 20.75 10.75Z" stroke="#C97D04" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */

const stats = [
  { icon: <ApplicationsThisWeekSVG />, label: "Application This Week", value: "23", sub: "+12 from last week", subColor: "text-[#A2CE3A]" },
  { icon: <TotalApplicationsSVG />, label: "Total Applications", value: "147", sub: "Lifetime", subColor: "text-white/40" },
  { icon: <InterviewsScheduledSVG />, label: "Interviews Scheduled", value: "5", sub: "Next 2 weeks", subColor: "text-white/40" },
  { icon: <ResponseRateSVG />, label: "Response Rate", value: "12%", sub: "+3% from last month", subColor: "text-[#A2CE3A]" },
];

const upcomingInterviews = [
  { company: "Meta", type: "Technical", role: "Frontend Engineer", date: "Jan 16, 2026", time: "3:00 PM" },
  { company: "Stripe", type: "Technical", role: "Product Designer", date: "Jan 16, 2026", time: "3:00 PM" },
];

const recentActivity = [
  { title: "Applied to Google", subtitle: "Frontend Engineer", time: "2 hours ago" },
  { title: "Interview scheduled with Meta", subtitle: "Frontend Engineer", time: "5 hours ago" },
  { title: "Applied to Amazon", subtitle: "Frontend Engineer", time: "1 day ago" },
  { title: "Response from Microsoft", subtitle: "Frontend Engineer", time: "1 day ago" },
];

const quickActions = [
  { icon: <AutoApplyIconSVG />, label: "Auto-Apply Settings", href: "/dashboard/auto-apply" },
  { icon: <BrowseJobsIconSVG />, label: "Browse Jobs", href: "/dashboard/job-matching" },
  { icon: <MockInterviewIconSVG />, label: "Mock Interviews", href: "/dashboard/interview-prep" },
  { icon: <SkillInsightsIconSVG />, label: "Skill Insights", href: "/dashboard/analytics" },
];

const prioritySkillGaps = [
  "Advanced SQL & Data Warehousing",
  "Cloud Platform Experience (AWS/Azure)",
  "Portfolio Projects with Real Data",
];

/* ─── Page ─── */

export default function DashboardPage() {
  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl">Welcome back, Ricky</h1>
        <p className="text-white/50 font-mona-sans text-sm mt-1">Here&apos;s what&apos;s happening with your job search</p>
      </div>

      {/* CV Score Banner */}
      <div className="bg-[#F27E141A] border border-[#FE8401] rounded-[16px] p-5 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <AlertCircleSVG />
          <span className="text-white font-mona-sans font-bold text-sm">Your CV Score: 72/100</span>
        </div>
        <p className="text-white/50 font-mona-sans text-sm ml-[34px] mb-3">Based on ATS algorithms and best practices</p>
        <Link href="/dashboard/cv-revamp" className="ml-[34px] flex items-center gap-2 text-[#FE8401] font-mona-sans text-sm font-semibold hover:opacity-80 transition-opacity">
          View Recommendations <ArrowRightSVG />
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#161719] border border-white/10 rounded-[16px] p-5">
            <div className="mb-4">{stat.icon}</div>
            <p className="text-white/50 font-mona-sans text-xs mb-1">{stat.label}</p>
            <p className="text-white font-mona-sans font-bold text-2xl">{stat.value}</p>
            <p className={`font-mona-sans text-xs mt-1 ${stat.subColor}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Upcoming Interviews */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-xl mb-4">Upcoming Interviews</h2>
            <div className="space-y-3">
              {upcomingInterviews.map((interview, i) => (
                <div key={i} className="bg-[#A2CE3A]/10 border border-[#A2CE3A] rounded-[16px] p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-mona-sans font-bold text-base">{interview.company}</span>
                      <span className="px-3 py-0.5 rounded-full bg-[#A2CE3A]/15 text-[#A2CE3A] text-xs font-mona-sans font-medium">{interview.type}</span>
                    </div>
                    <p className="text-white/50 font-mona-sans text-sm">{interview.role}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-white/40 font-mona-sans text-xs">
                      <CalendarSmallSVG />
                      <span>{interview.date} &nbsp; {interview.time}</span>
                    </div>
                  </div>
                  <Link href="/dashboard/interview-prep" className="px-5 py-2 rounded-[10px] bg-[#A2CE3A] text-[#0B0D0F] font-mona-sans font-semibold text-sm hover:opacity-90 transition-opacity">
                    Start Prep
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-xl mb-4">Recent Activity</h2>
            <div className="bg-[#161719] border border-white/10 rounded-[16px] divide-y divide-white/5">
              {recentActivity.map((activity, i) => (
                <div key={i} className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RecentActivityIconSVG />
                    <div>
                      <p className="text-white font-mona-sans font-semibold text-sm">{activity.title}</p>
                      <p className="text-white/40 font-mona-sans text-xs">{activity.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-white/40 font-mona-sans text-xs whitespace-nowrap ml-4">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Coaches you can work with */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-base mb-3">Coaches you can work with</h2>
            <div className="bg-[#161719] border border-white/10 rounded-[16px] overflow-hidden">
              <div className="relative">
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-[#A2CE3A]/20 text-[#A2CE3A] text-[10px] font-mona-sans font-semibold">
                    🏆 Top Technical Coach
                  </span>
                </div>
                <div className="w-full h-[200px] bg-gradient-to-br from-[#2a2d30] to-[#1a1c1e] flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
                    <path d="M4 20C4 17 7.58 14.5 12 14.5C16.42 14.5 20 17 20 20" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#A2CE3A]/20 text-[#A2CE3A] text-[10px] font-mona-sans font-semibold">
                    Data Science
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-white font-mona-sans font-bold text-sm">Abdullahi Muhammed</span>
                  <StarSVG />
                  <span className="text-white font-mona-sans text-xs">4.9</span>
                </div>
              </div>
            </div>
            {/* Nav arrows */}
            <div className="flex items-center justify-end gap-2 mt-3">
              <button className="cursor-pointer"><img src="/leftarrow.png" alt="Previous" width={28} height={28} /></button>
              <button className="cursor-pointer"><img src="/rightarrow.png" alt="Next" width={28} height={28} /></button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-base mb-3">Quick Actions</h2>
            <div className="bg-[#161719] border border-white/10 rounded-[16px] divide-y divide-white/5">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href} className="flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors first:rounded-t-[16px] last:rounded-b-[16px]">
                  <div className="flex items-center gap-3">
                    {action.icon}
                    <span className="text-white font-mona-sans text-sm">{action.label}</span>
                  </div>
                  <QuickActionArrowSVG />
                </Link>
              ))}
            </div>
          </div>

          {/* Priority Skill Gaps */}
          <div>
            <h2 className="text-white font-mona-sans font-bold text-base mb-3">Priority Skill Gaps</h2>
            <div className="bg-[#161719] border border-white/10 rounded-[16px] p-5 space-y-4">
              {prioritySkillGaps.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <PriorityAlertSVG />
                  <span className="text-white/70 font-mona-sans text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
