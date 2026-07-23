import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetVotingPeriodById,
  UpdateVotingPeriodData,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import VotingPeriodDataCreateForm from "../../components/Form/VotingPeriodDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const VotingPeriodDataEditPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_active: 1,
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
    dataById: dataByIdVotingPeriod,
    isLoading: isLoadingVotingPeriod,
    isLoadingPatch: isLoadingPatchVotingPeriod,
    isError: isErrorVotingPeriod,
    isSuccess: isSuccessVotingPeriod,
    message: messageVotingPeriod,
    messagePatch: messagePatchVotingPeriod,
  } = useSelector((state: any) => state.votingPeriod);

  useEffect(() => {
    if (
      dataByIdVotingPeriod !== null &&
      isSuccessVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      setFormData({
        name: dataByIdVotingPeriod?.data?.name,
        description: dataByIdVotingPeriod?.data?.description,
        start_date: dataByIdVotingPeriod?.data?.start_date,
        end_date: dataByIdVotingPeriod?.data?.end_date,
        is_active: dataByIdVotingPeriod?.data?.is_active ? 1 : 0,
      });
      dispatch(resetVotingPeriod());
    } else if (
      messageVotingPeriod !== "" &&
      isErrorVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      console.log("isErrorVotingPeriod", isErrorVotingPeriod);
      dispatch(resetVotingPeriod());
    }

    if (
      messagePatchVotingPeriod !== "" &&
      isSuccessVotingPeriod &&
      !isLoadingPatchVotingPeriod
    ) {
      navigate(`/voting_period/data/${id}`);
      dispatch(resetVotingPeriod());
    } else if (
      messagePatchVotingPeriod !== "" &&
      isErrorVotingPeriod &&
      !isLoadingPatchVotingPeriod
    ) {
      dispatch(resetVotingPeriod());
    }
  }, [
    dataByIdVotingPeriod,
    isLoadingVotingPeriod,
    isErrorVotingPeriod,
    isSuccessVotingPeriod,
    messageVotingPeriod,
    isLoadingPatchVotingPeriod,
    messagePatchVotingPeriod,
  ]);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(GetVotingPeriodById(id));
    }
  }, [id]);

  const handleSubmit = () => {
    dispatch(UpdateVotingPeriodData({ uuid: id, formData }));
  };

  const handleBack = () => {
    navigate(`/voting_period`);
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
            Create Voting Period
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
              className={`${isLoadingVotingPeriod ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingVotingPeriod ? "hidden" : ""} py-1`}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <VotingPeriodDataCreateForm
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
};

export default VotingPeriodDataEditPage;
