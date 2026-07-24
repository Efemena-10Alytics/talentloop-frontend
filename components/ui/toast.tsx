"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={`fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] ${className || ""}`}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

export type ToastVariant = "default" | "success" | "error" | "warning" | "payment-due";

/* ─── Variant Icons ─── */

const SuccessIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="14" fill="#ACF0C5" />
    <path
      d="M14 8.3125C12.8751 8.3125 11.7755 8.64607 10.8402 9.27102C9.90489 9.89597 9.17591 10.7842 8.74544 11.8235C8.31496 12.8627 8.20233 14.0063 8.42179 15.1096C8.64124 16.2128 9.18292 17.2263 9.97833 18.0217C10.7737 18.8171 11.7872 19.3588 12.8904 19.5782C13.9937 19.7977 15.1373 19.685 16.1765 19.2546C17.2158 18.8241 18.104 18.0951 18.729 17.1598C19.3539 16.2245 19.6875 15.1249 19.6875 14C19.6859 12.4921 19.0862 11.0464 18.0199 9.98009C16.9536 8.91382 15.5079 8.31409 14 8.3125ZM16.497 12.997L13.4345 16.0595C13.3939 16.1002 13.3457 16.1325 13.2925 16.1545C13.2394 16.1765 13.1825 16.1878 13.125 16.1878C13.0675 16.1878 13.0106 16.1765 12.9575 16.1545C12.9044 16.1325 12.8561 16.1002 12.8155 16.0595L11.503 14.747C11.4209 14.6649 11.3748 14.5536 11.3748 14.4375C11.3748 14.3214 11.4209 14.2101 11.503 14.128C11.5851 14.0459 11.6964 13.9998 11.8125 13.9998C11.9286 13.9998 12.0399 14.0459 12.122 14.128L13.125 15.1315L15.878 12.378C15.9186 12.3373 15.9669 12.3051 16.02 12.2831C16.0731 12.2611 16.13 12.2498 16.1875 12.2498C16.245 12.2498 16.3019 12.2611 16.355 12.2831C16.4081 12.3051 16.4564 12.3373 16.497 12.378C16.5377 12.4186 16.5699 12.4669 16.5919 12.52C16.6139 12.5731 16.6252 12.63 16.6252 12.6875C16.6252 12.745 16.6139 12.8019 16.5919 12.855C16.5699 12.9081 16.5377 12.9564 16.497 12.997Z"
      fill="#359E5B"
    />
  </svg>
);

