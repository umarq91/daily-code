import { ReactNode } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

function TitleButtons({ className, onClick, children }: Props) {
  return (
    <div
      onClick={onClick}
      className={`bg-red-400 p-14 flex justify-center 
        text-center items-center cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

export default TitleButtons;
