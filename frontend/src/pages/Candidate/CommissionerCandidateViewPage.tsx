import {
  GetVotingPeriodDatas,
  GetVotingPeriodById,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import {
  GetCommissionerCandidateDatas,
  resetCommissionerCandidate,
} from "../../stores/features/CommissionerCandidateSlice";
import {
  CreateCommissionerVoteData,
  GetCommissionerVoteByUserNPeriod,
  resetCommissionerVote,
} from "../../stores/features/CommissionerVoteSlice";
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

const CommissionerCandidateViewPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [votingPeriodDatas, setVotingPeriodDatas] = useState<any>(null);
  const [votingPeriodSelected, setVotingPeriodSelected] = useState<any>("");
  const [commissionerDatas, setCommissionerData] = useState([]);
  const [votingPeriodData, setVotingPeriodData] = useState<any>(null);
  const [commisionerVoteData, setCommissionerVoteData] = useState<any>(null);
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
    data: dataCommissioner,
    isLoading: isLoadingCommissioner,
    isError: isErrorCommissioner,
    isSuccess: isSuccessCommissioner,
    message: messageCommissioner,
  } = useSelector((state: any) => state.commissionerCandidate);

  const {
    data: dataCommissionerVote,
    dataUserNPeriod: dataUserNPeriodCommissionerVote,
    isLoading: isLoadingCommissionerVote,
    isLoadingPatch: isLoadingPatchCommissionerVote,
    isError: isErrorCommissionerVote,
    isSuccess: isSuccessCommissionerVote,
    message: messageCommissionerVote,
    messagePatch: messagePatchCommissionerVote,
  } = useSelector((state: any) => state.commissionerVote);

  useEffect(() => {
    if (
      messagePatchCommissionerVote !== "" &&
      isSuccessCommissionerVote &&
      !isLoadingPatchCommissionerVote
    ) {
      handleGetCommissionerVoteByUserNPeriod(meData, votingPeriodData);
      dispatch(resetCommissionerVote());
    } else if (
      dataUserNPeriodCommissionerVote &&
      isSuccessCommissionerVote &&
      !isLoadingCommissionerVote
    ) {
      setCommissionerVoteData(
        dataUserNPeriodCommissionerVote?.data?.commissioner_candidate,
      );
      //check
      setDataCheck({
        director_check:
          dataUserNPeriodCommissionerVote?.data_check?.director_check,
        commissioner_check:
          dataUserNPeriodCommissionerVote?.data_check?.commissioner_check,
      });
      dispatch(resetCommissionerVote());
    } else if (
      messageCommissionerVote !== "" &&
      isErrorCommissionerVote &&
      !isLoadingPatchCommissionerVote
    ) {
      dispatch(resetCommissionerVote());
    } else if (
      messageCommissionerVote !== "" &&
      isErrorCommissionerVote &&
      !isLoadingCommissionerVote
    ) {
      dispatch(resetCommissionerVote());
    }
  }, [
    dataCommissionerVote,
    dataUserNPeriodCommissionerVote,
    isLoadingCommissionerVote,
    isLoadingPatchCommissionerVote,
    isErrorCommissionerVote,
    isSuccessCommissionerVote,
    messageCommissionerVote,
    messagePatchCommissionerVote,
  ]);

  useEffect(() => {
    if (
      dataCommissioner !== null &&
      isSuccessCommissioner &&
      !isLoadingCommissioner
    ) {
      setCommissionerData(dataCommissioner?.data);
      dispatch(resetCommissionerCandidate());
    } else if (
      messageCommissioner !== "" &&
      isErrorCommissioner &&
      !isLoadingCommissioner
    ) {
      setCommissionerData([]);
      dispatch(resetCommissionerCandidate());
    }
  }, [
    dataCommissioner,
    isLoadingCommissioner,
    isErrorCommissioner,
    isSuccessCommissioner,
    messageCommissioner,
  ]);

  function handleCommissionerCandidate(voting_period_uuid: any) {
    const paramsObj: any = { voting_period_uuid };
    const searchParams = new URLSearchParams(paramsObj);
    dispatch(GetCommissionerCandidateDatas({ searchParams }));
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
    dispatch(GetVotingPeriodDatas());
  }, [dispatch]);

  useEffect(() => {
    if (
      dataVotingPeriodById !== null &&
      isSuccessVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      handleCommissionerCandidate(dataVotingPeriodById?.data?.uuid);
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
    if (votingPeriodSelected === "") {
      setCommissionerData([]);
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
      commissioner_candidate_uuid: props.candidate_uuid,
    };
    dispatch(CreateCommissionerVoteData(datas));
  };

  //after choose candidate

  const handleGetCommissionerVoteByUserNPeriod = (
    meData: any,
    votingPeriodData: any,
  ) => {
    if (meData !== null && votingPeriodData !== null) {
      dispatch(
        GetCommissionerVoteByUserNPeriod({
          user_uuid: meData?.uuid,
          voting_period_uuid: votingPeriodData?.uuid,
        }),
      );
    }
  };

  useEffect(() => {
    handleGetCommissionerVoteByUserNPeriod(meData, votingPeriodData);
  }, [meData, votingPeriodData]);

  const handleNext = () => {
    navigate("/director_candidate");
  };

  const handleBack = () => {
    navigate("/");
  };

  const view_page =
    !isLoadingVotingPeriod &&
    !isLoadingCommissioner &&
    !isLoadingMe &&
    !isLoadingCommissionerVote ? (
      <div>
        <div className="grid grid-cols-12 mt-4">
          <div className="col-span-12 md:col-span-8 py-4">
            <div className="grid gap-y-2 md:gap-y-4">
              <p className="text-[18px] mb-4 text-primary">e-VOTING</p>
              <p className="capitalize text-[18px] md:text-[24px] text-primary font-bold mb-4">
                {dataCheck.director_check && dataCheck.commissioner_check
                  ? "Hak Pilih Sudah Anda Sudah Terpakai"
                  : "Pilih 1 Kandidat Pengawas"}
              </p>
              <div
                className={`${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""} grid gap-y-2 md:gap-y-4 text-[14px] text-primary`}
              >
                <p>
                  Pilih 1 kandidat pengawas dari {commissionerDatas?.length}{" "}
                  calon yang tersedia.
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
          className={`${dataCheck.director_check && dataCheck.commissioner_check ? "" : "hidden"} grid grid-cols-12 my-2`}
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
          className={`${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""} grid grid-cols-12 my-2`}
        >
          <div className="col-span-12">
            <Alert variant="soft-primary" className="flex items-center mb-2">
              <Lucide icon="Info" className="w-10 h-10 mr-4" />
              <div>
                <p className="text-[14px] font-bold mb-1">Informasi</p>
                <p>
                  Anda wajib memilih tepat 1 kandidat sebelum lanjut ke pemilih
                  Pengurus.
                </p>
                <p>Pastikan pilihan anda sudah sesuai sebelum melanjutkan.</p>
              </div>
            </Alert>
          </div>
        </div>
        <div
          className={`${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""} mb-4`}
        >
          <StepWizart button1={true} button2={false} button3={false} />
        </div>
        <div
          className={`w-full ${votingPeriodSelected === "" ? "hidden" : ""} ${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""} mb-4`}
        >
          <div className={`w-full bg-warning rounded-md py-2 px-4 mb-4`}>
            <p className="text-[14px] text-white">KANDIDAT PENGAWAS </p>
          </div>
          <div
            className={`grid grid-cols-12 gap-4 ${commisionerVoteData !== null ? "hidden" : ""}`}
          >
            {commissionerDatas?.map((data, index) => (
              <div className="col-span-12 md:col-span-6" key={index}>
                <CandidateVoteView
                  data={data}
                  user_uuid={meData?.uuid}
                  voting_period_uuid={votingPeriodData?.uuid}
                  color="warning"
                  view_button={true}
                  handleClick={handleClickVote}
                  is_loading={isLoadingPatchCommissionerVote}
                />
              </div>
            ))}
          </div>
          <div
            className={`grid grid-cols-12 gap-4 ${commisionerVoteData !== null ? "" : "hidden"}`}
          >
            <div className="col-span-12 md:col-span-6">
              <CandidateVoteView
                data={commisionerVoteData}
                user_uuid={meData?.uuid}
                voting_period_uuid={votingPeriodData?.uuid}
                color="warning"
                view_button={false}
                is_check={true}
                is_loading={isLoadingPatchCommissionerVote}
              />
            </div>
          </div>
        </div>
        <div
          className={`${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""} grid grid-cols-12 gap-x-2 mb-4`}
        >
          <div className="col-span-12">
            <Alert variant="soft-warning" className="flex items-center mb-2">
              <Lucide icon="Bell" className="w-10 h-10 mr-4" />
              <div>
                <p className="text-[14px] font-bold mb-1">Ingat</p>
                <p className="text-black">
                  Pastikan Anda memilih tepat 1 kandidat dari salah satu
                  kandidat pengawas sebelum melanjutkan.
                </p>
              </div>
            </Alert>
          </div>
        </div>
        <div
          className={`${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""} w-full mb-24`}
        >
          <BackOrNextButton
            name_button="Selanjutnya"
            desc_next="Pemilihan Pengurus"
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

export default CommissionerCandidateViewPage;
