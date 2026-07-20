import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetCreateAttribute,
  CreateUserData,
  resetUser,
} from "../../stores/features/UserSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import UserDataCreateForm from "../../components/Form/UserDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const UserDataCreatePage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [attributeData, setAttributeData] = useState<any>();
  const [formData, setFormData] = useState<any>({
    name: "",
    membership_number: "",
    email: "",
    password: "",
    company_uuid: null,
    is_member: 0,
    status_uuid: null,
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
    dataAttribute: dataAttributeUser,
    isLoading: isLoadingUser,
    isLoadingUpdate: isLoadingUpdateUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
    message: messageUser,
    messageCreate: messageCreateUser,
  } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (dataAttributeUser !== null && isSuccessUser && !isLoadingUser) {
      setAttributeData(dataAttributeUser?.data);
      dispatch(resetUser());
    } else if (messageUser !== "" && isErrorUser && !isLoadingUser) {
      dispatch(resetUser());
    }

    if (messageCreateUser !== "" && isSuccessUser && !isLoadingUpdateUser) {
      navigate(`/user/${messageCreateUser?.data?.uuid}`);
      dispatch(resetUser());
    } else if (
      messageCreateUser !== "" &&
      isErrorUser &&
      !isLoadingUpdateUser
    ) {
      console.log("isErrorUser", isErrorUser);
      dispatch(resetUser());
    }
  }, [
    dataAttributeUser,
    isLoadingUser,
    isErrorUser,
    isSuccessUser,
    messageUser,
    isLoadingUpdateUser,
    messageCreateUser,
  ]);

  useEffect(() => {
    dispatch(GetCreateAttribute());
  }, [dispatch]);

  const handleUpdate = () => {
    dispatch(CreateUserData({ formData }));
  };

  const handleBack = () => {
    navigate(`/users`);
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
            Create User
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
              className={`${isLoadingUpdateUser ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingUpdateUser ? "hidden" : ""} py-1`}
              onClick={handleUpdate}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <UserDataCreateForm
            formData={formData}
            setFormData={setFormData}
            dataAttributes={attributeData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDataCreatePage;
