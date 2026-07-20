import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetApplicationById,
  UpdateApplicationData,
  resetApplication,
} from "../../stores/features/ApplicationSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationDataCreateForm from "../../components/Form/ApplicationDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const ApplicationDataEditPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    sequence: "",
    file: "",
    file_url: "",
  });

  const { id } = useParams();

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
    data: dataApplication,
    isLoading: isLoadingApplication,
    isLoadingPatch: isLoadingPatchApplication,
    isError: isErrorApplication,
    isSuccess: isSuccessApplication,
    message: messageApplication,
    messagePatch: messagePatchApplication,
  } = useSelector((state: any) => state.application);

  useEffect(() => {
    if (
      dataApplication !== null &&
      isSuccessApplication &&
      !isLoadingApplication
    ) {
      setFormData({
        ...formData,
        name: dataApplication?.data?.name,
        description: dataApplication?.data?.description,
        sequence: dataApplication?.data?.sequence,
      });
      dispatch(resetApplication());
    } else if (
      messageApplication !== "" &&
      isErrorApplication &&
      !isLoadingApplication
    ) {
      dispatch(resetApplication());
    }

    if (
      messagePatchApplication !== "" &&
      isSuccessApplication &&
      !isLoadingPatchApplication
    ) {
      navigate(`/application/data/${id}`);
      dispatch(resetApplication());
    } else if (
      messagePatchApplication !== "" &&
      isErrorApplication &&
      !isLoadingPatchApplication
    ) {
      dispatch(resetApplication());
    }
  }, [
    dataApplication,
    isLoadingApplication,
    isLoadingPatchApplication,
    isErrorApplication,
    isSuccessApplication,
    messageApplication,
    messagePatchApplication,
  ]);

  const handleSubmit = () => {
    const formDataSubmit = new FormData();
    formDataSubmit.append("name", formData?.name);
    formDataSubmit.append("description", formData?.description);
    formDataSubmit.append("sequence", formData?.sequence);
    formDataSubmit.append("file", formData?.file);
    dispatch(UpdateApplicationData({ uuid: id, formData: formDataSubmit }));
  };

  useEffect(() => {
    dispatch(GetApplicationById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/application/data/${id}`);
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
            Edit Application
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
              className={`${isLoadingApplication ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingApplication ? "hidden" : ""} py-1`}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <ApplicationDataCreateForm
            formData={formData}
            setFormData={setFormData}
            chagePhoto={chagePhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationDataEditPage;
