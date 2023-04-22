import React, { ReactNode, useEffect, useRef } from "react";
import { X as CloseIcon } from "react-feather";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

export const Modal = ({ show, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
      <div ref={modalRef} className="bg-white w-full max-w-lg mx-auto rounded shadow-lg p-6 z-50">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-gray-900 transition">
            <CloseIcon/>
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
