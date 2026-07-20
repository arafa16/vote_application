import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetUpdateAttributeById,
  UpdateCommissionerCandidateData,
  resetCommissionerCandidate,
} from "../../stores/features/CommissionerCandidateSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import CandidateDataCreateForm from "../../components/Form/CandidateDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const CommissionerCandidateDataEditPage = () => {
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
    data: dataCommissionerCandidate,
    isLoading: isLoadingCommissionerCandidate,
    isLoadingPatch: isLoadingPatchCommissionerCandidate,
    isError: isErrorCommissionerCandidate,
    isSuccess: isSuccessCommissionerCandidate,
    message: messageCommissionerCandidate,
    messagePatch: messagePatchCommissionerCandidate,
  } = useSelector((state: any) => state.commissionerCandidate);

  useEffect(() => {
    if (
      dataCommissionerCandidate !== null &&
      isSuccessCommissionerCandidate &&
      !isLoadingCommissionerCandidate
    ) {
      setFormData({
        ...formData,
        voting_period_uuid:
          dataCommissionerCandidate?.data?.voting_period?.uuid,
        name: dataCommissionerCandidate?.data?.name,
        vision: dataCommissionerCandidate?.data?.vision,
        mission: dataCommissionerCandidate?.data?.mission,
      });
      setAttributes(dataCommissionerCandidate?.attributes);
      dispatch(resetCommissionerCandidate());
    } else if (
      messageCommissionerCandidate !== "" &&
      isErrorCommissionerCandidate &&
      !isLoadingCommissionerCandidate
    ) {
      dispatch(resetCommissionerCandidate());
    }

    if (
      messagePatchCommissionerCandidate !== "" &&
      isSuccessCommissionerCandidate &&
      !isLoadingPatchCommissionerCandidate
    ) {
      navigate(`/commissioner_candidate_setup/data/${id}`);
      dispatch(resetCommissionerCandidate());
    } else if (
      messagePatchCommissionerCandidate !== "" &&
      isErrorCommissionerCandidate &&
      !isLoadingPatchCommissionerCandidate
    ) {
      dispatch(resetCommissionerCandidate());
    }
  }, [
    dataCommissionerCandidate,
    isLoadingCommissionerCandidate,
    isLoadingPatchCommissionerCandidate,
    isErrorCommissionerCandidate,
    isSuccessCommissionerCandidate,
    messageCommissionerCandidate,
    messagePatchCommissionerCandidate,
  ]);

  const handleSubmit = () => {
    const formDataSubmit = new FormData();
    formDataSubmit.append("voting_period_uuid", formData?.voting_period_uuid);
    formDataSubmit.append("name", formData?.name);
    formDataSubmit.append("vision", formData?.vision);
    formDataSubmit.append("mission", formData?.mission);
    formDataSubmit.append("file", formData?.file);
    dispatch(
      UpdateCommissionerCandidateData({ uuid: id, formData: formDataSubmit }),
    );
  };

  useEffect(() => {
    dispatch(GetUpdateAttributeById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/commissioner_candidate_setup/data/${id}`);
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
            Edit Commissioner Candidate
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
              className={`${isLoadingCommissionerCandidate ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingCommissionerCandidate ? "hidden" : ""} py-1`}
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

export default CommissionerCandidateDataEditPage;
