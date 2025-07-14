import { FC, useEffect, useState } from "react";

interface ToastProps {
  status: "success" | "error";
  message: string;
  show: boolean;
}

export const Toast: FC<ToastProps> = ({ status, message, show }) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!shouldRender) return null;

  return (
    <div className={`toast toast-${status} ${show ? "toast-show" : ""}`}>
      {message}
    </div>
  );
};
