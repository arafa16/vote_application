import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login, resetAuth } from "../../stores/features/AuthSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";

import logoWhite from "../../assets/images/logo/logo_kopkarla_white.png";
import logoColor from "../../assets/images/logo/logo_kopkarla_color.png";
import Button from "../../base-components/Button";
import { FormInput } from "../../base-components/Form";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import LoadingIcon from "../../base-components/LoadingIcon";

import { NewNotification } from "../../components/Notification/NewNotification";
import packageJson from "../../../package.json";

function LoginPage() {
  let [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isError, isSuccess, isLoading, message } = useSelector(
    (state: any) => state.auth,
  );

  const {
    data: getMeData,
    isLoading: isGetMeLoading,
    isSuccess: isGetMeSuccess,
    isError: isGetMeError,
    message: getMeMessage,
  } = useSelector((state: any) => state.getMe);

  useEffect(() => {
    if (getMeData && isGetMeSuccess && !isGetMeLoading) {
      dispatch(resetGetMe());
      navigate("/");
    } else if (getMeMessage && isGetMeError && !isGetMeLoading) {
      NewNotification(getMeMessage?.data?.message);
      dispatch(resetGetMe());
    }
  }, [getMeData, isGetMeError, isGetMeLoading, isGetMeSuccess, getMeMessage]);

  useEffect(() => {
    if (message !== "" && isSuccess && !isLoading) {
      dispatch(resetAuth());
      dispatch(GetMe());
    }
    if (message !== "" && isError && !isLoading) {
      NewNotification(message?.data?.message);
      dispatch(resetAuth());
    }
  }, [data, isError, isSuccess, isLoading, message]);

  const handleAuth = (e: any) => {
    e.preventDefault();
    dispatch(Login(formData));
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
            <form onSubmit={handleAuth}>
              <div className="box px-5 py-8 mt-10 max-w-[450px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:opacity-50 before:border before:border-slate-200 before:-mt-4 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
                <FormInput
                  type="email"
                  className="block px-4 py-3"
                  formInputSize="sm"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <FormInput
                  type="password"
                  className="block px-4 py-3 mt-4"
                  formInputSize="sm"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className="flex mt-8 text-slate-500">
                  <p
                    className="w-full flex justify-end hover:cursor-pointer"
                    onClick={() => navigate("/req_reset")}
                  >
                    Forgot Password?
                  </p>
                </div>
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
                      "Login"
                    )}
                  </Button>
                  {/* <Button
                    variant="outline-secondary"
                    className="w-full mt-3"
                    type="button"
                    onClick={() => navigate("/registration")}
                  >
                    Sign up
                  </Button> */}
                </div>
                <div className="mt-10 flex justify-center text-primary opacity-50">
                  <p>v{packageJson.version} - Created by Ara Fa Adri</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
