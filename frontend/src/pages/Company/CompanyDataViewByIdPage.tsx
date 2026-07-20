import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetCompanyById,
  DeleteCompanyData,
  resetCompany,
} from "../../stores/features/CompanySlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import dayjs from "dayjs";
import { Menu, Dialog } from "../../base-components/Headless";
import { useNavigate, useParams } from "react-router-dom";
import { FormInput, FormLabel } from "../../base-components/Form";

const CompanyDataViewByIdPage = () => {
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
    data: dataCompany,
    isLoading: isLoadingCompany,
    isError: isErrorCompany,
    isSuccess: isSuccessCompany,
    message: messageCompany,
  } = useSelector((state: any) => state.company);

  useEffect(() => {
    if (dataCompany !== null && isSuccessCompany && !isLoadingCompany) {
      setDataView(dataCompany?.data);
      dispatch(resetCompany());
    } else if (messageCompany !== "" && isErrorCompany && !isLoadingCompany) {
      dispatch(resetCompany());
    } else if (messageCompany !== "" && isSuccessCompany && !isLoadingCompany) {
      navigate("/company");
      dispatch(resetCompany());
    } else if (messageCompany !== "" && isErrorCompany && !isLoadingCompany) {
      dispatch(resetCompany());
    }
  }, [
    dataCompany,
    isLoadingCompany,
    isErrorCompany,
    isSuccessCompany,
    messageCompany,
  ]);

  useEffect(() => {
    dispatch(GetCompanyById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/company");
  };

  const handleEdit = () => {
    navigate(`/company/data/${id}/edit`);
  };

  const handleDelete = () => {
    dispatch(DeleteCompanyData({ uuid: id }));
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold mb-4">
              Company
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-12 bg-slate-200 rounded px-2">
          <div className="col-span-6 md:col-span-2 py-1 text-[12px] text-primary">
            Data Company
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
              <p className="col-span-6 md:col-span-3">Name</p>
              <p className="col-span-6 md:col-span-8">: {dataView?.name}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-3">Sequence</p>
              <p className="col-span-6 md:col-span-8">: {dataView?.sequence}</p>
            </div>
            <div className="col-span-12 md:col-span-6 grid grid-cols-12">
              <p className="col-span-6 md:col-span-3">Code</p>
              <p className="col-span-6 md:col-span-8">: {dataView?.code}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDataViewByIdPage;
