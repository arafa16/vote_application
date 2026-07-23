import {
  GetVotingPeriodDatas,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import {
  GetStatusVotingDashboardReport,
  resetStatusVoting,
} from "../../stores/features/StatusVotingSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import { useEffect, useState } from "react";
import UserVerificationStatusReport from "../../components/Report/UserVerificationStatusReport";
import VotingActivityOverviewReport from "../../components/Report/VotingActivityOverviewReport";
import VotingCommissionerOverviewReport from "../../components/Report/VotingCommissionerOverviewReport";
import VotingDirectorOverviewReport from "../../components/Report/VotingDirectorOverviewReport";
import ReportLineChart1 from "../../components/Report/VoterTrendReport";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VotingPeriodForm from "../../components/Form/VotingPeriodForm";

const DashboardPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [votingPeriodDatas, setVotingPeriodDatas] = useState<any>(null);
  const [votingPeriodSelected, setVotingPeriodSelected] = useState<any>("");

  console.log("meData", meData?.privilege?.dashboard_view_vote);

  //report
  const [dataReport, setDataReport] = useState<any>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: dataMe,
    isLoading: isLoadingMe,
    isError: isErrorMe,
    isSuccess: isSuccessMe,
    message: messageMe,
  } = useSelector((state: any) => state.getMe);

  useEffect(() => {
    if (dataMe !== null && isSuccessMe && !isLoadingMe) {
      setMeData(dataMe?.data?.user);
      dispatch(resetGetMe());
    } else if (messageMe !== "" && isErrorMe && !isLoadingMe) {
      dispatch(resetGetMe());
    }
  }, [dataMe, isLoadingMe, isErrorMe, isSuccessMe, messageMe]);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  const {
    data: dataVotingPeriod,
    isLoading: isLoadingVotingPeriod,
    isError: isErrorVotingPeriod,
    isSuccess: isSuccessVotingPeriod,
    message: messageVotingPeriod,
  } = useSelector((state: any) => state.votingPeriod);

  useEffect(() => {
    if (
      dataVotingPeriod !== null &&
      isSuccessVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      setVotingPeriodDatas(dataVotingPeriod?.data);
      setVotingPeriodSelected(dataVotingPeriod?.data[0]?.uuid);
      dispatch(resetVotingPeriod());
    } else if (
      messageVotingPeriod !== "" &&
      isErrorVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      dispatch(resetVotingPeriod());
    }
  }, [
    dataVotingPeriod,
    isLoadingVotingPeriod,
    isErrorVotingPeriod,
    isSuccessVotingPeriod,
    messageVotingPeriod,
  ]);

  useEffect(() => {
    dispatch(GetVotingPeriodDatas());
  }, [dispatch]);

  const handleChangeVotingPeriod = (e: any) => {
    setVotingPeriodSelected(e.target.value);
  };

  //get data voting
  const {
    data: dataStatusVoting,
    dataReport: dataReportStatusVoting,
    data_attribute: dataStatusVotingAttribute,
    isLoading: isLoadingStatusVoting,
    isLoadingReport: isLoadingReportStatusVoting,
    isError: isErrorStatusVoting,
    isSuccess: isSuccessStatusVoting,
    message: messageStatusVoting,
    messageReport: messageReportStatusVoting,
  } = useSelector((state: any) => state.statusVoting);

  useEffect(() => {
    if (
      dataReportStatusVoting !== null &&
      isSuccessStatusVoting &&
      !isLoadingReportStatusVoting
    ) {
      console.log("dataReportStatusVoting", dataReportStatusVoting);
      setDataReport(dataReportStatusVoting?.data);
      dispatch(resetStatusVoting());
    } else if (
      messageReportStatusVoting !== "" &&
      isErrorStatusVoting &&
      !isLoadingReportStatusVoting
    ) {
      console.log("messageReportStatusVoting", messageReportStatusVoting);
      dispatch(resetStatusVoting());
    }
  }, [
    dataReportStatusVoting,
    isLoadingReportStatusVoting,
    isErrorStatusVoting,
    isSuccessStatusVoting,
    messageReportStatusVoting,
  ]);

  useEffect(() => {
    const paramsObj: any = {
      voting_period_uuid: votingPeriodSelected,
    };
    const searchParams = new URLSearchParams(paramsObj);
    dispatch(GetStatusVotingDashboardReport(searchParams));
  }, [dispatch, votingPeriodSelected]);

  console.log("dataReport?.user_verification_status", dataReport);

  const viewReportUserVerified =
    dataReport?.user_verification_status?.verified_persent !== undefined &&
    dataReport?.user_verification_status?.unverified_persent !== undefined ? (
      <UserVerificationStatusReport
        className="relative z-10 mt-2"
        height={210}
        verified={dataReport?.user_verification_status?.verified_persent}
        unverified={dataReport?.user_verification_status?.unverified_persent}
      />
    ) : (
      <div></div>
    );

  const userActivityOverview =
    dataReport?.voting_activity_overview?.vote_persent !== undefined &&
    dataReport?.voting_activity_overview?.unvote_persent !== undefined ? (
      <VotingActivityOverviewReport
        className="relative z-10 mt-2"
        height={210}
        vote={dataReport?.voting_activity_overview?.vote_persent}
        unvote={dataReport?.voting_activity_overview?.unvote_persent}
      />
    ) : (
      <div></div>
    );

  const VotingCommissionerOverview =
    dataReport?.commissioner_vote?.labels !== undefined &&
    dataReport?.commissioner_vote?.vote_percent !== undefined ? (
      <VotingCommissionerOverviewReport
        className="relative z-10 mt-2"
        height={210}
        labels={dataReport?.commissioner_vote?.labels}
        data={dataReport?.commissioner_vote?.vote_percent}
        colors={dataReport?.commissioner_vote?.colors}
      />
    ) : (
      <div></div>
    );

  const VotingDirectorOverview =
    dataReport?.director_vote?.labels !== undefined &&
    dataReport?.director_vote?.vote_percent !== undefined ? (
      <VotingDirectorOverviewReport
        className="relative z-10 mt-2"
        height={210}
        labels={dataReport?.director_vote?.labels}
        data={dataReport?.director_vote?.vote_percent}
        colors={dataReport?.director_vote?.colors}
      />
    ) : (
      <div></div>
    );

  const voteTrendOverview =
    dataReport?.vote_trend?.labels !== undefined &&
    dataReport?.vote_trend?.total !== undefined ? (
      <ReportLineChart1
        height={280}
        lebels={dataReport?.vote_trend?.labels}
        total={dataReport?.vote_trend?.total}
      />
    ) : (
      <div></div>
    );

  console.log("votingPeriodSelected", votingPeriodSelected);
  return (
    <div>
      <div className={`grid grid-cols-12 mt-6 `}>
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[18px] mb-2 md:mb-2 text-primary">e-VOTING</p>
            <p className="capitalize text-[18px] md:text-[24px] text-primary font-bold mb-2">
              Dashboard
            </p>
            <p className="text-[12px] md:text-[14px] text-primary mb-2 md:mb-4">
              Disarankan view dashboard menggunakan tablet atau laptop.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 col-start-1 md:col-start-10 flex gap-x-2 mb-4">
          <VotingPeriodForm
            datas={votingPeriodDatas}
            dataSelect={votingPeriodSelected}
            handleChange={handleChangeVotingPeriod}
          />
        </div>
      </div>
      <div
        className={`${votingPeriodSelected === "" || votingPeriodSelected === undefined ? "hidden" : ""} grid grid-cols-12 gap-4 mb-24`}
      >
        {/* Populasi yang sudah aktivasi email */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <div className="w-full p-5 mt-4 intro-y box">
            <div className="items-center md:flex mb-5">
              <div className="mr-auto">
                <div className="flex items-center">
                  <div className="text-lg font-medium">
                    User Verification Status
                  </div>
                </div>
                <div className="mt-1 text-slate-500">Persent</div>
              </div>
            </div>
            <div className="relative px-3">
              <div className="w-50 mx-auto lg:w-auto">
                {viewReportUserVerified}
              </div>
              <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                <div className="text-2xl font-medium leading-7">
                  {dataReport?.user_verification_status?.verified_persent}%
                </div>
                <div className="mt-1 text-slate-500">
                  from {dataReport?.user_verification_status?.total} user
                </div>
              </div>
            </div>
            <div className="mx-auto mt-2 w-52 lg:w-auto lg:min-h-[100px]">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 mr-3 border rounded-full bg-secondary/50 border-secondary/50"></div>
                <span className="truncate">Unverified</span>
                <span className="ml-auto">
                  {dataReport?.user_verification_status?.unverified} User |{" "}
                  {dataReport?.user_verification_status?.unverified_persent}%
                </span>
              </div>
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 mr-3 border rounded-full bg-primary/50 border-primary/50"></div>
                <span className="truncate">Verified</span>
                <span className="ml-auto">
                  {dataReport?.user_verification_status?.verified} User |{" "}
                  {dataReport?.user_verification_status?.verified_persent}%
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Populasi Vote/No Vote */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <div className="w-full  p-5 mt-4 intro-y box">
            <div className="items-center md:flex mb-5">
              <div className="mr-auto">
                <div className="flex items-center">
                  <div className="text-lg font-medium">
                    Voting Activity Overview
                  </div>
                </div>
                <div className="mt-1 text-slate-500">Persent</div>
              </div>
            </div>
            <div className="relative px-3">
              <div className="w-50 mx-auto lg:w-auto">
                {userActivityOverview}
              </div>
              <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                <div className="text-2xl font-medium leading-7">
                  {dataReport?.voting_activity_overview?.vote_persent}%
                </div>
                <div className="mt-1 text-slate-500">
                  from {dataReport?.voting_activity_overview?.total} user
                </div>
              </div>
            </div>
            <div className="mx-auto mt-2 w-52 lg:w-auto lg:min-h-[100px]">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 mr-3 border rounded-full bg-secondary/50 border-secondary/50"></div>
                <span className="truncate">Unvote</span>
                <span className="ml-auto">
                  {dataReport?.voting_activity_overview?.unvote} user |{" "}
                  {dataReport?.voting_activity_overview?.unvote_persent}%
                </span>
              </div>
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 mr-3 border rounded-full bg-primary/50 border-primary/50"></div>
                <span className="truncate">Vote</span>
                <span className="ml-auto">
                  {dataReport?.voting_activity_overview?.vote} user |{" "}
                  {dataReport?.voting_activity_overview?.vote_persent}%
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Elections Percentage Pengawas */}
        <div
          className={`col-span-12 md:col-span-6 lg:col-span-3 ${meData?.privilege?.dashboard_view_vote ? "" : "hidden"}`}
        >
          <div className="w-full  p-5 mt-4 intro-y box">
            <div className="items-center md:flex mb-5">
              <div className="mr-auto">
                <div className="flex items-center">
                  <div className="text-lg font-medium">Voting Pengawas</div>
                </div>
                <div className="mt-1 text-slate-500">Persent</div>
              </div>
            </div>
            <div className="relative px-3">
              <div className="w-50 mx-auto lg:w-auto">
                {VotingCommissionerOverview}
              </div>
              <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                <div className="text-2xl font-medium leading-7">
                  {dataReport?.commissioner_vote?.voted_percent}%
                </div>
                <div className="mt-1 text-slate-500">
                  {dataReport?.commissioner_vote?.voted} voted from{" "}
                  {dataReport?.commissioner_vote?.total_user} user
                </div>
              </div>
            </div>
            <div className="mx-auto mt-2 w-52 lg:w-auto lg:h-[100px]">
              {dataReport?.commissioner_vote?.data?.map(
                (item: any, index: number) => (
                  <div className="flex items-center mb-3" key={index}>
                    <div
                      className={`w-2 h-2 mr-3 border rounded-full ${item?.color === "primary" ? `bg-${item?.color}/50 border-${item?.color}/50` : `bg-${item?.color} border-${item?.color}`} `}
                    ></div>
                    <span className="truncate">{item?.name}</span>
                    <span className="ml-auto">
                      {item?.total_vote} | {item?.vote_percent}%
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        {/* Elections Percentage Pengurus */}
        <div
          className={`col-span-12 md:col-span-6 lg:col-span-3 ${meData?.privilege?.dashboard_view_vote ? "" : "hidden"}`}
        >
          <div className="w-full  p-5 mt-4 intro-y box">
            <div className="items-center md:flex mb-5">
              <div className="mr-auto">
                <div className="flex items-center">
                  <div className="text-lg font-medium">Voting Pengurus</div>
                </div>
                <div className="mt-1 text-slate-500">Persent</div>
              </div>
            </div>
            <div className="relative px-3">
              <div className="w-50 mx-auto lg:w-auto">
                {VotingDirectorOverview}
              </div>
              <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                <div className="text-2xl font-medium leading-7">
                  {dataReport?.director_vote?.voted_percent}%
                </div>
                <div className="mt-1 text-slate-500">
                  {dataReport?.director_vote?.voted} voted from{" "}
                  {dataReport?.director_vote?.total_user} user
                </div>
              </div>
            </div>
            <div className="mx-auto mt-2 w-52 lg:w-auto lg:min-h-[100px]">
              {dataReport?.director_vote?.data?.map(
                (item: any, index: number) => (
                  <div className="flex items-center mb-3" key={index}>
                    <div
                      className={`w-2 h-2 mr-3 border rounded-full ${item?.color === "primary" ? `bg-${item?.color}/50 border-${item?.color}/50` : `bg-${item?.color} border-${item?.color}`} `}
                    ></div>
                    <span className="truncate">{item?.name}</span>
                    <span className="ml-auto">
                      {item?.total_vote} | {item?.vote_percent}%
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        {/* Vote Trend */}
        <div className="col-span-12">
          <div className="p-5 mt-12 intro-y box sm:mt-4">
            <div className="items-center md:flex">
              <div className="mr-auto">
                <div className="flex items-center">
                  <div className="text-lg font-medium">Voter Trend</div>
                </div>
                <div className="mt-1 text-slate-500">Komulatif</div>
              </div>
            </div>
            <div className="mt-6">{voteTrendOverview}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
