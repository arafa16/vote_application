import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetCompanyById,
  UpdateCompanyData,
  resetCompany,
} from "../../stores/features/CompanySlice";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import CompanyDataCreateForm from "../../components/Form/TempDataCreateForm";
import LoadingIcon from "../../base-components/LoadingIcon";

const CompanyDataEditPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    sequence: "",
    code: "",
  });

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
    isLoadingPatch: isLoadingPatchCompany,
    isError: isErrorCompany,
    isSuccess: isSuccessCompany,
    message: messageCompany,
    messagePatch: messagePatchCompany,
  } = useSelector((state: any) => state.company);

  useEffect(() => {
    if (dataCompany !== null && isSuccessCompany && !isLoadingCompany) {
      setFormData({
        ...formData,
        name: dataCompany?.data?.name,
        sequence: dataCompany?.data?.sequence,
        code: dataCompany?.data?.code,
      });
      dispatch(resetCompany());
    } else if (messageCompany !== "" && isErrorCompany && !isLoadingCompany) {
      dispatch(resetCompany());
    }

    if (
      messagePatchCompany !== "" &&
      isSuccessCompany &&
      !isLoadingPatchCompany
    ) {
      navigate(`/company/data/${id}`);
      dispatch(resetCompany());
    } else if (
      messagePatchCompany !== "" &&
      isErrorCompany &&
      !isLoadingPatchCompany
    ) {
      dispatch(resetCompany());
    }
  }, [
    dataCompany,
    isLoadingCompany,
    isLoadingPatchCompany,
    isErrorCompany,
    isSuccessCompany,
    messageCompany,
    messagePatchCompany,
  ]);

  const handleSubmit = () => {
    dispatch(UpdateCompanyData({ uuid: id, formData }));
  };

  useEffect(() => {
    dispatch(GetCompanyById(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/company/data/${id}`);
  };

  const chagePhoto = (e: any) => {
    const photo = e.target.files[0];

    if (!photo) return;

    const preview = URL.createObjectURL(photo);

    setFormData((prev: any) => ({
      ...prev,
      file: photo,
      file_url: preview,
    }));
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
            Edit Company
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
              className={`${isLoadingCompany ? "" : "hidden"} h-6 w-6`}
            />
            <Button
              variant="primary"
              className={`${isLoadingCompany ? "hidden" : ""} py-1`}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="mt-1">
          <CompanyDataCreateForm
            formData={formData}
            setFormData={setFormData}
            chagePhoto={chagePhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDataEditPage;
