import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetCreateAuditLogAttributes,
  CreateAuditLogData,
  resetAuditLog,
} from "../../stores/features/AuditLogSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import AuditLogDataCreateForm from "../../components/Form/AuditLogDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const AuditLogDataCreatePage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [attributeData, setAttributeData] = useState<any>();
  const [formData, setFormData] = useState<any>({
    user_uuid: "",
    activity: "",
    description: "",
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
    data: dataAuditLog,
    isLoading: isLoadingAuditLog,
    isLoadingPatch: isLoadingPatchAuditLog,
    isError: isErrorAuditLog,
    isSuccess: isSuccessAuditLog,
    message: messageAuditLog,
    messagePatch: messagePatchAuditLog,
  } = useSelector((state: any) => state.auditLog);

  useEffect(() => {
    if (dataAuditLog !== null && isSuccessAuditLog && !isLoadingAuditLog) {
      setAttributeData(dataAuditLog?.data);
      dispatch(resetAuditLog());
    } else if (
      messageAuditLog !== "" &&
      isErrorAuditLog &&
      !isLoadingAuditLog
    ) {
      dispatch(resetAuditLog());
    }

    if (
      messagePatchAuditLog !== "" &&
      isSuccessAuditLog &&
      !isLoadingPatchAuditLog
    ) {
      navigate(`/audit_log/data/${messagePatchAuditLog?.data?.uuid}`);
      dispatch(resetAuditLog());
    } else if (
      messagePatchAuditLog !== "" &&
      isErrorAuditLog &&
      !isLoadingPatchAuditLog
    ) {
      dispatch(resetAuditLog());
    }
  }, [
    dataAuditLog,
    isLoadingAuditLog,
    isLoadingPatchAuditLog,
    isErrorAuditLog,
    isSuccessAuditLog,
    messageAuditLog,
    messagePatchAuditLog,
  ]);

  const handleSubmit = () => {
    dispatch(CreateAuditLogData({ formData }));
  };

  useEffect(() => {
    dispatch(GetCreateAuditLogAttributes());
  }, [dispatch]);

  const handleBack = () => {
    navigate(`/audit_log`);
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
            Create AuditLog
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
              className={`${isLoadingAuditLog ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingAuditLog ? "hidden" : ""} py-1`}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <AuditLogDataCreateForm
            formData={formData}
            setFormData={setFormData}
            attributes={attributeData}
          />
        </div>
      </div>
    </div>
  );
};

export default AuditLogDataCreatePage;
