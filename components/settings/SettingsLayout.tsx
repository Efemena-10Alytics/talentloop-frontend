"use client";

import { ReactNode } from "react";

interface SettingsLayoutProps {
  children: ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="bg-[#141619] min-h-screen -m-6 lg:-m-8 p-6 lg:p-8">
      <h1 className="text-white font-mona-sans font-bold text-3xl mb-6">Settings</h1>
      {children}
    </div>
  );
}

interface SettingsCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SettingsCard({ title, children, className = "" }: SettingsCardProps) {
  return (
    <div className={`bg-[#0B0D0F] border border-white/10 rounded-[16px] p-6 ${className}`}>
      {title && <h3 className="text-white font-mona-sans font-bold text-lg mb-5">{title}</h3>}
      {children}
    </div>
  );
}

interface TabNavProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-2.5 rounded-[10px] font-mona-sans font-medium text-sm transition-colors ${
            activeTab === tab.id
              ? "bg-[#A2CE3A] text-black"
              : "bg-[#1E1F21] text-white/70 hover:bg-[#252628] hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}

export function FormInput({ label, placeholder, value, onChange, type = "text", className = "" }: FormInputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-white font-mona-sans text-sm font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none placeholder:text-white/30 focus:border-[#A2CE3A] transition-colors"
      />
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  helperText?: string;
}

export function FormTextarea({ label, placeholder, value, onChange, rows = 4, helperText }: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white font-mona-sans text-sm font-semibold">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="px-4 py-3 rounded-[10px] border border-white/10 bg-[#FFFFFF0D] text-white font-mona-sans text-sm outline-none placeholder:text-white/30 focus:border-[#A2CE3A] transition-colors resize-none"
      />
      {helperText && <p className="text-white/50 font-mona-sans text-xs">{helperText}</p>}
    </div>
  );
}

interface ActionButtonsProps {
  onCancel?: () => void;
  onSave?: () => void;
  cancelText?: string;
  saveText?: string;
}

export function ActionButtons({ onCancel, onSave, cancelText = "Cancel", saveText = "Save Changes" }: ActionButtonsProps) {
  const SaveIconSVG = () => (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8135 17.5871H2.76369C2.03071 17.5871 1.32776 17.2959 0.809466 16.7777C0.291174 16.2594 0 15.5564 0 14.8234V2.76369C0 2.03071 0.291174 1.32776 0.809466 0.809466C1.32776 0.291173 2.03071 0 2.76369 0H10.301C10.5009 0.000175923 10.6924 0.0797023 10.8337 0.221095L15.3561 4.77365C15.4975 4.91486 15.577 5.10645 15.5772 5.30628V14.8234C15.5772 15.5564 15.286 16.2594 14.7677 16.7777C14.2494 17.2959 13.5464 17.5871 12.8135 17.5871ZM2.76369 1.50747C2.43052 1.50747 2.11099 1.63982 1.87541 1.87541C1.63982 2.11099 1.50747 2.43052 1.50747 2.76369V14.8234C1.50747 15.1566 1.63982 15.4761 1.87541 15.7117C2.11099 15.9473 2.43052 16.0797 2.76369 16.0797H12.8135C13.1466 16.0797 13.4662 15.9473 13.7018 15.7117C13.9373 15.4761 14.0697 15.1566 14.0697 14.8234V5.58768L9.98948 1.50747H2.76369Z" fill="#0F4F3A"/>
      <path d="M12.562 16.8336H11.0545V10.5524H4.52216V16.8336H3.01469V10.3012C3.01469 9.96803 3.14704 9.6485 3.38263 9.41292C3.61821 9.17733 3.93774 9.04498 4.27091 9.04498H11.3058C11.6389 9.04498 11.9585 9.17733 12.194 9.41292C12.4296 9.6485 12.562 9.96803 12.562 10.3012V16.8336ZM8.26067 5.52755H4.30106C4.13081 5.52624 3.96249 5.4914 3.8057 5.42503C3.64891 5.35866 3.50674 5.26206 3.38728 5.14074C3.26783 5.01943 3.17345 4.87577 3.10952 4.71797C3.04559 4.56017 3.01336 4.39133 3.01469 4.22108V0.753906H4.52216V4.02009H8.03958V0.753906H9.54705V4.22108C9.54837 4.39133 9.51615 4.56017 9.45222 4.71797C9.38829 4.87577 9.2939 5.01943 9.17445 5.14074C9.055 5.26206 8.91282 5.35866 8.75604 5.42503C8.59925 5.4914 8.43092 5.52624 8.26067 5.52755Z" fill="#0F4F3A"/>
    </svg>
  );

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={onCancel}
        className="px-8 py-3 bg-[#E8F5D0] hover:bg-[#d9ebc1] text-black font-mona-sans font-semibold text-sm rounded-[10px] transition-colors"
      >
        {cancelText}
      </button>
      <button
        onClick={onSave}
        className="px-8 py-3 bg-[#A2CE3A] hover:bg-[#8fb832] text-black font-mona-sans font-semibold text-sm rounded-[10px] transition-colors flex items-center gap-2"
      >
        <SaveIconSVG />
        {saveText}
      </button>
    </div>
  );
}
