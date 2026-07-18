import { useState, useEffect } from "react";
import Lucide from "../../base-components/Lucide";
import { Menu, Dialog } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import userNotFound from "../../assets/images/user/userNotFound.jpg";
import _ from "lodash";
import clsx from "clsx";
import { FormLabel, FormInput } from "../../base-components/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChangePassword, resetUser } from "../../stores/features/UserSlice";
import { NewNotification } from "../Notification/NewNotification";

function Main(props: any) {
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    conf_password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // On press event (Ctrl+k)
  // document.querySelectorAll("body")[0].onkeydown = (e) => {
  //   if ((e.ctrlKey || e.metaKey) && e.which == 75) {
  //     setSearchResultModal(true);
  //   }
  // };

  //get data user login
  const { data, isError, isSuccess, isLoading, messagePassword } = useSelector(
    (state: any) => state.user,
  );

  useEffect(() => {
    if (messagePassword !== "" && isSuccess && !isLoading) {
      NewNotification(messagePassword?.message);
      setFormData({
        password: "",
        conf_password: "",
      });
      setResetPasswordModal(false);
      dispatch(resetUser());
    }
    if (messagePassword !== "" && isError && !isLoading) {
      console.log(messagePassword, "message");
      NewNotification(messagePassword?.data?.message);
      dispatch(resetUser());
    }
  }, [data, isError, isSuccess, isLoading, messagePassword]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(ChangePassword({ formData }));
  };

  return (
    <>
      <Dialog
        open={resetPasswordModal}
        onClose={() => {
          setResetPasswordModal(false);
        }}
        // initialFocus={sendButtonRef}
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base">Change Password</h2>
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
                setResetPasswordModal(false);
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
              // ref={sendButtonRef}
            >
              Update
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
      {/* BEGIN: Top Bar */}
      <div
        className={clsx([
          "h-[63px] z-[51] sticky top-[10px] xl:mx-[10px] flex items-center px-5 justify-between lg:justify-end",
          "before:content-[''] before:absolute before:h-3 before:top-0 before:inset-x-0 before:-mt-3 before:z-[-1] before:bg-gradient-to-b before:from-slate-100/50 before:to-slate-100/[0.93] before:dark:from-darkmode-700/50 before:dark:to-darkmode-700/[0.93]",
          "after:content-[''] after:shadow-[0_3px_15px_rgb(0_0_0_/_7%)] after:absolute after:inset-0 after:bg-white after:border after:border-slate-200 after:rounded-xl after:dark:bg-darkmode-600 after:dark:border-darkmode-500",
        ])}
      >
        {/* BEGIN: Mobile Menu */}
        <div className="mr-3 -intro-x xl:hidden sm:mr-6">
          <div
            className="cursor-pointer w-[38px] h-[38px] rounded-full border border-slate-200 flex items-center justify-center dark:border-white/20"
            onClick={props?.toggleMobileMenu}
          >
            <Lucide
              icon="BarChart2"
              className="w-5 h-5 transform rotate-90 dark:text-slate-500"
            />
          </div>
        </div>
        {/* END: Mobile Menu */}
        {/* BEGIN: Account Menu */}
        <Menu className="h-10 intro-x">
          <Menu.Button className="flex items-center h-full dropdown-toggle">
            <div className="w-10 h-10 image-fit">
              <img
                alt="Rocketman - HTML Admin Template"
                className="border-2 border-white rounded-full shadow-lg border-opacity-10"
                src={userNotFound}
              />
            </div>
            <div className="hidden ml-3 md:block">
              <div className="max-w-[7rem] truncate font-medium">
                {props?.user?.name}
              </div>
              <div className="text-xs text-slate-400">{props?.user?.email}</div>
            </div>
          </Menu.Button>
          <Menu.Items className="w-48 mt-px">
            <Menu.Item onClick={() => setResetPasswordModal(true)}>
              <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={props.handleLogout} className="cursor-pointer">
              <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
            </Menu.Item>
          </Menu.Items>
        </Menu>
        {/* END: Account Menu */}
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
