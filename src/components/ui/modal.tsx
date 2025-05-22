import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      console.log(e.key);

      if (e.key === "Escape") {
        console.log("escape key pressed");
        setIsModalOpen(false);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      console.log("modal cleanup");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isModalOpen ? (
        createPortal(
          <div
            role="dialog"
            aria-labelledby="modal-title"
            className="w-full h-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-[50%] p-2 bg-(--background) flex flex-col items-center gap-2 border-1 border-(--border) rounded-lg">
              <p
                id="modal-title"
                className="text-2xl text-(--foreground) font-semibold mb-4"
              >
                {title}
              </p>
              <div>{children}</div>
              {footer && <div>{footer}</div>}
            </div>
          </div>,
          document.getElementById("root")!
        )
      ) : (
        <></>
      )}
    </>
  );
};