const ErrorIcon = () => {
  const id = React.useId();
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.6367 0C22.4187 0.000187603 28.7275 6.30878 28.7275 14.0908C28.7275 21.8729 22.4187 28.1814 14.6367 28.1816H14.0908C6.30866 28.1816 0 21.873 0 14.0908C4.79323e-05 6.3087 6.3087 4.99971e-05 14.0908 0H14.6367Z"
        fill="#FEE2E2"
      />
      <path
        d="M14.6367 0C22.4187 0.000187603 28.7275 6.30878 28.7275 14.0908C28.7275 21.8729 22.4187 28.1814 14.6367 28.1816H14.0908C6.30866 28.1816 0 21.873 0 14.0908C4.79323e-05 6.3087 6.3087 4.99971e-05 14.0908 0H14.6367Z"
        stroke="#E5E7EB"
      />
      <path d="M20.7275 23.1816H8V5H20.7275V23.1816Z" stroke="#E5E7EB" />
      <g clipPath={`url(#${id})`}>
        <path
          d="M14.3637 8.29535C14.7167 8.29535 15.0423 8.48178 15.2213 8.78754L20.5906 17.9353C20.7721 18.2435 20.7721 18.6238 20.5956 18.9321C20.4191 19.2403 20.0885 19.4317 19.733 19.4317H8.99438C8.63891 19.4317 8.3083 19.2403 8.13181 18.9321C7.95531 18.6238 7.9578 18.241 8.13678 17.9353L13.5061 8.78754C13.6851 8.48178 14.0107 8.29535 14.3637 8.29535ZM14.3637 11.4772C14.0331 11.4772 13.7671 11.7431 13.7671 12.0738V14.8578C13.7671 15.1885 14.0331 15.4544 14.3637 15.4544C14.6943 15.4544 14.9603 15.1885 14.9603 14.8578V12.0738C14.9603 11.7431 14.6943 11.4772 14.3637 11.4772ZM15.1592 17.0453C15.1592 16.8344 15.0753 16.6321 14.9262 16.4829C14.777 16.3337 14.5747 16.2499 14.3637 16.2499C14.1527 16.2499 13.9504 16.3337 13.8012 16.4829C13.652 16.6321 13.5682 16.8344 13.5682 17.0453C13.5682 17.2563 13.652 17.4586 13.8012 17.6078C13.9504 17.757 14.1527 17.8408 14.3637 17.8408C14.5747 17.8408 14.777 17.757 14.9262 17.6078C15.0753 17.4586 15.1592 17.2563 15.1592 17.0453Z"
          fill="#DC2626"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <path d="M8 7.49994H20.7273V20.2272H8V7.49994Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const WarningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="14" fill="#FFF5D8" />
    <path
      d="M19.9496 17.2862L15.1672 8.98082C15.0477 8.77734 14.8771 8.60862 14.6723 8.4914C14.4675 8.37417 14.2356 8.3125 13.9996 8.3125C13.7636 8.3125 13.5318 8.37417 13.327 8.4914C13.1221 8.60862 12.9515 8.77734 12.832 8.98082L8.04961 17.2862C7.93462 17.483 7.87402 17.7069 7.87402 17.9348C7.87402 18.1627 7.93462 18.3866 8.04961 18.5834C8.16759 18.7881 8.33791 18.9577 8.54309 19.0749C8.74827 19.192 8.98093 19.2525 9.21719 19.25H18.782C19.0181 19.2523 19.2505 19.1918 19.4555 19.0746C19.6605 18.9575 19.8306 18.7879 19.9485 18.5834C20.0637 18.3867 20.1245 18.1629 20.1247 17.9349C20.1248 17.707 20.0644 17.4831 19.9496 17.2862ZM13.5621 12.6875C13.5621 12.5715 13.6082 12.4602 13.6903 12.3782C13.7723 12.2961 13.8836 12.25 13.9996 12.25C14.1156 12.25 14.2269 12.2961 14.309 12.3782C14.391 12.4602 14.4371 12.5715 14.4371 12.6875V14.875C14.4371 14.9911 14.391 15.1023 14.309 15.1844C14.2269 15.2664 14.1156 15.3125 13.9996 15.3125C13.8836 15.3125 13.7723 15.2664 13.6903 15.1844C13.6082 15.1023 13.5621 14.9911 13.5621 14.875V12.6875ZM13.9996 17.5C13.8698 17.5 13.7429 17.4615 13.635 17.3894C13.5271 17.3173 13.443 17.2148 13.3933 17.0949C13.3436 16.975 13.3306 16.8431 13.356 16.7158C13.3813 16.5885 13.4438 16.4715 13.5356 16.3797C13.6273 16.288 13.7443 16.2255 13.8716 16.2001C13.9989 16.1748 14.1308 16.1878 14.2507 16.2375C14.3707 16.2872 14.4732 16.3713 14.5453 16.4792C14.6174 16.5871 14.6559 16.714 14.6559 16.8438C14.6559 17.0178 14.5867 17.1848 14.4636 17.3078C14.3406 17.4309 14.1737 17.5 13.9996 17.5Z"
      fill="#8C7B48"
    />
  </svg>
);

