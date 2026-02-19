import { useEffect, useRef } from "react";
import "./Dialog.style.css";
import { IconClose } from "../icons";

export function Dialog({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [isOpen]);

  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  // "Close" button closes the dialog
  const closeDialog = () => {
    dialogRef.current.close();
  };

  return (
    <>
      <dialog ref={dialogRef} className="dialog-style">
        <div className="close-btn-area">
          <button autoFocus onClick={onClose} className="btn-close ">
            <IconClose />
          </button>
        </div>
        {children}
      </dialog>
    </>
  );
}
