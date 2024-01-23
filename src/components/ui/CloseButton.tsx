import React from "react";
import { ICloseButton } from "@/types/types";
import closeIcon from "../../../public/close-icon.png";
import Image from "next/image";

// CloseButton component definition with props
const CloseButton: React.FC<ICloseButton> = ({ handleClose }) => {
  // Rendering the close button component
  return (
    <button
      className="w-[30px] h-[30px] absolute top-[10px] right-[5px] cursor-pointer"
      onClick={handleClose} // Handler for click event passed as a prop
    >
      <Image
        className="object-cover w-[20px] h-[20px]"
        src={closeIcon}
        alt="close icon"
      />
    </button>
  );
};

export default CloseButton;
