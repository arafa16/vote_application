import React from "react";
import Lucide from "../../base-components/Lucide";
import LoadingIcon from "../../base-components/LoadingIcon";

const BackOrNextButton = (props: any) => {
  const {
    name_button,
    desc_next,
    next,
    back,
    icon_send,
    hide_next,
    is_loading_send,
  } = props;
  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      <div
        className="col-span-12 md:col-span-6 box flex justify-center items-center py-2 gap-x-4 cursor-pointer hover:bg-primary/10"
        onClick={back}
      >
        <Lucide icon="ArrowLeft" className="text-primary w-5 h-5" />
        <p className="text-primary text-[12px] md:text-[18px]">Kembali</p>
      </div>
      <div
        className={`${is_loading_send ? "" : "hidden"} col-span-6 flex justify-center items-center`}
      >
        <LoadingIcon icon="three-dots" className="w-8 h-8" color="#003a5c" />
      </div>
      <div
        className={`${hide_next || is_loading_send ? "hidden" : ""} col-span-12 md:col-span-6 box flex justify-center items-center py-2 gap-x-4 cursor-pointer hover:bg-primary/10`}
        onClick={next}
      >
        <div className="text-center">
          <p
            className={`text-primary text-[12px] md:text-[18px] ${desc_next === undefined ? "" : "mb-2"} `}
          >
            {name_button}
          </p>
          <p
            className={`text-primary text-[12px] md:text-[12px] ${desc_next !== undefined ? "" : "hidden"}`}
          >
            {desc_next}
          </p>
        </div>
        <Lucide icon={icon_send} className="text-primary w-5 h-5" />
      </div>
    </div>
  );
};

export default BackOrNextButton;
