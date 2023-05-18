import React, { useEffect, useState } from "react";

type Props = {
  message: string;
  type: "success" | "error";
  className?: string;
  withTimeout?: boolean;
};

export const Toast = ({ type, message, className = ``, withTimeout = false }: Props) => {
  const [show, setShow] = useState(true);

  const toastClass = type === "success" ? "bg-green-500" : "bg-red-500";

  useEffect(() => {
    if (withTimeout) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return show ? (
    <div className={`p-4 text-white rounded-md ${toastClass} ${className && className}`}>
      {message}
    </div>
  ) : null;
};
