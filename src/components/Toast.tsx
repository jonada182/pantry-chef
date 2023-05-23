import React, { useEffect, useState } from "react";

type Props = {
  message: string;
  type: "success" | "error" | "neutral";
  className?: string;
  withTimeout?: boolean;
};

const getToastClasses = (type: string): string => {
  switch (type) {
    case "success":
      return "bg-green-500 text-white";
    case "error":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-200 text-gray-500";
  }
};

export const Toast = ({ type, message, className = ``, withTimeout = false }: Props) => {
  const [show, setShow] = useState(true);

  const toastClass = getToastClasses(type);

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
    <div className={`p-4 rounded-md ${toastClass} ${className && className}`}>
      {message}
    </div>
  ) : null;
};
