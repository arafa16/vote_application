import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetPrivilegeById,
  UpdatePrivilegeData,
  resetPrivilege,
} from "../../stores/features/PrivilegeSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import UserPrivilegeDataForm from "../../components/Form/UserPrivilegeDataForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const UserPrivilegeDataEditPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    tata_cara_voting: 0,
    profile_kandidat_pengawas: 0,
    profile_kandidat_pengurus: 0,
    mulai_voting: 0,
    riwayat_voting: 0,
    dashboard: 0,
    dashboard_view_vote: 0,
    status_voting_anggota: 0,
    user_data: 0,
    setting: 0,
  });

  const { user_id, privilege_id } = useParams();
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
    data: dataPrivilege,
    isLoading: isLoadingPrivilege,
    isLoadingPatch: isLoadingPatchPrivilege,
    isError: isErrorPrivilege,
    isSuccess: isSuccessPrivilege,
    message: messagePrivilege,
    messagePatch: messagePatchPrivilege,
  } = useSelector((state: any) => state.privilege);

  const handleDataPrivilege = (props: any) => {
    setFormData({
      ...formData,
      tata_cara_voting: props?.tata_cara_voting ? 1 : 0,
      profile_kandidat_pengawas: props?.profile_kandidat_pengawas ? 1 : 0,
      profile_kandidat_pengurus: props?.profile_kandidat_pengurus ? 1 : 0,
      mulai_voting: props?.mulai_voting ? 1 : 0,
      riwayat_voting: props?.riwayat_voting ? 1 : 0,
      dashboard: props?.dashboard ? 1 : 0,
      dashboard_view_vote: props?.dashboard_view_vote ? 1 : 0,
      status_voting_anggota: props?.status_voting_anggota ? 1 : 0,
      user_data: props?.user_data ? 1 : 0,
      setting: props?.setting ? 1 : 0,
    });
  };

  useEffect(() => {
    if (dataPrivilege !== null && isSuccessPrivilege && !isLoadingPrivilege) {
      handleDataPrivilege(dataPrivilege?.data);
      dispatch(resetPrivilege());
    } else if (
      messagePrivilege !== "" &&
      isErrorPrivilege &&
      !isLoadingPrivilege
    ) {
      dispatch(resetPrivilege());
    }

    if (
      messagePatchPrivilege !== "" &&
      isSuccessPrivilege &&
      !isLoadingPatchPrivilege
    ) {
      navigate(`/user/${user_id}`);
      dispatch(resetPrivilege());
    } else if (
      messagePatchPrivilege !== "" &&
      isErrorPrivilege &&
      !isLoadingPatchPrivilege
    ) {
      dispatch(resetPrivilege());
    }
  }, [
    dataPrivilege,
    isLoadingPrivilege,
    isErrorPrivilege,
    isSuccessPrivilege,
    messagePrivilege,
    isLoadingPatchPrivilege,
    messagePatchPrivilege,
  ]);

  useEffect(() => {
    dispatch(GetPrivilegeById(privilege_id));
  }, [dispatch, privilege_id]);

  const handleUpdate = () => {
    dispatch(UpdatePrivilegeData({ uuid: privilege_id, formData }));
  };

  const handleBack = () => {
    navigate(`/user/${user_id}`);
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
            Edit Privilege
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
              className={`${isLoadingPatchPrivilege ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingPatchPrivilege ? "hidden" : ""} py-1`}
              onClick={handleUpdate}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <UserPrivilegeDataForm
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPrivilegeDataEditPage;
