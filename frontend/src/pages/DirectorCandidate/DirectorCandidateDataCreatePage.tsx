import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetCreateAttribute,
  CreateDirectorCandidateData,
  resetDirectorCandidate,
} from "../../stores/features/DirectorCandidateSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import CandidateDataCreateForm from "../../components/Form/CandidateDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const DirectorCandidateDataCreatePage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [attributes, setAttributes] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    voting_period_uuid: null,
    name: "",
    vision: "",
    mission: "",
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
    data: dataDirectorCandidate,
    isLoading: isLoadingDirectorCandidate,
    isLoadingPatch: isLoadingPatchDirectorCandidate,
    isError: isErrorDirectorCandidate,
    isSuccess: isSuccessDirectorCandidate,
    message: messageDirectorCandidate,
    messagePatch: messagePatchDirectorCandidate,
  } = useSelector((state: any) => state.directorCandidate);

  useEffect(() => {
    if (
      dataDirectorCandidate !== null &&
      isSuccessDirectorCandidate &&
      !isLoadingDirectorCandidate
    ) {
      setAttributes(dataDirectorCandidate?.data);
      dispatch(resetDirectorCandidate());
    } else if (
      messageDirectorCandidate !== "" &&
      isErrorDirectorCandidate &&
      !isLoadingDirectorCandidate
    ) {
      dispatch(resetDirectorCandidate());
    }

    if (
      messagePatchDirectorCandidate !== "" &&
      isSuccessDirectorCandidate &&
      !isLoadingPatchDirectorCandidate
    ) {
      navigate(
        `/director_candidate_setup/data/${messagePatchDirectorCandidate?.data?.uuid}`,
      );
      dispatch(resetDirectorCandidate());
    } else if (
      messagePatchDirectorCandidate !== "" &&
      isErrorDirectorCandidate &&
      !isLoadingPatchDirectorCandidate
    ) {
      dispatch(resetDirectorCandidate());
    }
  }, [
    dataDirectorCandidate,
    isLoadingDirectorCandidate,
    isLoadingPatchDirectorCandidate,
    isErrorDirectorCandidate,
    isSuccessDirectorCandidate,
    messageDirectorCandidate,
    messagePatchDirectorCandidate,
  ]);

  const handleSubmit = () => {
    const formDataSubmit = new FormData();
    formDataSubmit.append("voting_period_uuid", formData?.voting_period_uuid);
    formDataSubmit.append("name", formData?.name);
    formDataSubmit.append("vision", formData?.vision);
    formDataSubmit.append("mission", formData?.mission);
    formDataSubmit.append("file", formData?.file);
    dispatch(CreateDirectorCandidateData({ formData: formDataSubmit }));
  };

  useEffect(() => {
    dispatch(GetCreateAttribute());
  }, [dispatch]);

  const handleBack = () => {
    navigate(`/director_candidate_setup`);
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
            Create Director Candidate
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
              className={`${isLoadingDirectorCandidate ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingDirectorCandidate ? "hidden" : ""} py-1`}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <CandidateDataCreateForm
            formData={formData}
            setFormData={setFormData}
            attributes={attributes}
            chagePhoto={chagePhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default DirectorCandidateDataCreatePage;
