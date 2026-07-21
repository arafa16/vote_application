import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import clsx from "clsx";
import _ from "lodash";

const VotingReport = (props: any) => {
  const { dataReport } = props;
  return (
    <div>
      <div
        className={clsx([
          "relative mt-12 intro-y sm:mt-4",
          "before:content-[''] before:w-[96%] before:shadow-[0px_3px_5px_#0000000b] before:h-full before:bg-slate-50 before:border before:border-slate-200 before:mt-3 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60",
        ])}
      >
        <div className="grid grid-cols-12 gap-0 py-0 divide-x divide-y box xl:py-5 xl:divide-y-0 divide-dashed divide-slate-200 dark:divide-white/5">
          <div
            className={clsx([
              "relative col-span-12 px-5 py-5 xl:py-0 sm:col-span-6 xl:col-span-3",
              "[&:not(:last-child)]:before:content-[''] [&:not(:last-child)]:before:hidden [&:not(:last-child)]:xl:before:block [&:not(:last-child)]:before:w-[13px] [&:not(:last-child)]:before:h-[12px] [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:rounded-full [&:not(:last-child)]:before:bg-slate-200 [&:not(:last-child)]:before:top-0 [&:not(:last-child)]:before:right-0 [&:not(:last-child)]:before:-mr-[7px] [&:not(:last-child)]:before:-mt-[25px] [&:not(:last-child)]:before:dark:bg-darkmode-500",
              "[&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:hidden [&:not(:last-child)]:xl:after:block [&:not(:last-child)]:after:w-[11px] [&:not(:last-child)]:after:h-[14px] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:rounded-full [&:not(:last-child)]:after:bg-slate-100 [&:not(:last-child)]:after:top-0 [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:-mr-[6px] [&:not(:last-child)]:after:-mt-[28px] [&:not(:last-child)]:after:dark:bg-darkmode-700",
              "[&:not(:last-child)>[data-content]]:before:content-[''] [&:not(:last-child)>[data-content]]:before:hidden [&:not(:last-child)>[data-content]]:xl:before:block [&:not(:last-child)>[data-content]]:before:w-[13px] [&:not(:last-child)>[data-content]]:before:h-[12px] [&:not(:last-child)>[data-content]]:before:absolute [&:not(:last-child)>[data-content]]:before:rounded-full [&:not(:last-child)>[data-content]]:before:bg-slate-200 [&:not(:last-child)>[data-content]]:before:bottom-0 [&:not(:last-child)>[data-content]]:before:right-0 [&:not(:last-child)>[data-content]]:before:-mr-[7px] [&:not(:last-child)>[data-content]]:before:-mb-[25px] [&:not(:last-child)>[data-content]]:before:dark:bg-darkmode-700/60",
              "[&:not(:last-child)>[data-content]]:after:content-[''] [&:not(:last-child)>[data-content]]:after:hidden [&:not(:last-child)>[data-content]]:xl:after:block [&:not(:last-child)>[data-content]]:after:w-[11px] [&:not(:last-child)>[data-content]]:after:h-[14px] [&:not(:last-child)>[data-content]]:after:absolute [&:not(:last-child)>[data-content]]:after:rounded-full [&:not(:last-child)>[data-content]]:after:bg-slate-50 [&:not(:last-child)>[data-content]]:after:bottom-0 [&:not(:last-child)>[data-content]]:after:right-0 [&:not(:last-child)>[data-content]]:after:-mr-[6px] [&:not(:last-child)>[data-content]]:after:-mb-[28px] [&:not(:last-child)>[data-content]]:after:dark:bg-darkmode-600",
            ])}
          >
            <div data-content>
              <div className="flex justify-start gap-8 px-4">
                <div className="flex items-center justify-center border rounded-full w-[3rem] h-[3rem] text-primary bg-primary/20 border-primary/20">
                  <Lucide className="w-[2rem] h-[2rem]" icon="Users" />
                </div>
                <div className="">
                  <div className="mb-1 text-primary leading-7 text-[14px]">
                    Total Anggota
                  </div>
                  <div className="flex items-center cursor-pointer text-primary text-[14px]">
                    {dataReport?.user_all?.total} Anggota |{" "}
                    {dataReport?.user_all?.persent}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx([
              "relative py-5 xl:py-0 px-5 sm:!border-t-0 col-span-12 sm:col-span-6 xl:col-span-3",
              "[&:not(:last-child)]:before:content-[''] [&:not(:last-child)]:before:hidden [&:not(:last-child)]:xl:before:block [&:not(:last-child)]:before:w-[13px] [&:not(:last-child)]:before:h-[12px] [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:rounded-full [&:not(:last-child)]:before:bg-slate-200 [&:not(:last-child)]:before:top-0 [&:not(:last-child)]:before:right-0 [&:not(:last-child)]:before:-mr-[7px] [&:not(:last-child)]:before:-mt-[25px] [&:not(:last-child)]:before:dark:bg-darkmode-500",
              "[&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:hidden [&:not(:last-child)]:xl:after:block [&:not(:last-child)]:after:w-[11px] [&:not(:last-child)]:after:h-[14px] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:rounded-full [&:not(:last-child)]:after:bg-slate-100 [&:not(:last-child)]:after:top-0 [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:-mr-[6px] [&:not(:last-child)]:after:-mt-[28px] [&:not(:last-child)]:after:dark:bg-darkmode-700",
              "[&:not(:last-child)>[data-content]]:before:content-[''] [&:not(:last-child)>[data-content]]:before:hidden [&:not(:last-child)>[data-content]]:xl:before:block [&:not(:last-child)>[data-content]]:before:w-[13px] [&:not(:last-child)>[data-content]]:before:h-[12px] [&:not(:last-child)>[data-content]]:before:absolute [&:not(:last-child)>[data-content]]:before:rounded-full [&:not(:last-child)>[data-content]]:before:bg-slate-200 [&:not(:last-child)>[data-content]]:before:bottom-0 [&:not(:last-child)>[data-content]]:before:right-0 [&:not(:last-child)>[data-content]]:before:-mr-[7px] [&:not(:last-child)>[data-content]]:before:-mb-[25px] [&:not(:last-child)>[data-content]]:before:dark:bg-darkmode-700/60",
              "[&:not(:last-child)>[data-content]]:after:content-[''] [&:not(:last-child)>[data-content]]:after:hidden [&:not(:last-child)>[data-content]]:xl:after:block [&:not(:last-child)>[data-content]]:after:w-[11px] [&:not(:last-child)>[data-content]]:after:h-[14px] [&:not(:last-child)>[data-content]]:after:absolute [&:not(:last-child)>[data-content]]:after:rounded-full [&:not(:last-child)>[data-content]]:after:bg-slate-50 [&:not(:last-child)>[data-content]]:after:bottom-0 [&:not(:last-child)>[data-content]]:after:right-0 [&:not(:last-child)>[data-content]]:after:-mr-[6px] [&:not(:last-child)>[data-content]]:after:-mb-[28px] [&:not(:last-child)>[data-content]]:after:dark:bg-darkmode-600",
            ])}
          >
            <div data-content>
              <div className="flex justify-start gap-8 px-4">
                <div className="flex items-center justify-center border rounded-full w-[3rem] h-[3rem] text-primary bg-primary/20 border-primary/20">
                  <Lucide className="w-[2rem] h-[2rem]" icon="Check" />
                </div>
                <div className="">
                  <div className="mb-1 text-primary leading-7 text-[14px]">
                    Sudah Voting
                  </div>
                  <div className="flex items-center cursor-pointer text-primary text-[14px]">
                    {dataReport?.voted_users?.total} Anggota |{" "}
                    {dataReport?.voted_users?.persent}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx([
              "relative col-span-12 px-5 py-5 xl:py-0 sm:col-span-6 xl:col-span-3",
              "[&:not(:last-child)]:before:content-[''] [&:not(:last-child)]:before:hidden [&:not(:last-child)]:xl:before:block [&:not(:last-child)]:before:w-[13px] [&:not(:last-child)]:before:h-[12px] [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:rounded-full [&:not(:last-child)]:before:bg-slate-200 [&:not(:last-child)]:before:top-0 [&:not(:last-child)]:before:right-0 [&:not(:last-child)]:before:-mr-[7px] [&:not(:last-child)]:before:-mt-[25px] [&:not(:last-child)]:before:dark:bg-darkmode-500",
              "[&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:hidden [&:not(:last-child)]:xl:after:block [&:not(:last-child)]:after:w-[11px] [&:not(:last-child)]:after:h-[14px] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:rounded-full [&:not(:last-child)]:after:bg-slate-100 [&:not(:last-child)]:after:top-0 [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:-mr-[6px] [&:not(:last-child)]:after:-mt-[28px] [&:not(:last-child)]:after:dark:bg-darkmode-700",
              "[&:not(:last-child)>[data-content]]:before:content-[''] [&:not(:last-child)>[data-content]]:before:hidden [&:not(:last-child)>[data-content]]:xl:before:block [&:not(:last-child)>[data-content]]:before:w-[13px] [&:not(:last-child)>[data-content]]:before:h-[12px] [&:not(:last-child)>[data-content]]:before:absolute [&:not(:last-child)>[data-content]]:before:rounded-full [&:not(:last-child)>[data-content]]:before:bg-slate-200 [&:not(:last-child)>[data-content]]:before:bottom-0 [&:not(:last-child)>[data-content]]:before:right-0 [&:not(:last-child)>[data-content]]:before:-mr-[7px] [&:not(:last-child)>[data-content]]:before:-mb-[25px] [&:not(:last-child)>[data-content]]:before:dark:bg-darkmode-700/60",
              "[&:not(:last-child)>[data-content]]:after:content-[''] [&:not(:last-child)>[data-content]]:after:hidden [&:not(:last-child)>[data-content]]:xl:after:block [&:not(:last-child)>[data-content]]:after:w-[11px] [&:not(:last-child)>[data-content]]:after:h-[14px] [&:not(:last-child)>[data-content]]:after:absolute [&:not(:last-child)>[data-content]]:after:rounded-full [&:not(:last-child)>[data-content]]:after:bg-slate-50 [&:not(:last-child)>[data-content]]:after:bottom-0 [&:not(:last-child)>[data-content]]:after:right-0 [&:not(:last-child)>[data-content]]:after:-mr-[6px] [&:not(:last-child)>[data-content]]:after:-mb-[28px] [&:not(:last-child)>[data-content]]:after:dark:bg-darkmode-600",
            ])}
          >
            <div data-content>
              <div className="flex justify-start gap-8 px-4">
                <div className="flex items-center justify-center border rounded-full w-[3rem] h-[3rem] text-primary bg-primary/20 border-primary/20">
                  <Lucide className="w-[2rem] h-[2rem]" icon="Clock" />
                </div>
                <div className="">
                  <div className="mb-1 text-primary leading-7 text-[14px]">
                    Belum Voting
                  </div>
                  <div className="flex items-center cursor-pointer text-primary text-[14px]">
                    {dataReport?.pending_users?.total} Anggota |{" "}
                    {dataReport?.pending_users?.persent}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx([
              "relative col-span-12 px-5 py-5 xl:py-0 sm:col-span-6 xl:col-span-3",
              "[&:not(:last-child)]:before:content-[''] [&:not(:last-child)]:before:hidden [&:not(:last-child)]:xl:before:block [&:not(:last-child)]:before:w-[13px] [&:not(:last-child)]:before:h-[12px] [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:rounded-full [&:not(:last-child)]:before:bg-slate-200 [&:not(:last-child)]:before:top-0 [&:not(:last-child)]:before:right-0 [&:not(:last-child)]:before:-mr-[7px] [&:not(:last-child)]:before:-mt-[25px] [&:not(:last-child)]:before:dark:bg-darkmode-500",
              "[&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:hidden [&:not(:last-child)]:xl:after:block [&:not(:last-child)]:after:w-[11px] [&:not(:last-child)]:after:h-[14px] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:rounded-full [&:not(:last-child)]:after:bg-slate-100 [&:not(:last-child)]:after:top-0 [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:-mr-[6px] [&:not(:last-child)]:after:-mt-[28px] [&:not(:last-child)]:after:dark:bg-darkmode-700",
              "[&:not(:last-child)>[data-content]]:before:content-[''] [&:not(:last-child)>[data-content]]:before:hidden [&:not(:last-child)>[data-content]]:xl:before:block [&:not(:last-child)>[data-content]]:before:w-[13px] [&:not(:last-child)>[data-content]]:before:h-[12px] [&:not(:last-child)>[data-content]]:before:absolute [&:not(:last-child)>[data-content]]:before:rounded-full [&:not(:last-child)>[data-content]]:before:bg-slate-200 [&:not(:last-child)>[data-content]]:before:bottom-0 [&:not(:last-child)>[data-content]]:before:right-0 [&:not(:last-child)>[data-content]]:before:-mr-[7px] [&:not(:last-child)>[data-content]]:before:-mb-[25px] [&:not(:last-child)>[data-content]]:before:dark:bg-darkmode-700/60",
              "[&:not(:last-child)>[data-content]]:after:content-[''] [&:not(:last-child)>[data-content]]:after:hidden [&:not(:last-child)>[data-content]]:xl:after:block [&:not(:last-child)>[data-content]]:after:w-[11px] [&:not(:last-child)>[data-content]]:after:h-[14px] [&:not(:last-child)>[data-content]]:after:absolute [&:not(:last-child)>[data-content]]:after:rounded-full [&:not(:last-child)>[data-content]]:after:bg-slate-50 [&:not(:last-child)>[data-content]]:after:bottom-0 [&:not(:last-child)>[data-content]]:after:right-0 [&:not(:last-child)>[data-content]]:after:-mr-[6px] [&:not(:last-child)>[data-content]]:after:-mb-[28px] [&:not(:last-child)>[data-content]]:after:dark:bg-darkmode-600",
            ])}
          >
            <div data-content>
              <div className="flex justify-start gap-8 px-4">
                <div className="flex items-center justify-center border rounded-full w-[3rem] h-[3rem] text-primary bg-primary/20 border-primary/20">
                  <Lucide className="w-[2rem] h-[2rem]" icon="PieChart" />
                </div>
                <div className="">
                  <div className="mb-1 text-primary leading-7 text-[14px]">
                    Verified
                  </div>
                  <div className="flex items-center cursor-pointer text-primary text-[14px]">
                    {dataReport?.user_is_verified?.total} Anggota |{" "}
                    {dataReport?.user_is_verified?.persent}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingReport;
