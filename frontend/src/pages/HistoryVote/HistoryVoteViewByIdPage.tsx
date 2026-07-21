import {
  GetVotingPeriodDatas,
  GetVotingPeriodNCommissionerNDirectorById,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Lucide from "../../base-components/Lucide";
import Alert from "../../base-components/Alert";
import CandidateVoteView from "../../components/DataView/CandidateVoteView";
import VotingPeriodForm from "../../components/Form/VotingPeriodForm";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import Button from "../../base-components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

const HistoryVoteViewByIdPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [votingPeriodDatas, setVotingPeriodDatas] = useState<any>(null);
  const [votingPeriodSelected, setVotingPeriodSelected] = useState<any>("");
  const [votingPeriodData, setVotingPeriodData] = useState<any>(null);
  const [commissionerVote, setCommissionerVote] = useState<any>(null);
  const [directorVote, setDirectorVote] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (votingPeriodDatas !== null) {
      const findData = votingPeriodDatas.find(
        (data: any) => data.uuid === votingPeriodSelected,
      );
      setVotingPeriodData(findData);
    }
  }, [votingPeriodSelected]);

  useEffect(() => {
    if (votingPeriodSelected !== "" && id !== null) {
      const paramsObj: any = {
        voting_period_uuid: votingPeriodSelected,
        user_uuid: id,
        is_validate: 1,
      };
      const searchParams = new URLSearchParams(paramsObj);
      dispatch(GetVotingPeriodNCommissionerNDirectorById(searchParams));
    } else {
      setDirectorVote(null);
      setCommissionerVote(null);
    }
  }, [votingPeriodSelected, id]);

  const {
    data: dataVotingPeriod,
    dataCommissionerDirector,
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
      dataCommissionerDirector !== null &&
      isSuccessVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      setDirectorVote(dataCommissionerDirector?.data?.director);
      setCommissionerVote(dataCommissionerDirector?.data?.commissioner);
      setUser(dataCommissionerDirector?.data?.user);
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
    dataCommissionerDirector,
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

  const handleBack = () => {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    navigate(`/vote_data?page=${page}&limit=${limit}`);
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[32px] text-primary font-bold mb-4">
              Riwayat Voting
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 col-start-1 md:col-start-10 mb-4">
          <VotingPeriodForm
            datas={votingPeriodDatas}
            dataSelect={votingPeriodSelected}
            handleChange={handleChangeVotingPeriod}
          />
        </div>
      </div>
      <div
        className={`grid grid-cols-12 my-2 ${commissionerVote === null || directorVote === null ? "" : "hidden"}`}
      >
        <div className="col-span-12">
          <Alert
            variant="soft-secondary"
            className="flex items-center justify-center gap-x-4 md:gap-x-8 mb-2"
          >
            <Lucide icon="Info" className="w-12 h-12" />
            <div>
              <p className="text-[14px] font-bold mb-1">
                Belum Ada Kandidat{" "}
                {commissionerVote === null || directorVote !== null
                  ? "Pengawas"
                  : ""}{" "}
                {commissionerVote === null && directorVote === null
                  ? "dan"
                  : ""}{" "}
                {commissionerVote !== null || directorVote === null
                  ? "Pengurus"
                  : ""}{" "}
                Yang Di Pilih
              </p>
              <p className="text-black">
                untuk memilih kandidat pengawas dan pengurus bisa melalui menu
                kandidat pengawas dan kandidat pengurus.
              </p>
            </div>
          </Alert>
        </div>
      </div>
      <div className={`grid grid-cols-12 mt-4 md:px-4`}>
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="capitalize text-[14px] md:text-[18px] text-gray-600 font-bold">
              Pilihan {user?.name}
            </p>
            <p className="text-[12px] md:text-[14px] mb-2 text-gray-600">
              Berikut adalah tim yang {user?.name} pilih untuk periode{" "}
              {votingPeriodData && votingPeriodData?.name}
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10 flex items-end justify-end py-4">
          <Button variant="outline-primary" onClick={handleBack}>
            Back to Status Voting Anggota Page
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div
          className={`col-span-12 md:col-span-6 ${commissionerVote === null ? "hidden" : ""} `}
        >
          <div
            className={`w-full bg-warning rounded-md py-2 px-4 mb-4 ${commissionerVote === null ? "hidden" : ""}`}
          >
            <p className="text-[14px] text-white">PILIHAN PENGAWAS</p>
          </div>
          <div>
            <div
              className={`mb-4 ${commissionerVote === null ? "hidden" : ""}`}
            >
              <CandidateVoteView
                data={commissionerVote?.commissioner_candidate}
                voting_period_uuid={votingPeriodData?.uuid}
                color="warning"
                view_button={false}
                is_check={true}
              />
            </div>
          </div>
          <hr className="my-8 border-t-2 border-gray-300"></hr>
        </div>
        <div
          className={`col-span-12 md:col-span-6 ${directorVote === null ? "hidden" : ""} `}
        >
          <div
            className={`w-full bg-primary rounded-md py-2 px-4 mb-4 ${directorVote === null ? "hidden" : ""}`}
          >
            <p className="text-[14px] text-white">PILIHAN PENGURUS</p>
          </div>
          <div>
            <div className={`mb-4 ${directorVote === null ? "hidden" : ""}`}>
              <CandidateVoteView
                data={directorVote?.director_candidate}
                user_uuid={meData?.uuid}
                voting_period_uuid={votingPeriodData?.uuid}
                color="primary"
                view_button={false}
                is_check={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-12 mb-24 md:mb-12 md:px-4 ${commissionerVote === null && directorVote === null ? "hidden" : ""}`}
      >
        <div className="col-span-12">
          <Alert variant="soft-primary" className="flex items-center mb-4">
            <Lucide icon="Info" className="w-10 h-10 mr-4" />
            <div>
              <p className="text-[14px] font-bold mb-1">Informasi</p>
              <p className="text-black">
                Anda dapat melihat melihat riwayat voting kapan saja melalui
                menu riwayat voting.
              </p>
            </div>
          </Alert>
        </div>
        <div className="col-span-12 grid grid-cols-12 gap-x-4">
          <div
            className={`col-span-12 md:col-span-6 ${commissionerVote === null ? "hidden" : ""}`}
          >
            <Alert variant="soft-secondary" className="flex items-center mb-4">
              <Lucide icon="Calendar" className="w-10 h-10 mr-4" />
              <div>
                <p className="text-[14px] font-bold mb-1">
                  Waktu Voting Pengawas
                </p>
                <p className="text-gray-600">
                  {commissionerVote?.vote_time &&
                    dayjs(commissionerVote?.vote_time).format(
                      "YYYY-MM-DD HH:mm:ss",
                    )}
                </p>
              </div>
            </Alert>
          </div>
          <div
            className={`col-span-12 md:col-span-6 ${directorVote === null ? "hidden" : ""}`}
          >
            <Alert variant="soft-secondary" className="flex items-center mb-4">
              <Lucide icon="Calendar" className="w-10 h-10 mr-4" />
              <div>
                <p className="text-[14px] font-bold mb-1">
                  Waktu Voting Pengurus
                </p>
                <p className="text-gray-600">
                  {directorVote?.vote_time &&
                    dayjs(new Date(directorVote?.vote_time)).format(
                      "YYYY-MM-DD HH:mm:ss",
                    )}
                </p>
              </div>
            </Alert>
          </div>
        </div>
        <div className="col-span-12 ">
          <Alert variant="soft-warning" className="flex items-center mb-2">
            <Lucide icon="Lock" className="w-10 h-10 mr-4" />
            <div>
              <p className="text-[14px] text-orange-800 mb-1">
                Data pilihan anda telah tercata dengan aman.
              </p>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default HistoryVoteViewByIdPage;
