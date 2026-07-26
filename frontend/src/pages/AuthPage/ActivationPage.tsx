import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import logoWhite from "../../assets/images/logo/logo_kopkarla_white.png";
import logoColor from "../../assets/images/logo/logo_kopkarla_color.png";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  GetActivationByToken,
  resetActivation,
} from "../../stores/features/ActivationSlice";

const ActivationPage = () => {
  const [messageData, setMessageData] = useState<any>({
    color: null,
    message: null,
  });
  const { token } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isError, isSuccess, isLoading, message } = useSelector(
    (state: any) => state.activation,
  );

  useEffect(() => {
    if (message !== "" && isSuccess && !isLoading) {
      setMessageData({ color: "primary", message: message?.message });
      dispatch(resetActivation());
    } else if (message !== "" && isError && !isLoading) {
      setMessageData({ color: "danger", message: message?.data?.message });
      dispatch(resetActivation());
    }
  }, [data, isError, isSuccess, isLoading, message]);

  useEffect(() => {
    if (token !== undefined || token !== null) {
      dispatch(GetActivationByToken(token));
    }
  }, [token]);

  return (
    <div>
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
            <div className="box grid grid-cols-12 gap-4 px-5 py-8 mt-10 max-w-[650px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:border before:border-slate-200 before:-mt-5 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
              <div
                className={`col-span-12 min-h-32 flex justify-center ${messageData?.color !== null ? `text-${messageData?.color}` : ""} text-[14px]/8 text-center text-wrap text-pretty tracking-wide`}
              >
                {messageData && messageData.message}
              </div>
              <div className="col-span-12 flex justify-center">
                <Button
                  variant="outline-primary"
                  className="px-4 w-full md:w-auto mt-4 md:mt-0 py-1"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Continue to Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;
