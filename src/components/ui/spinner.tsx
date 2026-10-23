import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/sharon-elephant-logo.jpg"
        alt="Loading"
        style={{
          width: "1em",
          height: "1em",
          borderRadius: "50%",
          objectFit: "cover",
          animation: "elephantSpin 1s ease-in-out infinite",
          border: "1.5px solid #ffc107",
        }}
      />
      <style>{`
        @keyframes elephantSpin {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(0.78); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export { Spinner }
