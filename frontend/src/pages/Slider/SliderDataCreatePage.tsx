import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CreateSliderData,
  resetSlider,
} from "../../stores/features/SliderSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import SliderDataCreateForm from "../../components/Form/SliderDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const SliderDataCreatePage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    page_view: null,
    sequence: "",
    file: "",
    file_url: "",
  });

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
    data: dataSlider,
    isLoading: isLoadingSlider,
    isLoadingPatch: isLoadingPatchSlider,
    isError: isErrorSlider,
    isSuccess: isSuccessSlider,
    message: messageSlider,
    messagePatch: messagePatchSlider,
  } = useSelector((state: any) => state.slider);

  useEffect(() => {
    if (dataSlider !== null && isSuccessSlider && !isLoadingSlider) {
      dispatch(resetSlider());
    } else if (messageSlider !== "" && isErrorSlider && !isLoadingSlider) {
      dispatch(resetSlider());
    }

    if (messagePatchSlider !== "" && isSuccessSlider && !isLoadingPatchSlider) {
      navigate(`/slider/data/${messagePatchSlider?.data?.uuid}`);
      dispatch(resetSlider());
    } else if (
      messagePatchSlider !== "" &&
      isErrorSlider &&
      !isLoadingPatchSlider
    ) {
      dispatch(resetSlider());
    }
  }, [
    dataSlider,
    isLoadingSlider,
    isLoadingPatchSlider,
    isErrorSlider,
    isSuccessSlider,
    messageSlider,
    messagePatchSlider,
  ]);

  const handleSubmit = () => {
    const formDataSubmit = new FormData();
    formDataSubmit.append("page_view", formData?.page_view);
    formDataSubmit.append("sequence", formData?.sequence);
    formDataSubmit.append("file", formData?.file);
    dispatch(CreateSliderData({ formData: formDataSubmit }));
  };

  const handleBack = () => {
    navigate(`/slider`);
  };

  const chagePhoto = (e: any) => {
    const photo = e.target.files[0];

    if (!photo) return;

    const preview = URL.createObjectURL(photo);

    setFormData((prev: any) => ({
      ...prev,
      file: photo,
      file_url: preview,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-12 bg-slate-200 rounded px-2">
          <div className="col-span-12 md:col-span-2 py-1 text-[12px] text-primary">
            Create Commissioner Candidate
          </div>
          <div className="col-span-12 md:col-span-2 md:col-start-12 flex justify-end gap-4">
            <Button
              variant="outline-primary"
              className="py-1"
              onClick={handleBack}
            >
              Cancel
            </Button>
            <LoadingIcon
              icon="three-dots"
              className={`${isLoadingSlider ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingSlider ? "hidden" : ""} py-1`}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <SliderDataCreateForm
            formData={formData}
            setFormData={setFormData}
            chagePhoto={chagePhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderDataCreatePage;
