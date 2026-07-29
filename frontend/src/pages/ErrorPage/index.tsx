import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import errorIllustration from "../../assets/images/error-illustration.svg";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  function handleClickBack() {
    navigate("/");
  }

  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container">
          {/* BEGIN: Error Page */}
          <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
            <div className="-intro-x lg:mr-20">
              <img
                alt="Rocketman Tailwind HTML Admin Template"
                className="w-[450px] h-48 lg:h-auto"
                src={errorIllustration}
              />
            </div>
            <div className="mt-10 text-white lg:mt-0">
              <div className="font-medium intro-x text-8xl">403</div>
              <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                Oops. You Dont Have Access.
              </div>
              <Button
                className="px-4 py-3 mt-10 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200"
                onClick={() => handleClickBack()}
              >
                Back to Home
              </Button>
            </div>
          </div>
          {/* END: Error Page */}
        </div>
      </div>
    </>
  );
}

export default Main;
