import {
  GetVotingPeriodDatas,
  GetVotingPeriodNCommissionerNDirectorById,
  updateVotingPeriodNCommissionerNDirectorById,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
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

const VoteSendViewPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [votingPeriodDatas, setVotingPeriodDatas] = useState<any>(null);
  const [votingPeriodSelected, setVotingPeriodSelected] = useState<any>("");
  const [votingPeriodData, setVotingPeriodData] = useState<any>(null);
  const [commissionerVote, setCommissionerVote] = useState<any>(null);
  const [directorVote, setDirectorVote] = useState<any>(null);
  const [alertShow, setAlertShow] = useState(false);
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

  useEffect(() => {
    if (votingPeriodSelected !== "" && meData !== null) {
      const paramsObj: any = {
        voting_period_uuid: votingPeriodSelected,
        user_uuid: meData?.uuid,
        is_validate: 0,
      };
      const searchParams = new URLSearchParams(paramsObj);
      dispatch(GetVotingPeriodNCommissionerNDirectorById(searchParams));
    } else {
      setDirectorVote(null);
      setCommissionerVote(null);
    }
  }, [votingPeriodSelected, meData]);

  const {
    data: dataVotingPeriod,
    dataCommissionerDirector,
    isLoading: isLoadingVotingPeriod,
    isLoadingPatch: isLoadingPatchVotingPeriod,
    isError: isErrorVotingPeriod,
    isSuccess: isSuccessVotingPeriod,
    message: messageVotingPeriod,
    messageCommissionerDirector,
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
      setDataCheck({
        director_check: dataCommissionerDirector?.data?.director_check,
        commissioner_check: dataCommissionerDirector?.data?.commissioner_check,
      });
      dispatch(resetVotingPeriod());
    } else if (
      messageCommissionerDirector !== "" &&
      isSuccessVotingPeriod &&
      !isLoadingPatchVotingPeriod
    ) {
      navigate("/history_vote");
      dispatch(resetVotingPeriod());
    } else if (
      messageVotingPeriod !== "" &&
      isErrorVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      dispatch(resetVotingPeriod());
    } else if (
      messageCommissionerDirector !== "" &&
      isErrorVotingPeriod &&
      !isLoadingPatchVotingPeriod
    ) {
      dispatch(resetVotingPeriod());
    }
  }, [
    dataVotingPeriod,
    dataCommissionerDirector,
    isLoadingVotingPeriod,
    isLoadingPatchVotingPeriod,
    isErrorVotingPeriod,
    isSuccessVotingPeriod,
    messageVotingPeriod,
    messageCommissionerDirector,
  ]);

  useEffect(() => {
    dispatch(GetVotingPeriodDatas());
  }, [dispatch]);

  const handleChangeVotingPeriod = (e: any) => {
    setVotingPeriodSelected(e.target.value);
  };

  const handleSend = () => {
    const formData = {
      commissioner_vote_uuid: commissionerVote?.uuid,
      director_vote_uuid: directorVote?.uuid,
    };

    dispatch(
      updateVotingPeriodNCommissionerNDirectorById({
        uuid: votingPeriodSelected,
        formData,
      }),
    );
  };

  const handleBack = () => {
    navigate("/director_candidate");
  };

  const view_page =
    !isLoadingMe && !isLoadingVotingPeriod ? (
      <div>
        <div className="grid grid-cols-12 mt-6">
          <div className="col-span-12 md:col-span-8 py-4">
            <div className="grid gap-y-4">
              <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
              <p className="capitalize text-[32px] text-primary font-bold mb-4">
                Kirim Voting
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
          className={`grid grid-cols-12 my-2 ${dataCheck.director_check && dataCheck.commissioner_check ? "" : "hidden"} `}
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
          className={`grid grid-cols-12 my-2 ${commissionerVote === null || directorVote === null ? "hidden" : ""} `}
        >
          <div className="col-span-12">
            <Alert
              variant="soft-warning"
              className="flex items-center justify-center gap-x-4 md:gap-x-8 mb-2"
            >
              <Lucide icon="Send" className="w-12 h-12 text-orange-900" />
              <div>
                <p className="text-[14px] text-orange-900 font-bold mb-1">
                  Silahkan Kirim Pilihan Anda Dengan Klik Tombol "Kirim Voting".
                </p>
                <p className="text-danger">
                  Data pilihan anda belum valid sebelum Anda kirim.
                </p>
              </div>
            </Alert>
          </div>
          <div className={`col-span-12 ${alertShow ? "" : "hidden"}`}>
            <Alert
              variant="danger"
              className="flex justify-center items-center mb-2"
            >
              {({ dismiss }: { dismiss: () => void }) => (
                <>
                  <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" /> Data
                  Pilihan Anda Belum Lengkap
                  <Alert.DismissButton
                    type="button"
                    className="btn-close"
                    onClick={dismiss}
                    aria-label="Close"
                  >
                    <Lucide icon="X" className="w-4 h-4" />
                  </Alert.DismissButton>
                </>
              )}
            </Alert>
          </div>
        </div>
        <div
          className={`grid grid-cols-12 my-2 ${commissionerVote === null || directorVote === null ? "" : "hidden"} ${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""}`}
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
                  Yang Dipilih
                </p>
                <p className="text-black">
                  untuk memilih kandidat pengawas dan pengurus bisa melalui menu
                  kandidat pengawas dan kandidat pengurus.
                </p>
              </div>
            </Alert>
          </div>
        </div>
        <div
          className={`mb-4 ${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""}`}
        >
          <StepWizart button1={true} button2={true} button3={true} />
        </div>
        <div
          className={`grid grid-cols-12 mt-4 md:px-4 ${commissionerVote === null && directorVote === null ? "hidden" : ""}`}
        >
          <div className="col-span-12 md:col-span-8 py-4">
            <div className="grid gap-y-4">
              <p className="capitalize text-[14px] md:text-[24px] text-gray-600 font-bold">
                Ringkasan Pilihan Anda
              </p>
              <p className="text-[12px] md:text-[14px] mb-2 text-gray-600">
                Berikut adalah tim yang Anda pilih untuk periode{" "}
                {votingPeriodData && votingPeriodData?.name}
              </p>
            </div>
          </div>
        </div>
        <div className={`w-full mb-4 md:px-4`}>
          <div
            className={`w-full bg-primary rounded-md py-2 px-4 mb-4 ${commissionerVote === null && directorVote === null ? "hidden" : ""}`}
          >
            <p className="text-[14px] text-white">PILIHAN ANDA</p>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div
              className={`col-span-12 md:col-span-6 ${commissionerVote === null ? "hidden" : ""}`}
            >
              <CandidateVoteView
                data={commissionerVote?.commissioner_candidate}
                user_uuid={meData?.uuid}
                voting_period_uuid={votingPeriodData?.uuid}
                color="warning"
                view_button={false}
                is_check={true}
              />
            </div>
            <div
              className={`col-span-12 md:col-span-6 ${directorVote === null ? "hidden" : ""}`}
            >
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
        <div
          className={`w-full mb-24 ${dataCheck.director_check && dataCheck.commissioner_check ? "hidden" : ""}`}
        >
          <BackOrNextButton
            name_button="Kirim Voting"
            desc_next="Klik untuk menyelesaikan proses voting."
            next={handleSend}
            back={handleBack}
            icon_send="Send"
            is_loading_send={isLoadingPatchVotingPeriod}
            hide_next={
              commissionerVote === null || directorVote === null ? true : false
            }
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

export default VoteSendViewPage;
