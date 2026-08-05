import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetEmailDataById,
  DeleteEmailDataData,
  SendEmailById,
  resetEmail,
} from "../../stores/features/EmailSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LoadingIcon from "../../base-components/LoadingIcon";
import { PrivilegeCheck } from "../../utils/privilege-check";

const EmailDataViewByIdPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [dataView, setDataView] = useState<any>(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

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
      PrivilegeCheck(meData?.privilege?.email_queue, navigate);
    }
  }, [meData]);

  const {
    data: dataEmail,
    isLoading: isLoadingEmail,
    isLoadingPatch: isLoadingPatchEmail,
    isLoadingSend: isLoadingSendEmail,
    isError: isErrorEmail,
    isSuccess: isSuccessEmail,
    message: messageEmail,
    messagePatch: messagePatchEmail,
    messageSend: messageSendEmail,
  } = useSelector((state: any) => state.email);

  useEffect(() => {
    if (dataEmail !== null && isSuccessEmail && !isLoadingEmail) {
      setDataView(dataEmail?.data);
      dispatch(resetEmail());
    } else if (messageEmail !== "" && isErrorEmail && !isLoadingEmail) {
      dispatch(resetEmail());
    } else if (
      messagePatchEmail !== "" &&
      isSuccessEmail &&
      !isLoadingPatchEmail
    ) {
      navigate("/email");
      dispatch(resetEmail());
    } else if (
      messagePatchEmail !== "" &&
      isErrorEmail &&
      !isLoadingPatchEmail
    ) {
      dispatch(resetEmail());
    }

    if (messageSendEmail !== "" && isSuccessEmail && !isLoadingSendEmail) {
      dispatch(GetEmailDataById(id));
      dispatch(resetEmail());
    } else if (messageSendEmail !== "" && isErrorEmail && !isLoadingSendEmail) {
      dispatch(resetEmail());
    }
  }, [
    dataEmail,
    isLoadingEmail,
    isErrorEmail,
    isSuccessEmail,
    messageEmail,
    isLoadingPatchEmail,
    messagePatchEmail,
    isLoadingSendEmail,
    messageSendEmail,
  ]);

  useEffect(() => {
    dispatch(GetEmailDataById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(
      `/email?page=${searchParams.get("page")}&limit=${searchParams.get("limit")}&search=${searchParams.get("search")}&status=${searchParams.get("status")}&type=${searchParams.get("type")}`,
    );
  };

  const handleEdit = () => {
    navigate(`/email/data/${id}/edit`);
  };

  const handleDelete = () => {
    dispatch(DeleteEmailDataData({ uuid: id }));
  };

  const handleSendEmail = () => {
    dispatch(SendEmailById({ uuid: id }));
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold mb-4">
              Email
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-12 bg-slate-200 rounded px-2">
          <div className="col-span-6 md:col-span-2 py-1 text-[12px] text-primary">
            Data Email
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
              {" "}
              <LoadingIcon
                icon="three-dots"
                color="#004b69"
                className={`h-2 w-2 text-primary ${isLoadingSendEmail ? "" : "hidden"}`}
              />
              <Menu.Button
                as={Button}
                variant="primary"
                className={`py-1  ${isLoadingSendEmail ? "hidden" : ""}`}
              >
                Action
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item onClick={handleEdit}>
                  <Lucide icon="User" className="w-4 h-4 mr-2" />
                  Edit
                </Menu.Item>
                <Menu.Item onClick={handleSendEmail}>
                  <Lucide icon="Send" className="w-4 h-4 mr-2" />
                  Send Email
                </Menu.Item>
                <Menu.Item onClick={handleDelete}>
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
              <p className="col-span-3 md:col-span-3">Subject</p>
              <p className="col-span-9 md:col-span-8">: {dataView?.subject}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-3 md:col-span-3">To</p>
              <p className="col-span-9 md:col-span-8">: {dataView?.to}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-3 md:col-span-3">Cc</p>
              <p className="col-span-9 md:col-span-8">: {dataView?.cc}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-3 md:col-span-3">Bcc</p>
              <p className="col-span-9 md:col-span-8">: {dataView?.bcc}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-3 md:col-span-3">Type</p>
              <p className="col-span-9 md:col-span-8">: {dataView?.type}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-3 md:col-span-3">Status</p>
              <p className="col-span-9 md:col-span-8">: {dataView?.status}</p>
            </div>
          </div>
        </div>
        <div className="mt-2 overflow-x-auto rounded-lg border p-4 grid grid-cols-12">
          <div
            className="
              col-span-8
              w-full
              max-w-full
              break-words
              [&_*]:max-w-full
              [&_img]:h-auto
              [&_img]:max-w-full
              [&_table]:w-full
              [&_table]:max-w-full
              [&_table]:table-auto
              [&_td]:break-words
              [&_th]:break-words
              [&_pre]:overflow-x-auto
              [&_iframe]:max-w-full
              [&_ol]:list-decimal
              [&_ol]:pl-6
              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_li]:mb-2
            "
            dangerouslySetInnerHTML={{
              __html: dataView?.body,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailDataViewByIdPage;
