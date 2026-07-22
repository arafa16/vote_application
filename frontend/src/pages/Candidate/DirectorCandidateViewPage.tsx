import {
  GetVotingPeriodDatas,
  GetVotingPeriodById,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import {
  GetDirectorCandidateDatas,
  resetDirectorCandidate,
} from "../../stores/features/DirectorCandidateSlice";
import {
  CreateDirectorVoteData,
  GetDirectorVoteByUserNPeriod,
  resetDirectorVote,
} from "../../stores/features/DirectorVoteSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Lucide from "../../base-components/Lucide";
import Alert from "../../base-components/Alert";
import CandidateVoteView from "../../components/DataView/CandidateVoteView";
import VotingPeriodForm from "../../components/Form/VotingPeriodForm";
import StepWizart from "../../components/Wizart/StepWizart";
import BackOrNextButton from "../../components/ButtonCustom/BackOrNextButton";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../base-components/LoadingIcon";

const DirectorCandidateViewPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [votingPeriodDatas, setVotingPeriodDatas] = useState<any>(null);
  const [votingPeriodSelected, setVotingPeriodSelected] = useState<any>("");
  const [directorDatas, setDirectorData] = useState([]);
  const [votingPeriodData, setVotingPeriodData] = useState<any>(null);
  const [directorVoteData, setDirectorVoteData] = useState<any>(null);
  const [dataCheck, setDataCheck] = useState({
    director_check: false,
    commissioner_check: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (votingPeriodDatas !== null) {
      const findData = votingPeriodDatas.find(
        (data: any) => data.uuid === votingPeriodSelected,
      );
      setVotingPeriodData(findData);
    } else {
      setVotingPeriodData(null);
    }
  }, [votingPeriodSelected]);

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
    dataById: dataVotingPeriodById,
    isLoading: isLoadingVotingPeriod,
    isError: isErrorVotingPeriod,
    isSuccess: isSuccessVotingPeriod,
    message: messageVotingPeriod,
  } = useSelector((state: any) => state.votingPeriod);

  const {
    data: dataDirector,
    isLoading: isLoadingDirector,
    isError: isErrorDirector,
    isSuccess: isSuccessDirector,
    message: messageDirector,
  } = useSelector((state: any) => state.directorCandidate);

  const {
    data: dataDirectorVote,
    dataUserNPeriod: dataUserNPeriodDirectorVote,
    isLoading: isLoadingDirectorVote,
    isLoadingPatch: isLoadingPatchDirectorVote,
    isError: isErrorDirectorVote,
    isSuccess: isSuccessDirectorVote,
    message: messageDirectorVote,
    messagePatch: messagePatchDirectorVote,
  } = useSelector((state: any) => state.directorVote);

  useEffect(() => {
    if (
      messagePatchDirectorVote !== "" &&
      isSuccessDirectorVote &&
      !isLoadingPatchDirectorVote
    ) {
      handleGetDirectorVoteByUserNPeriod(meData, votingPeriodData);
      dispatch(resetDirectorVote());
    } else if (
      dataUserNPeriodDirectorVote &&
      isSuccessDirectorVote &&
      !isLoadingDirectorVote
    ) {
      setDirectorVoteData(
        dataUserNPeriodDirectorVote?.data?.director_candidate,
      );
      //check
      setDataCheck({
        director_check: dataUserNPeriodDirectorVote?.data_check?.director_check,
        commissioner_check:
          dataUserNPeriodDirectorVote?.data_check?.commissioner_check,
      });
      dispatch(resetDirectorVote());
    } else if (
      messageDirectorVote !== "" &&
      isErrorDirectorVote &&
      !isLoadingDirectorVote
    ) {
      dispatch(resetDirectorVote());
    }
  }, [
    dataDirectorVote,
    dataUserNPeriodDirectorVote,
    isLoadingDirectorVote,
    isErrorDirectorVote,
    isSuccessDirectorVote,
    messageDirectorVote,
    isLoadingPatchDirectorVote,
    messagePatchDirectorVote,
  ]);

  useEffect(() => {
    if (dataDirector !== null && isSuccessDirector && !isLoadingDirector) {
      setDirectorData(dataDirector?.data);
      dispatch(resetDirectorCandidate());
    } else if (
      messageDirector !== "" &&
      isErrorDirector &&
      !isLoadingDirector
    ) {
      dispatch(resetDirectorCandidate());
    }
  }, [
    dataDirector,
    isLoadingDirector,
    isErrorDirector,
    isSuccessDirector,
    messageDirector,
  ]);

  function handleDirectorCandidate(voting_period_uuid: any) {
    const paramsObj: any = { voting_period_uuid };
    const searchParams = new URLSearchParams(paramsObj);
    dispatch(GetDirectorCandidateDatas({ searchParams }));
  }

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
    if (
      dataVotingPeriodById !== null &&
      isSuccessVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      handleDirectorCandidate(dataVotingPeriodById?.data?.uuid);
      dispatch(resetVotingPeriod());
    } else if (
      messageVotingPeriod !== "" &&
      isErrorVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      dispatch(resetVotingPeriod());
    }
  }, [
    dataVotingPeriodById,
    isLoadingVotingPeriod,
    isErrorVotingPeriod,
    isSuccessVotingPeriod,
    messageVotingPeriod,
  ]);

  useEffect(() => {
    dispatch(GetVotingPeriodDatas());
  }, [dispatch]);

  useEffect(() => {
    if (votingPeriodSelected === "") {
      setDirectorData([]);
    } else {
      dispatch(GetVotingPeriodById(votingPeriodSelected));
    }
  }, [votingPeriodSelected]);

  const handleChangeVotingPeriod = (e: any) => {
    setVotingPeriodSelected(e.target.value);
  };

  const handleClickVote = (props: any) => {
    // voting_period_uuid, user_uuid, candidate_uuid
    const datas = {
      voting_period_uuid: props.voting_period_uuid,
      user_uuid: props.user_uuid,
      director_candidate_uuid: props.candidate_uuid,
    };
    dispatch(CreateDirectorVoteData(datas));
  };

  //after choose candidate

  const handleGetDirectorVoteByUserNPeriod = (
    meData: any,
    votingPeriodData: any,
  ) => {
    if (meData !== null && votingPeriodData !== null) {
      dispatch(
        GetDirectorVoteByUserNPeriod({
          user_uuid: meData?.uuid,
          voting_period_uuid: votingPeriodData?.uuid,
        }),
      );
    }
  };

  useEffect(() => {
    handleGetDirectorVoteByUserNPeriod(meData, votingPeriodData);
  }, [meData, votingPeriodData]);

  const handleNext = () => {
    navigate("/vote_send");
  };

  const handleBack = () => {
    navigate("/commissioner_candidate");
  };

  const view_page =
    !isLoadingMe && !isLoadingDirector && !isLoadingVotingPeriod ? (
      <div>
        <div className="grid grid-cols-12 mt-4">
          <div className="col-span-12 md:col-span-8 py-4">
            <div className="grid gap-y-4">
              <p className="text-[18px] mb-4 text-primary">e-VOTING</p>
              <p className="capitalize text-[24px] md:text-[32px] text-primary font-bold mb-4">
                {dataCheck.director_check && dataCheck.commissioner_check
                  ? "Hak Pilih Sudah Anda Sudah Terpakai"
                  : "Pilih 1 Kandidat Pengurus"}
              </p>
              <div
                className={`${(dataCheck.director_check && dataCheck.commissioner_check) || votingPeriodSelected === "" || votingPeriodSelected === undefined ? "hidden" : ""} grid gap-y-2 md:gap-y-4 text-[14px] text-primary`}
              >
                <p>
                  Pilih 1 kandidat pengurus dari {directorDatas?.length} calon
                  yang tersedia.
                </p>
                <p>
                  Klik tombol "Pilih Kandidat" pada flyer kandidat yang anda
                  pilih.
                </p>
              </div>
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
          className={`${dataCheck.director_check && dataCheck.commissioner_check && votingPeriodSelected !== "" && votingPeriodSelected === undefined ? "" : "hidden"} grid grid-cols-12 my-2`}
        >
          <div className="col-span-12">
            <Alert
              variant="soft-primary"
              className="flex items-center justify-center gap-x-4 md:gap-x-8 mb-2"
            >
              <Lucide icon="CheckCircle" className="w-12 h-12 text-primary" />
              <div>
                <p className="text-[14px] font-bold mb-1">
                  Anda Telah Menggunakan Hak Pilih Pengurus dan Pengawas.
                </p>
                <p className="text-[14px] text-black mb-1">
                  Silahkan Check Laman Riwayat Voting.
                </p>
              </div>
            </Alert>
          </div>
        </div>
        <div
          className={`${(dataCheck.director_check && dataCheck.commissioner_check) || votingPeriodSelected === "" || votingPeriodSelected === undefined ? "hidden" : ""} grid grid-cols-12 my-2`}
        >
          <div className="col-span-12">
            <Alert variant="soft-primary" className="flex items-center mb-2">
              <Lucide icon="Info" className="w-10 h-10 mr-4" />
              <div>
                <p className="text-[14px] font-bold mb-1">Informasi</p>
                <p>Anda hanya dapat memilih 1 kandidat pengurus.</p>
                <p>Pastikan pilihan anda sudah sesuai sebelum melanjutkan.</p>
              </div>
            </Alert>
          </div>
        </div>
        <div
          className={`${(dataCheck.director_check && dataCheck.commissioner_check) || votingPeriodSelected === "" || votingPeriodSelected === undefined ? "hidden" : ""} mb-4`}
        >
          <StepWizart button1={true} button2={true} button3={false} />
        </div>
        <div
          className={`w-full ${(dataCheck.director_check && dataCheck.commissioner_check) || votingPeriodSelected === undefined || votingPeriodSelected === "" ? "hidden" : ""} mb-4`}
        >
          <div className={`w-full bg-primary rounded-md py-2 px-4 mb-4`}>
            <p className="text-[14px] text-white">KANDIDAT PENGURUS </p>
          </div>
          <div
            className={`grid grid-cols-12 gap-4 ${directorVoteData !== null ? "hidden" : ""}`}
          >
            {directorDatas?.map((data, index) => (
              <div className="col-span-12 md:col-span-6" key={index}>
                <CandidateVoteView
                  data={data}
                  user_uuid={meData?.uuid}
                  voting_period_uuid={votingPeriodData?.uuid}
                  color="primary"
                  view_button={true}
                  handleClick={handleClickVote}
                  is_loading={isLoadingDirectorVote}
                />
              </div>
            ))}
          </div>
          <div
            className={`grid grid-cols-12 gap-4 ${directorVoteData !== null ? "" : "hidden"}`}
          >
            <div className="col-span-12 md:col-span-6">
              <CandidateVoteView
                data={directorVoteData}
                user_uuid={meData?.uuid}
                voting_period_uuid={votingPeriodData?.uuid}
                color="primary"
                view_button={false}
                is_check={true}
                is_loading={isLoadingDirectorVote}
              />
            </div>
          </div>
        </div>
        <div
          className={`${(dataCheck.director_check && dataCheck.commissioner_check) || votingPeriodSelected === "" || votingPeriodSelected === undefined ? "hidden" : ""} grid grid-cols-12 gap-x-2 mb-4`}
        >
          <div className="col-span-12">
            <Alert variant="soft-warning" className="flex items-center mb-2">
              <Lucide icon="Bell" className="w-10 h-10 mr-4" />
              <div>
                <p className="text-[14px] font-bold mb-1">Ingat</p>
                <p className="text-black">
                  Pastikan Anda telah memilih 1 kandidat pengurus.
                </p>
              </div>
            </Alert>
          </div>
        </div>
        <div
          className={`${(dataCheck.director_check && dataCheck.commissioner_check) || votingPeriodSelected === "" || votingPeriodSelected === undefined ? "hidden" : ""} w-full mb-24`}
        >
          <BackOrNextButton
            name_button="Selanjutnya"
            desc_next="Menu Kirim Voting"
            next={handleNext}
            back={handleBack}
            icon_send="ArrowRight"
          />
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center mt-8">
        <LoadingIcon icon="three-dots" />
      </div>
    );

  return view_page;
};

export default DirectorCandidateViewPage;
