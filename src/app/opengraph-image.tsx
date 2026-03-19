import { ImageResponse } from "next/og"

export const alt = "Govind Gupta"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px",
        background: "#000000",
        color: "#ffffff",
        fontFamily:
          '"Cascadia Code", ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          lineHeight: 1,
        }}
      >
        Govind Gupta
      </div>
      <div
        style={{
          marginTop: 20,
          fontSize: 30,
          color: "#f5f5f5",
        }}
      >
        Full Stack Developer
      </div>
      <div
        style={{
          marginTop: 20,
          fontSize: 24,
          color: "#888888",
        }}
      >
        govindgupta.me
      </div>
    </div>,
    size
  )
}
