import { SITE_NAME } from "@/lib/seo";

export const ogImageSize = { width: 1200, height: 630 };

export function OgImageTemplate() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#01090B",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "48px",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "48px",
            backgroundColor: "#A2CE3A",
            borderRadius: "4px",
          }}
        />
        <span style={{ color: "#FFFFFF", fontSize: "36px", fontWeight: 700 }}>
          {SITE_NAME}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "56px",
          fontWeight: 700,
          lineHeight: 1.15,
          maxWidth: "980px",
        }}
      >
        <span style={{ color: "#FFFFFF" }}>You Don&apos;t Need More Applications.</span>
        <span style={{ color: "#A2CE3A" }}>You Need Better Positioning.</span>
      </div>
    </div>
  );
}
