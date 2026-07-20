import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetVotingPeriodById,
  DeleteVotingPeriodData,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import dayjs from "dayjs";
import { Menu, Dialog } from "../../base-components/Headless";
import { useNavigate, useParams } from "react-router-dom";
import { FormInput, FormLabel } from "../../base-components/Form";

const VotingPeriodDataViewByIdPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [dataView, setDataView] = useState<any>(null);

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
    dataById: dataVotingPeriod,
    isLoading: isLoadingVotingPeriod,
    isError: isErrorVotingPeriod,
    isSuccess: isSuccessVotingPeriod,
    message: messageVotingPeriod,
  } = useSelector((state: any) => state.votingPeriod);

  useEffect(() => {
    if (
      dataVotingPeriod !== null &&
      isSuccessVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      setDataView(dataVotingPeriod?.data);
      dispatch(resetVotingPeriod());
    } else if (
      messageVotingPeriod !== "" &&
      isErrorVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      dispatch(resetVotingPeriod());
    } else if (
      messageVotingPeriod !== "" &&
      isSuccessVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      navigate("/voting_period");
      dispatch(resetVotingPeriod());
    } else if (
      messageVotingPeriod !== "" &&
      isErrorVotingPeriod &&
      !isLoadingVotingPeriod
    ) {
      dispatch(resetVotingPeriod());
    }
  }, [
    dataVotingPeriod,
    isLoadingVotingPeriod,
    isErrorVotingPeriod,
    isSuccessVotingPeriod,
    messageVotingPeriod,
  ]);

  useEffect(() => {
    dispatch(GetVotingPeriodById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/voting_period");
  };

  const handleEdit = () => {
    navigate(`/voting_period/data/${id}/edit`);
  };

  const handleDelete = () => {
    dispatch(DeleteVotingPeriodData({ uuid: id }));
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold mb-4">
              Voting Period
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-12 bg-slate-200 rounded px-2">
          <div className="col-span-6 md:col-span-2 py-1 text-[12px] text-primary">
            Data Voting Period
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
                <Menu.Item onClick={handleEdit}>
                  <Lucide icon="User" className="w-4 h-4 mr-2" />
                  Edit
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
              <p className="col-span-6 md:col-span-6">Name</p>
              <p className="col-span-6">: {dataView?.name}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Description</p>
              <p className="col-span-6">: {dataView?.description}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">Start Date</p>
              <p className="col-span-6">
                :{" "}
                {dataView?.start_date
                  ? dayjs(dataView?.start_date).format("YYYY-MM-DD HH:mm:ss")
                  : ""}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-6">End Date</p>
              <p className="col-span-6">
                :{" "}
                {dataView?.end_date
                  ? dayjs(dataView?.end_date).format("YYYY-MM-DD HH:mm:ss")
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPeriodDataViewByIdPage;
