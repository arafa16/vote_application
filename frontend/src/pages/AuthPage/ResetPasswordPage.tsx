import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTokenData,
  ResetPassword,
  resetResetPassword,
} from "../../stores/features/ResetPasswordSlice";

import logoWhite from "../../assets/images/logo/logo_kopkarla_white.png";
import logoColor from "../../assets/images/logo/logo_kopkarla_color.png";
import Button from "../../base-components/Button";
import { FormInput } from "../../base-components/Form";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import LoadingIcon from "../../base-components/LoadingIcon";

import { NewNotification } from "../../components/Notification/NewNotification";
const ResetPasswordPage = () => {
  const { token } = useParams();

  let [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    conf_password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data,
    isError,
    isSuccess,
    isLoading,
    isLoadingPatch,
    message,
    messagePatch,
  } = useSelector((state: any) => state.resetPassword);

  useEffect(() => {
    if (data !== "" && isSuccess && !isLoading) {
      setFormData({ ...formData, email: data?.data?.user?.email });
      dispatch(resetResetPassword());
    } else if (message !== "" && isError && !isLoading) {
      console.log(message, "error1");
      NewNotification(message?.data?.message);
      dispatch(resetResetPassword());
    }

    if (messagePatch !== "" && isSuccess && !isLoadingPatch) {
      NewNotification(messagePatch?.message);
      setFormData({
        email: "",
        password: "",
        conf_password: "",
      });
      navigate("/login");
      dispatch(resetResetPassword());
    } else if (messagePatch !== "" && isError && !isLoadingPatch) {
      console.log(messagePatch, "error2");
      NewNotification(messagePatch?.data?.message);
      dispatch(resetResetPassword());
    }
  }, [
    data,
    isError,
    isSuccess,
    isLoading,
    isLoadingPatch,
    message,
    messagePatch,
  ]);

  useEffect(() => {
    dispatch(GetTokenData({ token }));
  }, [dispatch]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(ResetPassword({ formData, token }));
  };
  return (
    <>
      <div className="container">
        <DarkModeSwitcher />
        <div className="flex items-center justify-center w-full min-h-screen p-5 md:p-20 text-xs">
          <div className="w-96 intro-y">
            <img
              className="w-12 md:w-24 mx-auto hidden lg:flex"
              alt="Kopkarla"
              src={logoWhite}
            />
            <img
              className="w-12 md:w-24 mx-auto flex lg:hidden"
              alt="Kopkarla"
              src={logoColor}
            />
            <form onSubmit={handleSubmit}>
              <div className="box px-5 py-8 mt-10 max-w-[450px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:border before:border-slate-200 before:-mt-5 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
                <FormInput
                  type="email"
                  className="block px-4 py-3"
                  formInputSize="sm"
                  placeholder="Email"
                  disabled
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <FormInput
                  type="password"
                  className="block px-4 py-3 mt-4"
                  formInputSize="sm"
                  placeholder="New Password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <FormInput
                  type="password"
                  className="block px-4 py-3 mt-4"
                  formInputSize="sm"
                  placeholder="Confirmation New Password"
                  required
                  value={formData.conf_password}
                  onChange={(e) =>
                    setFormData({ ...formData, conf_password: e.target.value })
                  }
                />
                <div className="mt-5 text-center xl:mt-8 xl:text-left">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full xl:mr-3"
                  >
                    {isLoading ? (
                      <LoadingIcon
                        icon="circles"
                        className="w-4 h4"
                        color="white"
                      />
                    ) : (
                      "Save Password"
                    )}
                  </Button>
                </div>
                <div className="mt-10 flex justify-center text-gray-400">
                  <p>V.1.1.0 - Created by Ara Fa Adri</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
