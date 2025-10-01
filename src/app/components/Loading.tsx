"use client";

export default function Loading() {
  return (
    <div className="w-full h-screen fixed left-0 top-0 z-50 flex items-center justify-center bg-background">
      <div
        className="relative rounded-full"
        style={{
          width: "150px",
          height: "150px",
          borderLeft: "5px solid #38ff8e",
          animation: "right5231 0.9s linear infinite",
        }}
      >
        {/* before */}
        <div
          className="absolute rounded-full"
          style={{
            width: "120px",
            height: "120px",
            top: "calc(50% - 60px)",
            left: "calc(50% - 60px)",
            borderRight: "5px solid #ffbe0b",
            animation: "left036 0.9s linear infinite",
          }}
        ></div>

        {/* after */}
        <div
          className="absolute rounded-full"
          style={{
            width: "90px",
            height: "90px",
            top: "calc(50% - 45px)",
            left: "calc(50% - 45px)",
            borderTop: "5px solid #ff086e",
          }}
        ></div>

        {/* keyframes */}
        <style jsx>{`
          @keyframes right5231 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes left036 {
            from {
              transform: rotate(720deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

