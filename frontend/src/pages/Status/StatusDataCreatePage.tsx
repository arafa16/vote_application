import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CreateStatusData,
  resetStatus,
} from "../../stores/features/StatusSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import StatusDataCreateForm from "../../components/Form/TempDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const StatusDataCreatePage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    sequence: "",
    code: "",
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
    data: dataStatus,
    isLoading: isLoadingStatus,
    isLoadingPatch: isLoadingPatchStatus,
    isError: isErrorStatus,
    isSuccess: isSuccessStatus,
    message: messageStatus,
    messagePatch: messagePatchStatus,
  } = useSelector((state: any) => state.status);

  useEffect(() => {
    if (dataStatus !== null && isSuccessStatus && !isLoadingStatus) {
      dispatch(resetStatus());
    } else if (messageStatus !== "" && isErrorStatus && !isLoadingStatus) {
      dispatch(resetStatus());
    }

    if (messagePatchStatus !== "" && isSuccessStatus && !isLoadingPatchStatus) {
      navigate(`/status/data/${messagePatchStatus?.data?.uuid}`);
      dispatch(resetStatus());
    } else if (
      messagePatchStatus !== "" &&
      isErrorStatus &&
      !isLoadingPatchStatus
    ) {
      dispatch(resetStatus());
    }
  }, [
    dataStatus,
    isLoadingStatus,
    isLoadingPatchStatus,
    isErrorStatus,
    isSuccessStatus,
    messageStatus,
    messagePatchStatus,
  ]);

  const handleSubmit = () => {
    dispatch(CreateStatusData({ formData }));
  };

  const handleBack = () => {
    navigate(`/status`);
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
            Create Status
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
              className={`${isLoadingStatus ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingStatus ? "hidden" : ""} py-1`}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <StatusDataCreateForm
            formData={formData}
            setFormData={setFormData}
            chagePhoto={chagePhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusDataCreatePage;
