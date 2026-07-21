"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAvatar } from "@/context/AvatarContext";
import { useAuthMe } from "@/hooks/useUserData";
import { clearAuthStorage } from "@/lib/auth";

interface DashboardNavbarProps {
  pageTitle: string;
  pageIcon: React.ReactNode;
  actionSlot?: React.ReactNode;
}

const PremiumPlanSVG = () => (
  <svg width="104" height="44" viewBox="0 0 104 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="8" width="104" height="28" rx="14" fill="#00C063" fillOpacity="0.05"/>
    <rect x="0.75" y="8.75" width="102.5" height="26.5" rx="13.25" stroke="#00C063" strokeOpacity="0.15" strokeWidth="1.5"/>
    <path d="M8.732 28V17.57H12.316C12.9973 17.57 13.5947 17.7053 14.108 17.976C14.6213 18.2373 15.018 18.6107 15.298 19.096C15.5873 19.572 15.732 20.1273 15.732 20.762C15.732 21.3967 15.5873 21.952 15.298 22.428C15.018 22.904 14.6213 23.2773 14.108 23.548C13.604 23.8093 13.0067 23.94 12.316 23.94H9.852V28H8.732ZM9.852 22.89H12.372C12.82 22.89 13.212 22.806 13.548 22.638C13.884 22.4607 14.1453 22.2133 14.332 21.896C14.5187 21.5693 14.612 21.1867 14.612 20.748C14.612 20.3093 14.5187 19.9313 14.332 19.614C14.1453 19.2967 13.884 19.054 13.548 18.886C13.212 18.7087 12.82 18.62 12.372 18.62H9.852V22.89ZM17.4341 28V20.496H18.4841V21.728L18.3441 21.546C18.5214 21.1913 18.7874 20.9113 19.1421 20.706C19.5061 20.5007 19.9448 20.398 20.4581 20.398H20.9341V21.448H20.2761C19.7348 21.448 19.3008 21.616 18.9741 21.952C18.6474 22.288 18.4841 22.764 18.4841 23.38V28H17.4341ZM25.4406 28.168C24.7406 28.168 24.1059 28 23.5366 27.664C22.9766 27.3187 22.5332 26.8473 22.2066 26.25C21.8799 25.6527 21.7166 24.976 21.7166 24.22C21.7166 23.464 21.8752 22.7967 22.1926 22.218C22.5099 21.63 22.9392 21.168 23.4806 20.832C24.0312 20.496 24.6472 20.328 25.3286 20.328C25.8699 20.328 26.3506 20.4307 26.7706 20.636C27.1999 20.832 27.5639 21.1027 27.8626 21.448C28.1612 21.784 28.3899 22.1667 28.5486 22.596C28.7072 23.016 28.7866 23.45 28.7866 23.898C28.7866 23.9913 28.7819 24.0987 28.7726 24.22C28.7632 24.332 28.7492 24.4487 28.7306 24.57H22.3886V23.59H28.1286L27.6246 24.01C27.7086 23.4967 27.6479 23.0393 27.4426 22.638C27.2466 22.2273 26.9619 21.9053 26.5886 21.672C26.2152 21.4293 25.7952 21.308 25.3286 21.308C24.8619 21.308 24.4279 21.4293 24.0266 21.672C23.6346 21.9147 23.3266 22.2553 23.1026 22.694C22.8786 23.1233 22.7899 23.6367 22.8366 24.234C22.7899 24.8313 22.8832 25.354 23.1166 25.802C23.3592 26.2407 23.6859 26.5813 24.0966 26.824C24.5166 27.0667 24.9646 27.188 25.4406 27.188C25.9912 27.188 26.4532 27.0573 26.8266 26.796C27.1999 26.5347 27.5032 26.208 27.7366 25.816L28.6326 26.292C28.4832 26.628 28.2546 26.9407 27.9466 27.23C27.6386 27.51 27.2699 27.7387 26.8406 27.916C26.4206 28.084 25.9539 28.168 25.4406 28.168ZM30.4978 28V20.496H31.5478V21.924L31.3798 21.714C31.5852 21.2753 31.8885 20.9347 32.2898 20.692C32.7005 20.4493 33.1485 20.328 33.6338 20.328C34.2125 20.328 34.7352 20.4913 35.2018 20.818C35.6685 21.1447 35.9998 21.5693 36.1958 22.092L35.9018 22.106C36.0885 21.5273 36.4105 21.0887 36.8678 20.79C37.3345 20.482 37.8478 20.328 38.4078 20.328C38.9118 20.328 39.3738 20.4493 39.7938 20.692C40.2232 20.9347 40.5638 21.2707 40.8158 21.7C41.0772 22.12 41.2078 22.596 41.2078 23.128V28H40.1578V23.534C40.1578 23.0767 40.0738 22.6893 39.9058 22.372C39.7472 22.0547 39.5278 21.812 39.2478 21.644C38.9678 21.4667 38.6458 21.378 38.2818 21.378C37.9272 21.378 37.6052 21.4667 37.3158 21.644C37.0265 21.812 36.7978 22.0593 36.6298 22.386C36.4618 22.7033 36.3778 23.086 36.3778 23.534V28H35.3278V23.534C35.3278 23.0767 35.2438 22.6893 35.0758 22.372C34.9172 22.0547 34.6978 21.812 34.4178 21.644C34.1378 21.4667 33.8158 21.378 33.4518 21.378C33.0878 21.378 32.7612 21.4667 32.4718 21.644C32.1918 21.812 31.9678 22.0593 31.7998 22.386C31.6318 22.7033 31.5478 23.086 31.5478 23.534V28H30.4978ZM43.0727 28V20.496H44.1227V28H43.0727ZM43.0727 19.11V17.57H44.1227V19.11H43.0727ZM48.7919 28.168C48.2692 28.168 47.7932 28.0467 47.3639 27.804C46.9346 27.552 46.5939 27.2067 46.3419 26.768C46.0992 26.32 45.9779 25.8067 45.9779 25.228V20.496H47.0279V25.102C47.0279 25.5033 47.1072 25.858 47.2659 26.166C47.4339 26.4647 47.6626 26.698 47.9519 26.866C48.2506 27.034 48.5912 27.118 48.9739 27.118C49.3566 27.118 49.6972 27.034 49.9959 26.866C50.2946 26.6887 50.5279 26.4413 50.6959 26.124C50.8639 25.7973 50.9479 25.41 50.9479 24.962V20.496H51.9979V28H50.9479V26.544L51.1859 26.6C51.0086 27.0853 50.7052 27.468 50.2759 27.748C49.8466 28.028 49.3519 28.168 48.7919 28.168ZM54.0173 28V20.496H55.0673V21.924L54.8993 21.714C55.1046 21.2753 55.408 20.9347 55.8093 20.692C56.22 20.4493 56.668 20.328 57.1533 20.328C57.732 20.328 58.2546 20.4913 58.7213 20.818C59.188 21.1447 59.5193 21.5693 59.7153 22.092L59.4213 22.106C59.608 21.5273 59.93 21.0887 60.3873 20.79C60.854 20.482 61.3673 20.328 61.9273 20.328C62.4313 20.328 62.8933 20.4493 63.3133 20.692C63.7426 20.9347 64.0833 21.2707 64.3353 21.7C64.5966 22.12 64.7273 22.596 64.7273 23.128V28H63.6773V23.534C63.6773 23.0767 63.5933 22.6893 63.4253 22.372C63.2666 22.0547 63.0473 21.812 62.7673 21.644C62.4873 21.4667 62.1653 21.378 61.8013 21.378C61.4466 21.378 61.1246 21.4667 60.8353 21.644C60.546 21.812 60.3173 22.0593 60.1493 22.386C59.9813 22.7033 59.8973 23.086 59.8973 23.534V28H58.8473V23.534C58.8473 23.0767 58.7633 22.6893 58.5953 22.372C58.4366 22.0547 58.2173 21.812 57.9373 21.644C57.6573 21.4667 57.3353 21.378 56.9713 21.378C56.6073 21.378 56.2806 21.4667 55.9913 21.644C55.7113 21.812 55.4873 22.0593 55.3193 22.386C55.1513 22.7033 55.0673 23.086 55.0673 23.534V28H54.0173ZM68.985 28V17.57H72.569C73.2504 17.57 73.8477 17.7053 74.361 17.976C74.8744 18.2373 75.271 18.6107 75.551 19.096C75.8404 19.572 75.985 20.1273 75.985 20.762C75.985 21.3967 75.8404 21.952 75.551 22.428C75.271 22.904 74.8744 23.2773 74.361 23.548C73.857 23.8093 73.2597 23.94 72.569 23.94H70.105V28H68.985ZM70.105 22.89H72.625C73.073 22.89 73.465 22.806 73.801 22.638C74.137 22.4607 74.3984 22.2133 74.585 21.896C74.7717 21.5693 74.865 21.1867 74.865 20.748C74.865 20.3093 74.7717 19.9313 74.585 19.614C74.3984 19.2967 74.137 19.054 73.801 18.886C73.465 18.7087 73.073 18.62 72.625 18.62H70.105V22.89ZM77.6871 28V17.402H78.7371V28H77.6871ZM82.9164 28.168C82.4404 28.168 82.0157 28.0793 81.6424 27.902C81.269 27.7153 80.975 27.4633 80.7604 27.146C80.5457 26.8287 80.4384 26.4647 80.4384 26.054C80.4384 25.662 80.5224 25.3073 80.6904 24.99C80.8584 24.6633 81.1197 24.388 81.4744 24.164C81.829 23.94 82.2817 23.7813 82.8324 23.688L85.7724 23.198V24.15L83.0844 24.598C82.543 24.6913 82.151 24.864 81.9084 25.116C81.675 25.368 81.5584 25.6667 81.5584 26.012C81.5584 26.348 81.689 26.6327 81.9504 26.866C82.221 27.0993 82.5664 27.216 82.9864 27.216C83.4997 27.216 83.9477 27.1087 84.3304 26.894C84.713 26.67 85.0117 26.3713 85.2264 25.998C85.441 25.6247 85.5484 25.2093 85.5484 24.752V22.848C85.5484 22.4 85.385 22.036 85.0584 21.756C84.7317 21.476 84.307 21.336 83.7844 21.336C83.327 21.336 82.9257 21.4527 82.5804 21.686C82.235 21.91 81.9784 22.204 81.8104 22.568L80.8584 22.05C80.9984 21.7327 81.2177 21.4433 81.5164 21.182C81.8244 20.9207 82.1744 20.7153 82.5664 20.566C82.9584 20.4073 83.3644 20.328 83.7844 20.328C84.335 20.328 84.8204 20.4353 85.2404 20.65C85.6697 20.8647 86.001 21.1633 86.2344 21.546C86.477 21.9193 86.5984 22.3533 86.5984 22.848V28H85.5484V26.502L85.7024 26.656C85.5717 26.936 85.3664 27.1927 85.0864 27.426C84.8157 27.65 84.4937 27.832 84.1204 27.972C83.7564 28.1027 83.355 28.168 82.9164 28.168ZM88.6181 28V20.496H89.6681V21.952L89.4301 21.896C89.6167 21.4107 89.9201 21.028 90.3401 20.748C90.7694 20.468 91.2641 20.328 91.8241 20.328C92.3561 20.328 92.8321 20.4493 93.2521 20.692C93.6814 20.9347 94.0174 21.2707 94.2601 21.7C94.5121 22.12 94.6381 22.596 94.6381 23.128V28H93.5881V23.534C93.5881 23.0767 93.5041 22.6893 93.3361 22.372C93.1774 22.0547 92.9487 21.812 92.6501 21.644C92.3607 21.4667 92.0247 21.378 91.6421 21.378C91.2594 21.378 90.9187 21.4667 90.6201 21.644C90.3214 21.812 90.0881 22.0593 89.9201 22.386C89.7521 22.7033 89.6681 23.086 89.6681 23.534V28H88.6181Z" fill="#00C063"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="52" height="52" rx="26" fill="#156374" fillOpacity="0.1"/>
    <path d="M28.9169 31.0526C28.9169 31.4397 28.8414 31.8229 28.6948 32.1805C28.5482 32.5381 28.3334 32.863 28.0625 33.1367C27.7916 33.4104 27.47 33.6275 27.1161 33.7756C26.7622 33.9238 26.3828 34 25.9998 34C25.6167 34 25.2373 33.9238 24.8834 33.7756C24.5295 33.6275 24.2079 33.4104 23.937 33.1367C23.6661 32.863 23.4513 32.5381 23.3047 32.1805C23.1581 31.8229 23.0826 31.4397 23.0826 31.0526M32.0266 31.0526H19.9738C19.6822 31.0525 19.3972 30.965 19.1549 30.8013C18.9125 30.6375 18.7236 30.4049 18.6121 30.1327C18.5006 29.8605 18.4714 29.561 18.5284 29.2721C18.5853 28.9831 18.7258 28.7178 18.932 28.5095L19.4337 28.0017C19.9023 27.5279 20.1656 26.8854 20.1655 26.2156V23.8947C20.1655 22.3314 20.7802 20.832 21.8743 19.7265C22.9684 18.6211 24.4524 18 25.9998 18C27.5471 18 29.0311 18.6211 30.1252 19.7265C31.2193 20.832 31.834 22.3314 31.834 23.8947V26.2156C31.8342 26.8855 32.0977 27.528 32.5666 28.0017L33.0692 28.5095C33.275 28.7179 33.4151 28.9833 33.4718 29.272C33.5285 29.5608 33.4993 29.8601 33.3879 30.1321C33.2764 30.4042 33.0877 30.6368 32.8456 30.8006C32.6035 30.9644 32.3179 31.0521 32.0266 31.0526Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DropdownArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668" stroke="#D0D5DD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BagIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="39.9985" height="39.9997" rx="8" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M18.8078 30.8003H17.1255C12.8237 30.8003 10.6735 30.8003 9.33673 29.4383C8 28.0763 8 25.8851 8 21.5003C8 17.1166 8 14.9242 9.33673 13.5622C10.6735 12.2002 12.8237 12.2002 17.1255 12.2002H21.6889C25.9906 12.2002 28.1421 12.2002 29.4789 13.5622C30.5072 14.6098 30.7436 16.1494 30.7988 18.8002" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M18.8078 30.8003H17.1255C12.8237 30.8003 10.6735 30.8003 9.33673 29.4383C8 28.0763 8 25.8851 8 21.5003C8 17.1166 8 14.9242 9.33673 13.5622C10.6735 12.2002 12.8237 12.2002 17.1255 12.2002H21.6889C25.9906 12.2002 28.1421 12.2002 29.4789 13.5622C30.5072 14.6098 30.7436 16.1494 30.7988 18.8002" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M29.6191 29.6273L31.9985 31.9997L29.6191 29.6273ZM30.8622 26.6308C30.8716 26.0691 30.7692 25.5111 30.5608 24.9894C30.3524 24.4677 30.0422 23.9927 29.6483 23.5921C29.2544 23.1915 28.7847 22.8734 28.2666 22.6562C27.7485 22.439 27.1924 22.3271 26.6306 22.3271C26.0688 22.3271 25.5127 22.439 24.9946 22.6562C24.4765 22.8734 24.0068 23.1915 23.6129 23.5921C23.219 23.9927 22.9089 24.4677 22.7005 24.9894C22.492 25.5111 22.3896 26.0691 22.399 26.6308C22.4177 27.7409 22.8718 28.7991 23.6633 29.5775C24.4549 30.3558 25.5205 30.792 26.6306 30.792C27.7407 30.792 28.8064 30.3558 29.5979 29.5775C30.3895 28.7991 30.8435 27.7409 30.8622 26.6308Z" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M29.6191 29.6273L31.9985 31.9997M30.8622 26.6308C30.8716 26.0691 30.7692 25.5111 30.5608 24.9894C30.3524 24.4677 30.0422 23.9927 29.6483 23.5921C29.2544 23.1915 28.7847 22.8734 28.2666 22.6562C27.7485 22.439 27.1924 22.3271 26.6306 22.3271C26.0688 22.3271 25.5127 22.439 24.9946 22.6562C24.4765 22.8734 24.0068 23.1915 23.6129 23.5921C23.219 23.9927 22.9089 24.4677 22.7005 24.9894C22.492 25.5111 22.3896 26.0691 22.399 26.6308C22.4177 27.7409 22.8718 28.7991 23.6633 29.5775C24.4549 30.3558 25.5205 30.792 26.6306 30.792C27.7407 30.792 28.8064 30.3558 29.5979 29.5775C30.3895 28.7991 30.8435 27.7409 30.8622 26.6308Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.7994 12.2L24.6794 11.828C24.0855 9.98002 23.7891 9.05601 23.0823 8.528C22.3744 8 21.436 8 19.5557 8H19.2401C17.3622 8 16.4227 8 15.7159 8.528C15.0079 9.05601 14.7116 9.98002 14.1176 11.828L14 12.2" stroke="#A2CE3A" strokeWidth="1.5"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="37.6" height="40.0004" rx="8" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M23.6 8V12.8M14 8V12.8M29.6 20C29.6 15.4748 29.6 13.2116 28.1936 11.8064C26.7872 10.4012 24.5252 10.4 20 10.4H17.6C13.0748 10.4 10.8116 10.4 9.4064 11.8064C8.0012 13.2128 8 15.4748 8 20V22.4C8 26.9252 8 29.1884 9.4064 30.5936C10.8128 31.9988 13.0748 32 17.6 32M8 17.6H29.6" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26.3204 28.0416L24.8 27.2004V25.1208M29.6 27.2004C29.6 28.4734 29.0943 29.6943 28.1941 30.5945C27.2939 31.4947 26.073 32.0004 24.8 32.0004C23.527 32.0004 22.3061 31.4947 21.4059 30.5945C20.5057 29.6943 20 28.4734 20 27.2004C20 25.9274 20.5057 24.7065 21.4059 23.8063C22.3061 22.9061 23.527 22.4004 24.8 22.4004C26.073 22.4004 27.2939 22.9061 28.1941 23.8063C29.0943 24.7065 29.6 25.9274 29.6 27.2004Z" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellNotifIcon = () => (
  <svg width="39" height="40" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="39" height="40" rx="8" fill="#A2CE3A" fillOpacity="0.2"/>
    <path d="M23.9726 27.5789C23.9726 28.1595 23.8569 28.7344 23.6321 29.2708C23.4073 29.8072 23.0778 30.2946 22.6625 30.7051C22.2471 31.1156 21.754 31.4413 21.2113 31.6635C20.6687 31.8856 20.087 32 19.4996 32C18.9122 32 18.3306 31.8856 17.7879 31.6635C17.2452 31.4413 16.7521 31.1156 16.3368 30.7051C15.9214 30.2946 15.5919 29.8072 15.3672 29.2708C15.1424 28.7344 15.0267 28.1595 15.0267 27.5789M28.7407 27.5789H10.2598C9.81273 27.5788 9.37575 27.4476 9.00411 27.2019C8.63246 26.9563 8.34284 26.6073 8.17186 26.199C8.00088 25.7907 7.95622 25.3415 8.04352 24.9081C8.13082 24.4747 8.34616 24.0766 8.66232 23.7642L9.43167 23.0025C10.1503 22.2918 10.5539 21.3281 10.5537 20.3234V16.8421C10.5537 14.497 11.4962 12.248 13.1739 10.5898C14.8516 8.93158 17.127 8 19.4996 8C21.8722 8 24.1476 8.93158 25.8253 10.5898C27.503 12.248 28.4455 14.497 28.4455 16.8421V20.3234C28.4457 21.3283 28.8498 22.292 29.5689 23.0025L30.3395 23.7642C30.655 24.0769 30.8698 24.4749 30.9568 24.9081C31.0437 25.3412 30.9989 25.7902 30.828 26.1982C30.6572 26.6063 30.3679 26.9552 29.9966 27.2009C29.6254 27.4466 29.1875 27.5782 28.7407 27.5789Z" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const notificationItems = [
  { icon: <BagIcon />, title: "Job Applications", unread: true,  time: "15m", description: "Your manager Happiness has applied to 15 job posts today." },
  { icon: <CalendarIcon />, title: "Interview scheduled", unread: true,  time: "15m", description: "You have an interview prep scheduled." },
  { icon: <BagIcon />, title: "Job Applications", unread: true,  time: "15m", description: "You've secured an interview with one of the companies you applied to." },
  { icon: <BagIcon />, title: "Job Applications", unread: false, time: "15m", description: "Your manager Happiness has applied to 15 job posts today." },
  { icon: <BagIcon />, title: "Job Applications", unread: false, time: "15m", description: "Your manager Happiness has applied to 15 job posts today." },
  { icon: <BagIcon />, title: "Job Applications", unread: false, time: "15m", description: "Your manager Happiness has applied to 15 job posts today." },
];

export default function DashboardNavbar({ pageTitle, pageIcon, actionSlot }: DashboardNavbarProps) {
  const { avatarUrl } = useAvatar();
  const { data: authData } = useAuthMe();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      clearAuthStorage();
      await signOut({ callbackUrl: "/" });
    } catch {
      router.push("/signin");
    } finally {
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  const profile = (authData as any)?.user?.profile;
  const firstName: string = profile?.first_name ?? authData?.user?.name?.split(" ")[0] ?? "";
  const lastName: string = profile?.last_name ?? authData?.user?.name?.split(" ").slice(-1)[0] ?? "";
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : firstName
      ? firstName[0].toUpperCase()
      : "U";

  return (
    <nav
      className="bg-[#0e1617] border border-[#FFFFFF1A] rounded-[24px] px-6 py-4 mb-6"
    >
      <div className="flex items-center justify-between">
        {/* Left Side - Page Title */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {pageIcon}
          </div>
          <h1 className="text-white text-xl lg:text-2xl font-mona-sans font-bold">
            {pageTitle}
          </h1>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Custom action slot */}
          {actionSlot && (
            <div className="hidden sm:block">
              {actionSlot}
            </div>
          )}

          {/* Notification */}
          <div
            className="relative"
            ref={notifRef}
            onMouseEnter={() => setIsNotifOpen(true)}
            onMouseLeave={() => setIsNotifOpen(false)}
          >
            <button
              onClick={() => router.push("/dashboard/notifications")}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <NotificationIcon />
            </button>

            {/* Notification Modal */}
            {isNotifOpen && (
              <div
                className="absolute right-0 mt-3 w-[359px] rounded-[24px] z-50 overflow-hidden"
                style={{
                  background: "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <h3 className="text-white font-mona-sans font-bold text-lg">Notification</h3>
                  <button className="text-[#A2CE3A] font-mona-sans text-sm hover:opacity-80 transition-opacity">
                    Mark as read
                  </button>
                </div>

                {/* Notification List */}
                <div className="overflow-y-auto max-h-[490px] px-3 pb-4 flex flex-col gap-1">
                  {notificationItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-white font-mona-sans font-semibold text-sm">{item.title}</span>
                          {item.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#A2CE3A] flex-shrink-0" />}
                        </div>
                        <p className="text-[#9CA3AF] font-mona-sans text-xs leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                      <span className="text-[#6B7280] font-mona-sans text-xs flex-shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#A2CE3A] to-[#156374] flex items-center justify-center flex-shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-mona-sans font-bold text-sm">
                    {initials}
                  </span>
                )}
              </div>
              <div className="hidden lg:block">
                <DropdownArrow />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50"
                style={{
                  background: "#1563741A",
                  border: "0.5px solid #FFFFFF1A",
                }}
              >
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-red-400 hover:bg-white/5 transition-colors disabled:opacity-50 rounded-lg flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6M11 11L14 8M14 8L11 5M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
