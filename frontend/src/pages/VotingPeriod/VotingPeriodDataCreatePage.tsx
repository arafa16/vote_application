import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CreateVotingPeriodData,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import VotingPeriodDataCreateForm from "../../components/Form/VotingPeriodDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const VotingPeriodDataCreatePage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_active: 1,
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
    isLoading: isLoadingVotingPeriod,
    isError: isErrorVotingPeriod,
    isSuccess: isSuccessVotingPeriod,
    message: messageVotingPeriod,
    messageCreate: messageCreateVotingPeriod,
  } = useSelector((state: any) => state.votingPeriod);

  useEffect(() => {
    if (
      messageVotingPeriod !== "" &&
      isSuccessVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      navigate(`/voting_period/data/${messageVotingPeriod?.data?.uuid}`);
      dispatch(resetVotingPeriod());
    } else if (
      messageVotingPeriod !== "" &&
      isErrorVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      dispatch(resetVotingPeriod());
    }
  }, [
    isLoadingVotingPeriod,
    isErrorVotingPeriod,
    isSuccessVotingPeriod,
    messageVotingPeriod,
    messageCreateVotingPeriod,
  ]);

  const handleSubmit = () => {
    dispatch(CreateVotingPeriodData({ formData }));
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

export default VotingPeriodDataCreatePage;
