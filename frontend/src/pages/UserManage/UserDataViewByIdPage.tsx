import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChangePasswordById,
  GetUserById,
  resetUser,
} from "../../stores/features/UserSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import dayjs from "dayjs";
import { Menu, Dialog } from "../../base-components/Headless";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FormInput, FormLabel } from "../../base-components/Form";
import { NotificationChangePassword } from "../../components/Notification/NotificationChangePassword";

const UserDataViewByIdPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [resetPasswordModalById, setResetPasswordModalById] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    conf_password: "",
  });

  const [searchParams] = useSearchParams();

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
    data: dataUser,
    dataAttribute: dataAttributeUser,
    isLoading: isLoadingUser,
    isLoadingUpdate: isLoadingPatchUser,
    isError: isErrorUser,
    isErrorPatch: isErrorPatchUser,
    isSuccess: isSuccessUser,
    isSuccessPatch: isSuccessPatchUser,
    message: messageUser,
    messagePassword,
    messagePasswordPatch,
  } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (dataUser !== null && isSuccessUser && !isLoadingUser) {
      setUserData(dataUser?.data);
      dispatch(resetUser());
    } else if (messageUser !== "" && isErrorUser && !isLoadingUser) {
      dispatch(resetUser());
    }
    if (
      messagePasswordPatch !== "" &&
      isSuccessPatchUser &&
      !isLoadingPatchUser
    ) {
      NotificationChangePassword(messagePasswordPatch?.message);
      setFormData({
        password: "",
        conf_password: "",
      });
      setResetPasswordModalById(false);
      dispatch(resetUser());
    }
    if (
      messagePasswordPatch !== "" &&
      isErrorPatchUser &&
      !isLoadingPatchUser
    ) {
      NotificationChangePassword(messagePasswordPatch?.data?.message);
      dispatch(resetUser());
    }
  }, [
    dataUser,
    isLoadingUser,
    isLoadingPatchUser,
    isErrorUser,
    isErrorPatchUser,
    isSuccessUser,
    messageUser,
    messagePassword,
    messagePasswordPatch,
  ]);

  useEffect(() => {
    dispatch(GetUserById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    navigate(`/users?page=${page}&limit=${limit}`);
  };

  const handleEdit = () => {
    navigate(`/user/${id}/edit`);
  };

  const handleEditPrivilege = () => {
    navigate(`/user/${id}/${userData?.privilege?.uuid}/edit_privilege`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(ChangePasswordById({ uuid: id, formData }));
  };

  const handleShowResetPassword = () => {
    setResetPasswordModalById(true);
  };

  const FormPassword = (
    <Dialog
      open={resetPasswordModalById}
      onClose={() => {
        setResetPasswordModalById(false);
      }}
      // initialFocus={sendButtonRef}
    >
      <Dialog.Panel>
        <Dialog.Title>
          <h2 className="mr-auto text-base">Change Password User</h2>
        </Dialog.Title>
        <form id="form" onSubmit={handleSubmit}>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12 sm:col-span-12">
              <FormLabel htmlFor="password">New Password</FormLabel>
              <FormInput
                formInputSize="sm"
                id="password"
                type="password"
                placeholder="*********"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-12 sm:col-span-12">
              <FormLabel htmlFor="conf_password">
                Confirmation Password
              </FormLabel>
              <FormInput
                formInputSize="sm"
                id="conf_password"
                type="password"
                placeholder="*********"
                value={formData.conf_password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    conf_password: e.target.value,
                  })
                }
              />
            </div>
          </Dialog.Description>
        </form>
        <Dialog.Footer>
          <Button
            size="sm"
            type="button"
            variant="outline-secondary"
            onClick={() => {
              setResetPasswordModalById(false);
            }}
            className="w-20 mr-1"
          >
            Cancel
          </Button>
          <Button
            form="form"
            size="sm"
            variant="primary"
            type="submit"
            className="w-20"
          >
            Update
          </Button>
        </Dialog.Footer>
      </Dialog.Panel>
    </Dialog>
  );

  return (
    <div>
      {FormPassword}
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold mb-4">
              User Detail
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-12 bg-slate-200 rounded px-2">
          <div className="col-span-6 md:col-span-2 py-1 text-[12px] text-primary">
            Data User
          </div>
          <div className="col-span-2 col-start-12 flex justify-end items-center gap-4">
            <div>
              <Button
                variant="outline-primary"
                className="py-1"
                onClick={handleBack}
              >
                Back
              </Button>
            </div>

            <Menu>
              <Menu.Button as={Button} variant="primary" className="py-1">
                Action
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item onClick={handleShowResetPassword}>
                  <Lucide icon="Key" className="w-4 h-4 mr-2" />
                  Change Password
                </Menu.Item>
                <Menu.Item onClick={handleEdit}>
                  <Lucide icon="User" className="w-4 h-4 mr-2" />
                  Edit User
                </Menu.Item>
                <Menu.Item onClick={handleEditPrivilege}>
                  <Lucide icon="Eye" className="w-4 h-4 mr-2" />
                  Edit Privilege
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="Trash2" className="w-4 h-4 mr-2" />
                  Delete
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <div className="box mt-1">
          <div className="grid grid-cols-12 px-8 py-4 gap-4">
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Name</p>
              <p className="col-span-6">: {userData?.name}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Nomor Anggota</p>
              <p className="col-span-6">: {userData?.membership_number}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Email</p>
              <p className="col-span-6">: {userData?.email}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Group</p>
              <p className="col-span-6">: {userData?.company?.name}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Verification Date</p>
              <p className="col-span-6">
                :{" "}
                {userData?.verification_date
                  ? dayjs(userData?.verification_date).format(
                      "YYYY-MM-DD HH:mm:ss",
                    )
                  : ""}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Verification</p>
              <p className="col-span-6">
                : {`${userData?.is_verified ? "verified" : "unverified"}`}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Status Anggota</p>
              <p className="col-span-6">
                : {userData?.is_member ? "Anggota" : "Bukan Anggota"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Status</p>
              <p className="col-span-6">: {userData?.status?.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-12 bg-slate-200 rounded px-2">
          <div className="cols-span-2 py-1 text-[12px] text-primary">
            Privilege
          </div>
        </div>
        <div className="box mt-1">
          <div className="grid grid-cols-12 px-8 py-4 gap-4">
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Tata Cara Voting</p>
              <p className="col-span-6">
                :{" "}
                {userData?.privilege?.tata_cara_voting ? "active" : "inactive"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">
                Profile Candidate Pengawas
              </p>
              <p className="col-span-6">
                :{" "}
                {userData?.privilege?.profile_kandidat_pengawas
                  ? "active"
                  : "inactive"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">
                Profile Candidate Pengurus
              </p>
              <p className="col-span-6">
                :{" "}
                {userData?.privilege?.profile_kandidat_pengurus
                  ? "active"
                  : "inactive"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Mulai Voting</p>
              <p className="col-span-6">
                : {userData?.privilege?.mulai_voting ? "active" : "inactive"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Riwayat Voting</p>
              <p className="col-span-6">
                : {userData?.privilege?.riwayat_voting ? "active" : "inactive"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Dashboard</p>
              <p className="col-span-6">
                : {userData?.privilege?.dashboard ? "active" : "inactive"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Status Voting Anggota</p>
              <p className="col-span-6">
                :{" "}
                {userData?.privilege?.status_voting_anggota
                  ? "active"
                  : "inactive"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Data User</p>
              <p className="col-span-6">
                : {userData?.privilege?.user_data ? "active" : "inactive"}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Setting</p>
              <p className="col-span-6">
                : {userData?.privilege?.setting ? "active" : "inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataViewByIdPage;
