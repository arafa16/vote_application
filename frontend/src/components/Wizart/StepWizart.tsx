import React from "react";
import Button from "../../base-components/Button";

const StepWizart = (props: any) => {
  const { button1, button2, button3, button4 } = props;

  return (
    <div className="w-full box py-4">
      <div className="relative before:hidden before:lg:block before:absolute before:w-[75%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-1">
        <div className="z-10 flex items-center flex-1 intro-x lg:text-center lg:block">
          {button1 ? (
            <Button variant="primary" className="w-10 h-10 rounded-full">
              1
            </Button>
          ) : (
            <Button className="w-10 h-10 rounded-full text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
              1
            </Button>
          )}
          <div className="ml-3 text-base lg:w-64 lg:mt-3 lg:mx-auto">
            Pilih Kandidat Pengawas
          </div>
        </div>
        <div className="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
          {button2 ? (
            <Button variant="primary" className="w-10 h-10 rounded-full">
              2
            </Button>
          ) : (
            <Button className="w-10 h-10 rounded-full text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
              2
            </Button>
          )}
          <div className="ml-3 text-base lg:w-64 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
            Pilih Kandidat Pengurus
          </div>
        </div>
        <div className="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
          {button3 ? (
            <Button variant="primary" className="w-10 h-10 rounded-full">
              3
            </Button>
          ) : (
            <Button className="w-10 h-10 rounded-full text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
              3
            </Button>
          )}
          <div className="ml-3 text-base lg:w-64 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
            Kirim Voting
          </div>
        </div>
        <div className="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
          {button4 ? (
            <Button variant="primary" className="w-10 h-10 rounded-full">
              4
            </Button>
          ) : (
            <Button className="w-10 h-10 rounded-full text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
              4
            </Button>
          )}
          <div className="ml-3 text-base lg:w-64 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
            Riwayat Voting
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepWizart;
