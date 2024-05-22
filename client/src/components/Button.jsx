import React from "react";

const Button = ({
  children,
  variant = "default",
  onClick,
  disabled,
  type = "button",
  classes = "",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${classes} flex items-center gap-1 p-2 font-semibold rounded-md shadow transition disabled:cursor-not-allowed disabled:grayscale text-white 
                      ${
                        (variant === "default" || variant.trim() == "") &&
                        "bg-amber-500 hover:bg-amber-500/70"
                      }
                      ${
                        variant === "large" &&
                        " text-lg p-4 font-bold bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500"
                      }
                      ${
                        variant === "small" &&
                        "text-sm py-1 bg-amber-500 hover:bg-amber-500/70"
                      }
                      ${
                        variant === "secondary" &&
                        "text-zinc-900/85 bg-amber-500/35 transition hover:bg-amber-500/50"
                      }
                      ${
                        variant === "text" &&
                        "text-zinc-900 bg-transparent hover:bg-transparent hover:underline hover:text-zinc-900/90 shadow-none"
                      }
                      ${
                        variant === "action" &&
                        "text-zinc-800 bg-transparent hover:bg-amber-100 hover:text-zinc-800/70 shadow-none p-1 rounded-lg"
                      }
                      `}
    >
      {children}
    </button>
  );
};

export default Button;
