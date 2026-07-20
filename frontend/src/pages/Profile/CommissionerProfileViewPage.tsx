import CandidateView from "../../components/DataView/CandidateView";
import {
  GetVotingPeriodDatas,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import {
  GetCommissionerCandidateDatas,
  resetCommissionerCandidate,
} from "../../stores/features/CommissionerCandidateSlice";
import { GetSliderDatas, resetSlider } from "../../stores/features/SliderSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Lucide from "../../base-components/Lucide";
import Alert from "../../base-components/Alert";
import VotingPeriodForm from "../../components/Form/VotingPeriodForm";
import TinySlider from "../../base-components/TinySlider";

const CommissionerProfileViewPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [votingPeriodDatas, setVotingPeriodDatas] = useState<any>(null);
  const [votingPeriodSelected, setVotingPeriodSelected] = useState<any>("");
  const [commissionerDatas, setCommissionerDatas] = useState([]);
  const [sliderDatas, setSliderDatas] = useState([]);

  const dispatch = useDispatch();

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
    data: dataSlider,
    isLoading: isLoadingSlider,
    isError: isErrorSlider,
    isSuccess: isSuccessSlider,
    message: messageSlider,
  } = useSelector((state: any) => state.slider);

  useEffect(() => {
    if (dataSlider !== null && isSuccessSlider && !isLoadingSlider) {
      setSliderDatas(dataSlider?.data);
      dispatch(resetSlider());
    } else if (messageSlider !== "" && isErrorSlider && !isLoadingSlider) {
      dispatch(resetSlider());
    }
  }, [
    dataSlider,
    isLoadingSlider,
    isErrorSlider,
    isSuccessSlider,
    messageSlider,
  ]);

  useEffect(() => {
    const paramsObj: any = { page_view: "beranda" };
    const searchParams = new URLSearchParams(paramsObj);
    dispatch(GetSliderDatas({ searchParams }));
  }, [dispatch]);

  const {
    data: dataVotingPeriod,
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

  useEffect(() => {
    if (
      dataCommissioner !== null &&
      isSuccessCommissioner &&
      !isLoadingCommissioner
    ) {
      setCommissionerDatas(dataCommissioner?.data);
      dispatch(resetCommissionerCandidate());
    } else if (
      messageCommissioner !== "" &&
      isErrorCommissioner &&
      !isLoadingCommissioner
    ) {
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
      handleCommissionerCandidate(dataVotingPeriod?.data[0]?.uuid);
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
    handleCommissionerCandidate(votingPeriodSelected);
  }, [votingPeriodSelected]);

  const handleChangeVotingPeriod = (e: any) => {
    setVotingPeriodSelected(e.target.value);
  };

  return (
    <div>
      <div className="w-full my-4 md:my-6">
        <div
          className={`h-full overflow-hidden rounded-md image-fit ${sliderDatas.length === 0 ? "hidden" : ""}`}
        >
          {sliderDatas.length !== 0 ? (
            <TinySlider
              options={{
                mode: "carousel",
                controls: false,
                nav: false,
                speed: 500,
              }}
            >
              {sliderDatas &&
                sliderDatas?.map((data: any, index: any) => (
                  <div className="h-20 md:h-64 w-full" key={index}>
                    <div className="h-full overflow-hidden rounded-md image-fit">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src={
                          import.meta.env.VITE_REACT_APP_API_URL +
                          data?.image_url
                        }
                      />
                    </div>
                  </div>
                ))}
            </TinySlider>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
      <div className={`grid grid-cols-12`}>
        <div className="box col-span-12 md:col-span-3 mb-4 px-4 py-4 flex items-center gap-x-2">
          <div className="mx-2">
            <Lucide
              icon="UserCheck"
              className="block mx-auto text-primary w-10 h-10"
            />
          </div>
          <div>
            <p className="text-[12px] mb-1">Selamat datang,</p>
            <p className="capitalize text-[14px] font-bold">{meData?.name}</p>
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
        className={`w-full ${votingPeriodSelected === "" ? "hidden" : ""} mb-4`}
      >
        <div className={`w-full bg-warning rounded-md py-2 px-4 mb-4`}>
          <p className="text-[14px] text-white">KANDIDAT PENGAWAS </p>
        </div>
        <div className="w-full">
          {commissionerDatas?.map((data, index) => (
            <div className="mb-4" key={index}>
              <CandidateView data={data} number={1} color="warning" />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`grid grid-cols-12 gap-x-2 mb-24 md:mb-12 ${votingPeriodSelected === "" ? "hidden" : ""}`}
      >
        <div className="col-span-12">
          <Alert variant="soft-primary" className="flex items-center mb-2">
            <Lucide icon="Shield" className="w-10 h-10 mr-4" />
            <div>
              <p className="text-[14px] font-bold mb-1">
                Pastikan Pilihan Anda
              </p>
              <p>
                Pelajari profil dan program kerja setiap anggota sebelum
                memberikan suara.
              </p>
              <p>Gunakan hak pilih Anda dengan bijak.</p>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default CommissionerProfileViewPage;
