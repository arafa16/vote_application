import fakerData from "../../utils/faker";
import CandidateView from "../../components/DataView/CandidateView";
import {
  GetVotingPeriodDatas,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import { GetSliderDatas, resetSlider } from "../../stores/features/SliderSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingIcon from "../../base-components/LoadingIcon";
import Lucide from "../../base-components/Lucide";
import Alert from "../../base-components/Alert";
import VotingPeriodForm from "../../components/Form/VotingPeriodForm";
import dayjs from "dayjs";
import Button from "../../base-components/Button";
import TinySlider from "../../base-components/TinySlider";

const VotingProcedureViewPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [votingPeriodDatas, setVotingPeriodDatas] = useState<any>(null);
  const [votingPeriodSelected, setVotingPeriodSelected] = useState<any>("");
  const [votingPeriodData, setVotingPeriodData] = useState<any>(null);
  const [sliderDatas, setSliderDatas] = useState([]);

  const dispatch = useDispatch();

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
    const paramsObj: any = { page_view: "voting_procedur" };
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

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[18px] mb-2 md:mb-4 text-primary">e-VOTING</p>
            <p className="capitalize text-[18px] text-primary mb-2">
              Selamat Datang,
            </p>
            <p className="capitalize text-[24px] md:text-[32px] text-primary font-bold mb-2 md:mb-4">
              Anggota KOPKARLA
            </p>
            <div className="text-[14px] text-primary">
              <p>Gunakan hak pilih anda dengan bijak.</p>
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
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6 flex gap-4 box px-4 py-4 bg-gray-200">
          <div>
            <Lucide icon="Calendar" className="w-10 h-10 mr-4" />
          </div>
          <div>
            <p className="text-[18px] mb-2">Masa Voting</p>
            <div className="md:flex gap-2 text-[12px]">
              <p>
                {votingPeriodData &&
                  dayjs(votingPeriodData?.start_date).format(
                    "YYYY-MM-DD HH:mm:ss",
                  )}
              </p>
              <p>-</p>
              <p>
                {votingPeriodData &&
                  dayjs(votingPeriodData?.end_date).format(
                    "YYYY-MM-DD HH:mm:ss",
                  )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex gap-4 box px-4 py-4 bg-gray-200">
          <div>
            <Lucide icon="Shield" className="w-10 h-10 mr-4" />
          </div>
          <div>
            <p className="text-[14px] md:text-[18px] font-bold mb-2">
              Aman, Rahasia dan Terpercaya
            </p>
            <p className="flex text-[12px]">Data Anda terlindungi</p>
          </div>
        </div>
      </div>
      <div className="w-full my-6">
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
                  <div className="h-20 md:h-64" key={index}>
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
      <div className="mb-4">
        <div className="flex items-center">
          <Lucide
            icon="BookOpen"
            className="w-5 h-5 md:w-10 md:h-10 mr-4 text-primary"
          />
          <p className="text-[14px] md:text-[18px] text-primary">
            Tata Cara Voting
          </p>
        </div>
      </div>
      <div className="px-5 sm:px-20 box py-10 bg-gray-100 mb-4">
        <div className="flex items-center intro-x gap-x-2 md:gap-x-8">
          <Button
            variant="primary"
            className="w-6 h-6 md:w-10 md:h-10 rounded-full"
          >
            1
          </Button>
          <Lucide
            icon="Monitor"
            className="w-10 h-10 text-primary hidden lg:block"
          />
          <div className="ml-3">
            <p className="text-base font-medium">Login</p>
            <p className="">Login Aplikasi e-Voting menggunakan akun Anda.</p>
          </div>
        </div>
        <div className="flex items-center mt-10 intro-x gap-x-2 md:gap-x-8">
          <Button
            variant="primary"
            className="w-6 h-6 md:w-10 md:h-10 rounded-full"
          >
            2
          </Button>
          <Lucide
            icon="FileText"
            className="w-10 h-10 text-primary hidden lg:block"
          />
          <div className="ml-3">
            <p className="text-base font-medium">
              Amati Profil Singkat, Visi dan Misi Kandidat Pengurus dan Pengawas
            </p>
            <p className="">
              Pelajari profil singkat, visi, dan misi kandidat Pengurus dan
              Pengawas pada menu Beranda sebelum memilih.
            </p>
          </div>
        </div>
        <div className="flex items-center mt-10 intro-x gap-x-2 md:gap-x-8">
          <Button
            variant="primary"
            className="w-6 h-6 md:w-10 md:h-10 rounded-full"
          >
            3
          </Button>
          <Lucide
            icon="Users"
            className="w-10 h-10 text-primary hidden lg:block"
          />
          <div className="ml-3">
            <p className="text-base font-medium">Pilih Kandidat Pengawas</p>
            <p className="">
              pilih salah satu kandidat pengawas yang anda anggap paling tepat.
            </p>
            <p>
              Anda hanya dapat memilih 1 kandidat dan tidak dapat merubah
              pilihan setelah memilih
            </p>
          </div>
        </div>
        <div className="flex items-center mt-10 intro-x gap-x-2 md:gap-x-8">
          <Button
            variant="primary"
            className="w-6 h-6 md:w-10 md:h-10 rounded-full"
          >
            4
          </Button>
          <Lucide
            icon="Users"
            className="w-10 h-10 text-primary hidden lg:block"
          />
          <div className="ml-3">
            <p className="text-base font-medium">Pilih Kandidat Pengurus</p>
            <p className="">
              Pilih salah satu kandidat pengurus yang anda anggap paling tepat.
            </p>
            <p>
              Anda hanya dapat memilih 1 kandidat dan tidak dapat merubah
              pilihan setelah memilih.
            </p>
          </div>
        </div>
        <div className="flex items-center mt-10 intro-x gap-x-2 md:gap-x-8">
          <Button
            variant="primary"
            className="w-6 h-6 md:w-10 md:h-10 rounded-full"
          >
            5
          </Button>
          <Lucide
            icon="Send"
            className="w-10 h-10 text-primary hidden lg:block"
          />
          <div className="ml-3">
            <p className="text-base font-medium">Kirim Voting</p>
            <p className="">
              Klik "Kirim Voting" untuk menyelesaikan proses voting.
            </p>
          </div>
        </div>
        <div className="flex items-center mt-10 intro-x gap-x-2 md:gap-x-8 mb-5">
          <Button
            variant="primary"
            className="w-6 h-6 md:w-10 md:h-10 rounded-full"
          >
            6
          </Button>
          <Lucide
            icon="CheckCircle"
            className="w-10 h-10 text-primary hidden lg:block"
          />
          <div className="ml-3">
            <p className="text-base font-medium">
              Pilihan Tercatat dan Selesai
            </p>
            <p className="">
              Setelah konfirmasi berhasil, pilihan Anda akan tercatat. Terima
              kasih, Anda telah menggunakan hak pilih Anda.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mb-24 md:mb-12">
        <div className="col-span-12">
          <Alert variant="soft-primary" className="flex items-center mb-4">
            <Lucide icon="Bell" className="w-10 h-10 mr-4" />
            <div>
              <p className="text-[14px] font-bold mb-1">Ingat</p>
              <p className="text-black">
                Pastikan Anda memahami tata cara di atas sebelum melakukan
                voting. Pilihan Anda menentukan masa depan KOPKARLA.
              </p>
            </div>
          </Alert>
        </div>
        <div className="col-span-12">
          <Alert variant="soft-warning" className="flex items-center mb-2">
            <Lucide icon="Lock" className="w-10 h-10 mr-4" />
            <div>
              <p className="text-[14px] text-black mb-1">
                KOPKARLA menjamin keamanan data dan kerahasiaan pilihan Anda.
              </p>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default VotingProcedureViewPage;