const PaymentDueIcon = () => {
  const id = React.useId();
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.5459 0C22.5789 0.000239658 29.0908 6.51282 29.0908 14.5459C29.0906 22.5788 22.5788 29.0906 14.5459 29.0908C6.51282 29.0908 0.000239672 22.5789 0 14.5459C0 6.51267 6.51267 0 14.5459 0Z"
        fill="#FEF3C7"
      />
      <path
        d="M14.5459 0C22.5789 0.000239658 29.0908 6.51282 29.0908 14.5459C29.0906 22.5788 22.5788 29.0906 14.5459 29.0908C6.51282 29.0908 0.000239672 22.5789 0 14.5459C0 6.51267 6.51267 0 14.5459 0Z"
        stroke="#E5E7EB"
      />
      <path d="M21.7051 23.6362H7.38672V5.45459H21.7051V23.6362Z" stroke="#E5E7EB" />
      <g clipPath={`url(#${id})`}>
        <path
          d="M8.97763 8.75C8.10014 8.75 7.38672 9.46342 7.38672 10.3409V11.1364H21.7049V10.3409C21.7049 9.46342 20.9915 8.75 20.114 8.75H8.97763ZM21.7049 13.5227H7.38672V18.2955C7.38672 19.1729 8.10014 19.8864 8.97763 19.8864H20.114C20.9915 19.8864 21.7049 19.1729 21.7049 18.2955V13.5227ZM10.1708 16.7045H11.7617C11.9805 16.7045 12.1594 16.8835 12.1594 17.1023C12.1594 17.321 11.9805 17.5 11.7617 17.5H10.1708C9.95206 17.5 9.77308 17.321 9.77308 17.1023C9.77308 16.8835 9.95206 16.7045 10.1708 16.7045ZM12.9549 17.1023C12.9549 16.8835 13.1339 16.7045 13.3526 16.7045H16.5344C16.7532 16.7045 16.9322 16.8835 16.9322 17.1023C16.9322 17.321 16.7532 17.5 16.5344 17.5H13.3526C13.1339 17.5 12.9549 17.321 12.9549 17.1023Z"
          fill="#D97706"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <path d="M7.38672 7.95459H21.7049V20.6819H7.38672V7.95459Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const VARIANT_CONFIG: Record<
  ToastVariant,
  { container: string; icon: React.ReactNode | null }
> = {
  default: {
    container: "bg-[#141619] border-white/10",
    icon: null,
  },
  success: {
    container: "bg-[#C7F5D8] border-[#34C759]",
    icon: <SuccessIcon />,
  },
  error: {
    container: "bg-[#FEE2E2] border-[#E5E7EB]",
    icon: <ErrorIcon />,
  },
  warning: {
    container: "bg-[#FFFBEB] border-[#FDE68A]",
    icon: <WarningIcon />,
  },
  "payment-due": {
    container: "bg-[#FEF3C7] border-[#E5E7EB]",
    icon: <PaymentDueIcon />,
  },
};

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
    variant?: ToastVariant;
  }
>(({ className, variant = "default", children, ...props }, ref) => {
  const { container, icon } = VARIANT_CONFIG[variant];

  return (
    <ToastPrimitives.Root
      ref={ref}
      data-variant={variant}
      className={`group pointer-events-auto relative flex w-[320px] max-w-[92vw] items-center gap-3 overflow-hidden rounded-[10.91px] border p-3 pr-8 shadow-lg transition-all min-h-16 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full ${
        container
      } ${className || ""}`}
      {...props}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">{children}</div>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={`inline-flex h-8 shrink-0 items-center justify-center rounded-[8px] border border-white/20 bg-transparent px-3 text-sm font-medium font-mona-sans text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#A2CE3A] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      className || ""
    }`}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={`absolute right-2 top-2 rounded-[6px] p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-data-[variant=default]:text-white/50 group-data-[variant=default]:hover:text-white group-data-[variant=success]:opacity-100 group-data-[variant=success]:text-[#359E5B] group-data-[variant=success]:hover:text-[#359E5B]/80 group-data-[variant=error]:opacity-100 group-data-[variant=error]:text-[#991B1B] group-data-[variant=error]:hover:text-[#991B1B]/80 group-data-[variant=warning]:opacity-100 group-data-[variant=warning]:text-[#8C7B48] group-data-[variant=warning]:hover:text-[#8C7B48]/80 group-data-[variant=payment-due]:opacity-100 group-data-[variant=payment-due]:text-[#92400E] group-data-[variant=payment-due]:hover:text-[#92400E]/80 ${
      className || ""
    }`}
    toast-close=""
    {...props}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={`text-sm font-medium font-mona-sans group-data-[variant=default]:text-white group-data-[variant=success]:text-[#359E5B] group-data-[variant=error]:text-[#991B1B] group-data-[variant=warning]:text-[#8C7B48] group-data-[variant=payment-due]:text-[#92400E] ${className || ""}`}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={`font-mona-sans group-data-[variant=default]:text-sm group-data-[variant=default]:text-white/70 group-data-[variant=success]:font-plus-jakarta group-data-[variant=success]:text-[12px] group-data-[variant=success]:font-normal group-data-[variant=success]:text-[#359E5B] group-data-[variant=error]:font-plus-jakarta group-data-[variant=error]:text-[12px] group-data-[variant=error]:font-normal group-data-[variant=error]:text-[#B91C1C] group-data-[variant=warning]:font-plus-jakarta group-data-[variant=warning]:text-[12px] group-data-[variant=warning]:font-normal group-data-[variant=warning]:text-[#8C7B48] group-data-[variant=payment-due]:font-plus-jakarta group-data-[variant=payment-due]:text-[12px] group-data-[variant=payment-due]:font-normal group-data-[variant=payment-due]:text-[#B45309] ${className || ""}`}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
