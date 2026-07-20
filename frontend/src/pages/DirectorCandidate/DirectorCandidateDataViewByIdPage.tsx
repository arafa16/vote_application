import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetDirectorCandidateById,
  DeleteDirectorCandidateData,
  resetDirectorCandidate,
} from "../../stores/features/DirectorCandidateSlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import dayjs from "dayjs";
import { Menu, Dialog } from "../../base-components/Headless";
import { useNavigate, useParams } from "react-router-dom";
import { FormInput, FormLabel } from "../../base-components/Form";

const DirectorCandidateDataViewByIdPage = () => {
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
    data: dataDirectorCandidate,
    isLoading: isLoadingDirectorCandidate,
    isError: isErrorDirectorCandidate,
    isSuccess: isSuccessDirectorCandidate,
    message: messageDirectorCandidate,
  } = useSelector((state: any) => state.directorCandidate);

  useEffect(() => {
    if (
      dataDirectorCandidate !== null &&
      isSuccessDirectorCandidate &&
      !isLoadingDirectorCandidate
    ) {
      setDataView(dataDirectorCandidate?.data);
      dispatch(resetDirectorCandidate());
    } else if (
      messageDirectorCandidate !== "" &&
      isErrorDirectorCandidate &&
      !isLoadingDirectorCandidate
    ) {
      dispatch(resetDirectorCandidate());
    } else if (
      messageDirectorCandidate !== "" &&
      isSuccessDirectorCandidate &&
      !isLoadingDirectorCandidate
    ) {
      navigate("/director_candidate_setup");
      dispatch(resetDirectorCandidate());
    } else if (
      messageDirectorCandidate !== "" &&
      isErrorDirectorCandidate &&
      !isLoadingDirectorCandidate
    ) {
      dispatch(resetDirectorCandidate());
    }
  }, [
    dataDirectorCandidate,
    isLoadingDirectorCandidate,
    isErrorDirectorCandidate,
    isSuccessDirectorCandidate,
    messageDirectorCandidate,
  ]);

  useEffect(() => {
    dispatch(GetDirectorCandidateById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/director_candidate_setup");
  };

  const handleEdit = () => {
    navigate(`/director_candidate_setup/data/${id}/edit`);
  };

  const handleDelete = () => {
    dispatch(DeleteDirectorCandidateData({ uuid: id }));
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold mb-4">
              Director Candidate
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-12 bg-slate-200 rounded px-2">
          <div className="col-span-6 md:col-span-2 py-1 text-[12px] text-primary">
            Data Director Candidate
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
              <p className="col-span-6 md:col-span-3">Voting Period</p>
              <p className="col-span-6 md:col-span-8">
                : {dataView?.voting_period?.name}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-3">Name</p>
              <p className="col-span-6 md:col-span-8">: {dataView?.name}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-3">Vision</p>
              <div className="col-span-6 md:col-span-8 flex gap-2">
                :
                <div
                  className="
                    
                    [&_ol]:list-decimal
                    [&_ol]:pl-6
                    [&_ul]:list-disc
                    [&_ul]:pl-6
                    [&_li]:mb-2
                  "
                  dangerouslySetInnerHTML={{
                    __html: dataView?.vision,
                  }}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-3">Mission</p>
              <div className="col-span-6 md:col-span-8 flex gap-2">
                :
                <div
                  className="
                    
                    [&_ol]:list-decimal
                    [&_ol]:pl-6
                    [&_ul]:list-disc
                    [&_ul]:pl-6
                    [&_li]:mb-2
                  "
                  dangerouslySetInnerHTML={{
                    __html: dataView?.mission,
                  }}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-3">Photo</p>
              <p className="col-span-6 md:col-span-8">
                : {dataView?.photo_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorCandidateDataViewByIdPage;
