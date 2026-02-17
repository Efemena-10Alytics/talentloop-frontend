"use client";

import { useRouter } from "next/navigation";
import { Navbar1 } from "@/components/manage-your-profile/Navbar1";
import { GlassCard } from "@/components/manage-your-profile/GlassCard";

/* ─── SVG Icons ─── */

const CoachingPracticesSVG = () => (
  <svg width="62" height="58" viewBox="0 0 62 58" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="61.3037" height="57.1402" rx="16.0797" fill="#A2CE3A"/>
    <path d="M30.6518 22.3253C31.6926 18.2165 35.6239 16.1185 44.1831 16.0801C44.3199 16.0796 44.4555 16.1061 44.582 16.1583C44.7085 16.2104 44.8235 16.287 44.9202 16.3838C45.017 16.4806 45.0936 16.5955 45.1458 16.722C45.1979 16.8485 45.2245 16.9841 45.224 17.121V35.8566C45.224 36.1327 45.1143 36.3974 44.9191 36.5926C44.7239 36.7878 44.4591 36.8975 44.1831 36.8975C35.8561 36.8975 32.6392 38.5765 30.6518 41.061M30.6518 22.3253C29.6109 18.2165 25.6797 16.1185 17.1205 16.0801C16.9836 16.0796 16.8481 16.1061 16.7215 16.1583C16.595 16.2104 16.4801 16.287 16.3833 16.3838C16.2866 16.4806 16.2099 16.5955 16.1578 16.722C16.1057 16.8485 16.0791 16.9841 16.0796 17.121V35.7311C16.0796 36.3738 16.4777 36.8975 17.1205 36.8975C25.4474 36.8975 28.6761 38.5889 30.6518 41.061M30.6518 22.3253V41.061" stroke="white" strokeWidth="2.00996" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarSVG = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.8984 2.49503L17.021 6.77502C17.3105 7.37077 18.0823 7.9424 18.7335 8.05094L22.5795 8.69613C25.0397 9.10978 25.6186 10.9091 23.8458 12.6843L20.8549 15.6992C20.3484 16.2093 20.071 17.1946 20.2278 17.9001L21.084 21.6326C21.7594 24.5872 20.2037 25.7293 17.6108 24.1856L14.0048 22.033C13.3536 21.6447 12.2802 21.6447 11.6169 22.033L8.01337 24.1856C5.43252 25.7293 3.86471 24.574 4.54007 21.6326L5.39634 17.9001C5.55312 17.1946 5.27574 16.2093 4.76922 15.6992L1.77832 12.6843C0.0187644 10.9079 0.585586 9.10978 3.04463 8.69613L6.89178 8.05094C7.53097 7.9424 8.30281 7.37077 8.59225 6.77502L10.7148 2.49503C11.8726 0.173532 13.7539 0.173532 14.8997 2.49503" stroke="#A2CE3A" strokeWidth="1.50747" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const KnowYourClientSVG = () => (
  <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56.2788" height="56.2788" rx="16.0797" fill="#161719"/>
    <path d="M16.0796 40.1996V37.5196C16.0796 36.0981 16.6443 34.7348 17.6495 33.7296C18.6546 32.7244 20.0179 32.1597 21.4395 32.1597H26.7994C28.2209 32.1597 29.5842 32.7244 30.5894 33.7296C31.5945 34.7348 32.1592 36.0981 32.1592 37.5196V40.1996M33.4992 16.2543C34.6521 16.5495 35.674 17.22 36.4038 18.1601C37.1335 19.1003 37.5296 20.2565 37.5296 21.4467C37.5296 22.6368 37.1335 23.7931 36.4038 24.7332C35.674 25.6733 34.6521 26.3439 33.4992 26.6391M40.1991 40.1996V37.5196C40.1923 36.3366 39.7943 35.1891 39.0672 34.256C38.34 33.3228 37.3246 32.6565 36.1792 32.3607M18.7595 21.44C18.7595 22.8615 19.3242 24.2248 20.3294 25.23C21.3346 26.2351 22.6979 26.7998 24.1194 26.7998C25.5409 26.7998 26.9043 26.2351 27.9094 25.23C28.9146 24.2248 29.4793 22.8615 29.4793 21.44C29.4793 20.0184 28.9146 18.6551 27.9094 17.65C26.9043 16.6448 25.5409 16.0801 24.1194 16.0801C22.6979 16.0801 21.3346 16.6448 20.3294 17.65C19.3242 18.6551 18.7595 20.0184 18.7595 21.44Z" stroke="#A2CE3A" strokeWidth="2.00996" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ActiveListeningSVG = () => (
  <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56.2788" height="56.2523" rx="16.0797" fill="#161719"/>
    <path d="M35.892 22.9391H35.8403C35.6211 21.0503 34.7155 19.308 33.2957 18.0434C31.8758 16.7788 30.0407 16.0801 28.1393 16.0801C26.2379 16.0801 24.4029 16.7788 22.983 18.0434C21.5631 19.308 20.6575 21.0503 20.4383 22.9391H20.3866C19.2443 22.9391 18.1488 23.3928 17.3411 24.2006C16.5334 25.0083 16.0796 26.1038 16.0796 27.2461C16.0796 28.3884 16.5334 29.4839 17.3411 30.2917C18.1488 31.0994 19.2443 31.5532 20.3866 31.5532H22.1095V23.8005C22.1095 22.2012 22.7447 20.6675 23.8756 19.5367C25.0064 18.4059 26.5401 17.7706 28.1393 17.7706C29.7386 17.7706 31.2723 18.4059 32.4031 19.5367C33.5339 20.6675 34.1692 22.2012 34.1692 23.8005V32.4146C34.1686 33.2038 33.8971 33.9689 33.4001 34.582C32.903 35.1951 32.2106 35.6189 31.4385 35.7827C31.2086 34.9762 30.6924 34.2813 29.9867 33.8281C29.2811 33.375 28.4344 33.1948 27.6054 33.3212C26.7763 33.4477 26.0219 33.8722 25.4834 34.5151C24.9449 35.158 24.6594 35.9752 24.6804 36.8136C24.7013 37.6519 25.0273 38.4539 25.5973 39.0691C26.1672 39.6843 26.9419 40.0705 27.7762 40.1554C28.6105 40.2403 29.4472 40.018 30.1293 39.5302C30.8114 39.0423 31.2922 38.3225 31.4816 37.5055C32.7039 37.3243 33.8209 36.7111 34.63 35.7772C35.4391 34.8432 35.8868 33.6503 35.892 32.4146V31.5532C37.0343 31.5532 38.1298 31.0994 38.9376 30.2917C39.7453 29.4839 40.1991 28.3884 40.1991 27.2461C40.1991 26.1038 39.7453 25.0083 38.9376 24.2006C38.1298 23.3928 37.0343 22.9391 35.892 22.9391ZM17.8024 27.2461C17.8024 26.5607 18.0747 25.9034 18.5593 25.4188C19.044 24.9341 19.7013 24.6619 20.3866 24.6619V29.8303C19.7013 29.8303 19.044 29.5581 18.5593 29.0734C18.0747 28.5888 17.8024 27.9315 17.8024 27.2461ZM28.1393 38.4444C27.7986 38.4444 27.4655 38.3434 27.1822 38.1541C26.8989 37.9648 26.678 37.6957 26.5477 37.3809C26.4173 37.0661 26.3831 36.7197 26.4496 36.3855C26.5161 36.0513 26.6802 35.7443 26.9211 35.5034C27.1621 35.2625 27.469 35.0984 27.8032 35.0319C28.1374 34.9654 28.4838 34.9995 28.7986 35.1299C29.1134 35.2603 29.3825 35.4812 29.5718 35.7645C29.7611 36.0478 29.8621 36.3809 29.8621 36.7216C29.8621 37.1785 29.6806 37.6167 29.3575 37.9398C29.0345 38.2629 28.5962 38.4444 28.1393 38.4444ZM35.892 29.8303V24.6619C36.5774 24.6619 37.2347 24.9341 37.7193 25.4188C38.204 25.9034 38.4762 26.5607 38.4762 27.2461C38.4762 27.9315 38.204 28.5888 37.7193 29.0734C37.2347 29.5581 36.5774 29.8303 35.892 29.8303Z" fill="#A2CE3A"/>
  </svg>
);

const SetClearObjectivesSVG = () => (
  <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56.2788" height="56.2788" rx="16.0797" fill="#161719"/>
    <path d="M28.1341 20.8887C24.1293 20.8887 20.8828 24.1352 20.8828 28.14C20.8828 32.1448 24.1293 35.3912 28.1341 35.3912C32.1389 35.3912 35.385 32.1448 35.385 28.14C35.385 24.1352 32.1386 20.8887 28.1341 20.8887ZM28.1341 32.1946C25.8945 32.1946 24.0791 30.3792 24.0791 28.14C24.0791 25.9007 25.8945 24.085 28.1341 24.085C30.3737 24.085 32.1887 25.9004 32.1887 28.14C32.1887 30.3792 30.3733 32.1946 28.1341 32.1946Z" fill="#A2CE3A"/>
    <path d="M28.1393 16.0801C21.4785 16.0801 16.0796 21.4806 16.0796 28.1405C16.0796 34.8003 21.4785 40.1996 28.1393 40.1996C34.8002 40.1996 40.1991 34.8007 40.1991 28.1405C40.1991 21.4803 34.8002 16.0801 28.1393 16.0801ZM28.1393 37.0032C23.2514 37.0032 19.2762 33.0277 19.2762 28.1405C19.2762 23.2539 23.2518 19.2767 28.1393 19.2767C33.0269 19.2767 37.0024 23.2539 37.0024 28.1405C37.0024 33.0271 33.0269 37.0032 28.1393 37.0032Z" fill="#A2CE3A"/>
    <path d="M28.134 30.5902C29.4875 30.5902 30.5848 29.4929 30.5848 28.1393C30.5848 26.7858 29.4875 25.6885 28.134 25.6885C26.7804 25.6885 25.6831 26.7858 25.6831 28.1393C25.6831 29.4929 26.7804 30.5902 28.134 30.5902Z" fill="#A2CE3A"/>
  </svg>
);

const ManageTimeSVG = () => (
  <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56.2788" height="56.2788" rx="16.0797" fill="#161719"/>
    <path d="M28.1393 16.0801C34.7999 16.0801 40.1991 21.4792 40.1991 28.1398C40.1991 34.8004 34.7999 40.1996 28.1393 40.1996C21.4787 40.1996 16.0796 34.8004 16.0796 28.1398C16.0796 21.4792 21.4787 16.0801 28.1393 16.0801ZM28.1393 18.492C25.5806 18.492 23.1266 19.5085 21.3173 21.3178C19.508 23.1271 18.4915 25.5811 18.4915 28.1398C18.4915 30.6986 19.508 33.1525 21.3173 34.9618C23.1266 36.7711 25.5806 37.7876 28.1393 37.7876C30.6981 37.7876 33.152 36.7711 34.9613 34.9618C36.7707 33.1525 37.7871 30.6986 37.7871 28.1398C37.7871 25.5811 36.7707 23.1271 34.9613 21.3178C33.152 19.5085 30.6981 18.492 28.1393 18.492ZM28.1393 20.904C28.4347 20.904 28.7198 21.0125 28.9405 21.2087C29.1613 21.405 29.3023 21.6755 29.3369 21.9688L29.3453 22.1099V27.6405L32.6099 30.9051C32.8262 31.1221 32.9517 31.4134 32.9611 31.7196C32.9704 32.0259 32.8629 32.3242 32.6602 32.554C32.4576 32.7838 32.1751 32.9279 31.87 32.957C31.565 32.986 31.2604 32.8979 31.018 32.7105L30.9046 32.6104L27.2867 28.9924C27.0993 28.8048 26.9789 28.5607 26.9442 28.2978L26.9334 28.1398V22.1099C26.9334 21.7901 27.0604 21.4834 27.2866 21.2572C27.5127 21.031 27.8195 20.904 28.1393 20.904Z" fill="#A2CE3A"/>
  </svg>
);

const BulbSVG = () => (
  <svg width="33" height="26" viewBox="0 0 33 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.07606 16.4186C6.47402 15.3579 6.16336 14.2107 6.16406 13.0508C6.16406 8.58891 10.6622 4.97168 16.2115 4.97168C21.7608 4.97168 26.259 8.59011 26.259 13.052C26.2595 14.2115 25.9488 15.3583 25.347 16.4186" stroke="#A2CE3A" strokeWidth="1.50747" strokeLinecap="round"/>
    <path d="M16.2115 0.753906V1.95885M31.6692 12.8033H30.1234M2.29967 12.8033H0.753906M27.1401 4.28197L26.0472 5.13386M6.37585 5.13507L5.28299 4.28317M20.1022 21.6066C21.6635 21.2126 22.291 20.098 22.4673 18.9774C22.5198 18.6424 22.1658 18.3641 21.733 18.3641H10.7658C10.6601 18.3628 10.5553 18.379 10.4582 18.4116C10.3612 18.4442 10.2741 18.4926 10.2028 18.5534C10.1315 18.6142 10.0775 18.6862 10.0446 18.7645C10.0116 18.8427 10.0003 18.9256 10.0115 19.0075C10.1846 20.1257 10.6205 20.9439 12.2745 21.6066M20.1022 21.6066H12.2745M20.1022 21.6066C19.9152 23.9502 19.0465 24.878 16.2224 24.8515C13.2019 24.8949 12.5063 23.7478 12.2745 21.6066" stroke="#A2CE3A" strokeWidth="1.50747" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoCircleSVG = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5671 25.6273C20.2275 25.6273 25.6268 20.228 25.6268 13.5676C25.6268 6.90714 20.2275 1.50781 13.5671 1.50781C6.90665 1.50781 1.50732 6.90714 1.50732 13.5676C1.50732 20.228 6.90665 25.6273 13.5671 25.6273Z" stroke="#A2CE3A" strokeWidth="3.01494" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CancelRedSVG = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0597 13.7481L15.5571 17.2454C15.7781 17.4665 16.0595 17.5771 16.4012 17.5771C16.7429 17.5771 17.0243 17.4665 17.2454 17.2454C17.4665 17.0243 17.5771 16.7429 17.5771 16.4012C17.5771 16.0595 17.4665 15.7782 17.2454 15.5571L13.7481 12.0597L17.2454 8.56241C17.4665 8.34132 17.5771 8.05992 17.5771 7.71823C17.5771 7.37654 17.4665 7.09514 17.2454 6.87405C17.0243 6.65295 16.7429 6.54241 16.4012 6.54241C16.0595 6.54241 15.7781 6.65295 15.5571 6.87405L12.0597 10.3714L8.56241 6.87405C8.34132 6.65295 8.05992 6.54241 7.71823 6.54241C7.37654 6.54241 7.09514 6.65295 6.87405 6.87405C6.65295 7.09514 6.54241 7.37654 6.54241 7.71823C6.54241 8.05992 6.65295 8.34132 6.87405 8.56241L10.3714 12.0597L6.87405 15.5571C6.65295 15.7782 6.54241 16.0595 6.54241 16.4012C6.54241 16.7429 6.65295 17.0243 6.87405 17.2454C7.09514 17.4665 7.37654 17.5771 7.71823 17.5771C8.05992 17.5771 8.34132 17.4665 8.56241 17.2454L12.0597 13.7481ZM12.0597 24.1195C10.3915 24.1195 8.82371 23.8027 7.35644 23.1692C5.88917 22.5356 4.61285 21.6766 3.52747 20.592C2.4421 19.5074 1.58304 18.2311 0.950309 16.763C0.317575 15.295 0.000805509 13.7272 1.52655e-06 12.0597C-0.000802456 10.3923 0.315967 8.82451 0.950309 7.35644C1.58465 5.88837 2.44371 4.61205 3.52747 3.52747C4.61124 2.4429 5.88756 1.58385 7.35644 0.950307C8.82531 0.316769 10.3931 0 12.0597 0C13.7264 0 15.2942 0.316769 16.763 0.950307C18.2319 1.58385 19.5082 2.4429 20.592 3.52747C21.6758 4.61205 22.5352 5.88837 23.1704 7.35644C23.8055 8.82451 24.1219 10.3923 24.1195 12.0597C24.1171 13.7272 23.8003 15.295 23.1692 16.763C22.538 18.2311 21.679 19.5074 20.592 20.592C19.505 21.6766 18.2287 22.536 16.763 23.1704C15.2974 23.8047 13.7296 24.1211 12.0597 24.1195ZM12.0597 21.7075C14.7531 21.7075 17.0344 20.7729 18.9036 18.9036C20.7729 17.0344 21.7075 14.7531 21.7075 12.0597C21.7075 9.36639 20.7729 7.08509 18.9036 5.21584C17.0344 3.34658 14.7531 2.41195 12.0597 2.41195C9.36639 2.41195 7.08509 3.34658 5.21584 5.21584C3.34658 7.08509 2.41195 9.36639 2.41195 12.0597C2.41195 14.7531 3.34658 17.0344 5.21584 18.9036C7.08509 20.7729 9.36639 21.7075 12.0597 21.7075Z" fill="#FF5653"/>
  </svg>
);

const CheckCircleGreenSVG = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0597 0C18.7203 0 24.1195 5.39915 24.1195 12.0597C24.1195 18.7203 18.7203 24.1195 12.0597 24.1195C5.39915 24.1195 0 18.7203 0 12.0597C0 5.39915 5.39915 0 12.0597 0ZM12.0597 1.80896C9.34106 1.80896 6.73374 2.88895 4.81134 4.81134C2.88895 6.73374 1.80896 9.34106 1.80896 12.0597C1.80896 14.7784 2.88895 17.3857 4.81134 19.3081C6.73374 21.2305 9.34106 22.3105 12.0597 22.3105C14.7784 22.3105 17.3857 21.2305 19.3081 19.3081C21.2305 17.3857 22.3105 14.7784 22.3105 12.0597C22.3105 9.34106 21.2305 6.73374 19.3081 4.81134C17.3857 2.88895 14.7784 1.80896 12.0597 1.80896ZM10.5523 13.7963L15.943 8.40564C16.1046 8.2453 16.3207 8.15179 16.5482 8.14377C16.7757 8.13576 16.9979 8.21384 17.1704 8.36242C17.3428 8.51099 17.4529 8.71915 17.4787 8.94534C17.5045 9.17152 17.444 9.39911 17.3093 9.58267L17.2213 9.68397L11.1914 15.7138C11.0383 15.867 10.8353 15.9602 10.6193 15.9763C10.4033 15.9925 10.1886 15.9306 10.0144 15.8019L9.91311 15.7138L6.89817 12.6989C6.73783 12.5373 6.64432 12.3212 6.63631 12.0937C6.6283 11.8662 6.70637 11.644 6.85495 11.4715C7.00353 11.299 7.21168 11.1889 7.43787 11.1632C7.66406 11.1374 7.89164 11.1979 8.0752 11.3325L8.1765 11.4206L10.5523 13.7963Z" fill="#A2CE3A"/>
  </svg>
);

const ArrowLeftSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#054711" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Core Principle Card ─── */
function CorePrincipleCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-white font-mona-sans font-bold text-sm mb-1">{title}</h4>
        <p className="text-white/60 font-mona-sans text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─── Session Tip Item ─── */
function SessionTip({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 bg-[#FFFFFF0D] border border-white/10 rounded-[12px] px-4 py-3">
      <CheckCircleGreenSVG />
      <span className="text-white/80 font-mona-sans text-sm">{text}</span>
    </div>
  );
}

/* ─── Mistake Item ─── */
function MistakeItem({ title, fix }: { title: string; fix: string }) {
  return (
    <div className="bg-[#FFFFFF0D] border border-white/10 rounded-[12px] px-5 py-4">
      <div className="flex items-center gap-3 mb-1">
        <CancelRedSVG />
        <span className="text-white font-mona-sans font-bold text-sm">{title}</span>
      </div>
      <p className="text-white/50 font-mona-sans text-sm pl-10">
        <span className="text-[#A2CE3A] font-semibold">Fix:</span> {fix}
      </p>
    </div>
  );
}

/* ─── Main Page ─── */
export default function CoachingPracticesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B0D0F] relative overflow-hidden">
      {/* Background LooperGroup */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-20 pointer-events-none">
        <img src="/LooperGroup.svg" alt="" className="w-full h-full object-contain" />
      </div>

      <Navbar1 />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <CoachingPracticesSVG />
          <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mt-5">Coaching Best Practices</h1>
          <p className="text-white/50 font-mona-sans text-sm mt-2 max-w-[500px]">
            Master the art of interview coaching with these proven strategies and tips from our top-rated coaches.
          </p>
        </div>

        {/* ─── Core Principles ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <StarSVG />
            <h2 className="text-white font-mona-sans font-bold text-lg">Core Principles</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CorePrincipleCard
              icon={<KnowYourClientSVG />}
              title="Know Your Client"
              description="Before each session, review the client's background, goals, and any notes from previous sessions. Personalization makes a huge difference."
            />
            <CorePrincipleCard
              icon={<ActiveListeningSVG />}
              title="Active Listening"
              description="Give clients space to speak. Use clarifying questions and reflect back what you hear to show understanding."
            />
            <CorePrincipleCard
              icon={<SetClearObjectivesSVG />}
              title="Set Clear Objectives"
              description="Start each session by aligning on goals. What does the client want to achieve today? This keeps sessions focused and productive."
            />
            <CorePrincipleCard
              icon={<ManageTimeSVG />}
              title="Manage Time Effectively"
              description="Structure your sessions with a beginning, middle, and end. Leave 5 minutes for summary and next steps."
            />
          </div>
        </GlassCard>

        {/* ─── Session Tips ─── */}
        <GlassCard className="p-6 lg:p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <BulbSVG />
            <h2 className="text-white font-mona-sans font-bold text-lg">Session Tips</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SessionTip text="Start with a warm-up to build rapport" />
            <SessionTip text="Ask open-ended questions to encourage reflection" />
            <SessionTip text="Provide specific, actionable feedback" />
            <SessionTip text="Use the STAR method for behavioral coaching" />
            <SessionTip text="Record key takeaways for follow-up" />
            <SessionTip text="End with encouragement and clear action items" />
          </div>
        </GlassCard>

        {/* ─── Common Mistakes to Avoid ─── */}
        <GlassCard className="p-6 lg:p-8 mb-10">
          <div className="flex items-center gap-2 mb-5">
            <InfoCircleSVG />
            <h2 className="text-white font-mona-sans font-bold text-lg">Common Mistakes to Avoid</h2>
          </div>

          <div className="space-y-3">
            <MistakeItem title="Talking too much" fix="Let the client do 70% of the talking" />
            <MistakeItem title="Generic feedback" fix="Be specific and provide examples" />
            <MistakeItem title="Skipping preparation" fix="Review client info 10 min before each call" />
            <MistakeItem title="Overloading with advice" fix="Focus on 2-3 key improvements per session" />
          </div>
        </GlassCard>

        {/* ─── Back Button ─── */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/manage-your-profile")}
            className="flex items-center gap-2 px-10 py-3 rounded-[8px] font-mona-sans text-sm font-bold transition-colors cursor-pointer"
            style={{ backgroundColor: "#ECF8C7", color: "#054711" }}
          >
            <ArrowLeftSVG />
            Go Back To Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
