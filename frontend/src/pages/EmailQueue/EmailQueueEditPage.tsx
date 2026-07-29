import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetEmailDataById,
  UpdateStatusEmailData,
  resetEmail,
} from "../../stores/features/EmailSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import EmailDataCreateForm from "../../components/Form/EmailQueueDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";
import { PrivilegeCheck } from "../../utils/privilege-check";

const EmailDataEditPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    subject: "",
    to: "",
    cc: "",
    bcc: "",
    type: "",
    status: "",
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

  useEffect(() => {
    if (meData !== null) {
      PrivilegeCheck(meData?.privilege?.setting, navigate);
    }
  }, [meData]);

  const {
    data: dataEmail,
    isLoading: isLoadingEmail,
    isLoadingPatch: isLoadingPatchEmail,
    isError: isErrorEmail,
    isSuccess: isSuccessEmail,
    message: messageEmail,
    messagePatch: messagePatchEmail,
  } = useSelector((state: any) => state.email);

  useEffect(() => {
    if (dataEmail !== null && isSuccessEmail && !isLoadingEmail) {
      setFormData({
        ...formData,
        subject: dataEmail?.data?.subject,
        to: dataEmail?.data?.to,
        cc: dataEmail?.data?.cc,
        bcc: dataEmail?.data?.bcc,
        type: dataEmail?.data?.type,
        status: dataEmail?.data?.status,
      });
      dispatch(resetEmail());
    } else if (messageEmail !== "" && isErrorEmail && !isLoadingEmail) {
      dispatch(resetEmail());
    }

    if (messagePatchEmail !== "" && isSuccessEmail && !isLoadingPatchEmail) {
      navigate(`/email/data/${id}`);
      dispatch(resetEmail());
    } else if (
      messagePatchEmail !== "" &&
      isErrorEmail &&
      !isLoadingPatchEmail
    ) {
      dispatch(resetEmail());
    }
  }, [
    dataEmail,
    isLoadingEmail,
    isLoadingPatchEmail,
    isErrorEmail,
    isSuccessEmail,
    messageEmail,
    messagePatchEmail,
  ]);

  const handleSubmit = () => {
    dispatch(UpdateStatusEmailData({ uuid: id, formData }));
  };

  useEffect(() => {
    dispatch(GetEmailDataById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/email/data/${id}`);
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
            Edit Email
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
              className={`${isLoadingEmail ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingEmail ? "hidden" : ""} py-1`}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <EmailDataCreateForm formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
};

export default EmailDataEditPage;
