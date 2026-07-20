import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../base-components/Table";
import Lucide from "../../base-components/Lucide";
import LoadingIcon from "../../base-components/LoadingIcon";
import Button from "../../base-components/Button";
import { FormInput, FormSelect } from "../../base-components/Form";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import {
  GetCompanyTable,
  resetCompany,
} from "../../stores/features/CompanySlice";
import dayjs from "dayjs";

const CompanyDataTablePage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [dataTable, setDataTable] = useState<any>(null);
  const [metaTableData, setMetaTableData] = useState<any>(null);
  const [search, setSearch] = useState<any>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
      setDataTable(dataCompany?.data);
      setMetaTableData(dataCompany?.meta);
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
    if (search !== "") {
      const handler = setTimeout(() => {
        const paramsObj: any = {
          page,
          limit,
          search,
        };
        const searchParams = new URLSearchParams(paramsObj);
        dispatch(GetCompanyTable(searchParams));
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    } else {
      const paramsObj: any = {
        page,
        limit,
        search,
      };
      const searchParams = new URLSearchParams(paramsObj);
      dispatch(GetCompanyTable(searchParams));
    }
  }, [dispatch, page, limit, search]);

  const handleNext = () => {
    let count = page + 1;
    if (count <= metaTableData?.pages) {
      setPage(count);
    }
  };

  const handlePrev = () => {
    let count = page - 1;
    if (count > 0) {
      setPage(count);
    }
  };

  const handleChangeLimit = (data: number) => {
    setLimit(data);
  };

  const handleCreate = () => {
    navigate("/company/create");
  };

  const handleClickData = (id: any) => {
    navigate(`/company/data/${id}`);
  };

  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold">
              Company
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-12 mb-2">
          <div
            className={`col-span-2 md:col-span-1 h-1 ${!isLoadingCompany ? "hidden" : ""}`}
          >
            <LoadingIcon
              icon="three-dots"
              color="#005266"
              className="w-5 h-5 "
            />
          </div>
          <div className="col-span-10 col-start-3 md:col-span-2 md:col-start-11 flex justify-end gap-2">
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="text-[12px]"
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-2 grid items-end mb-2 gap-x-2">
          <div className="col-span-12 md:col-span-2 grid items-end mb-2 md:mb-0">
            <FormInput
              id="crud-form-1"
              type="text"
              className="w-full"
              placeholder="Search by name"
              formInputSize="sm"
              value={search}
              onChange={handleChangeSearch}
            />
          </div>

          <div className="col-span-12 md:col-span-2 md:col-start-11 flex justify-end">
            <div className="grid mx-2">
              <FormInput
                id="crud-form-1"
                type="number"
                className="w-20 text-center"
                placeholder="10"
                formInputSize="sm"
                value={limit}
                onChange={(e: any) => handleChangeLimit(e.target.value)}
              />
            </div>
            <div className={`text-slate-500 flex items-center gap-x-2`}>
              <p>{metaTableData?.page}</p>
              <p>of</p>
              <p>{metaTableData?.pages}</p>
              <p>page</p>
            </div>
            <div
              className="mt-1 flex items-center justify-center w-5 h-5 ml-5 cursor-pointer hover:rounded-full hover:bg-primary hover:text-white"
              onClick={() => handlePrev()}
            >
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </div>
            <div
              className="mt-1 flex items-center justify-center w-5 h-5 ml-5 cursor-pointer hover:rounded-full hover:bg-primary hover:text-white"
              onClick={() => handleNext()}
            >
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="box">
          <div className="overflow-x-auto">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="whitespace-nowrap">No</Table.Th>
                  <Table.Th className="whitespace-nowrap">Name</Table.Th>
                  <Table.Th className="whitespace-nowrap">Sequence</Table.Th>
                  <Table.Th className="whitespace-nowrap">Code</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {dataTable?.map((data: any, index: any) => (
                  <Table.Tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleClickData(data?.uuid)}
                  >
                    <Table.Td className="whitespace-nowrap">
                      {page > 1 ? (page - 1) * limit + index + 1 : index + 1}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.name}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.sequence}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.code}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </div>
        <div className="grid grid-cols-12  mb-24">
          <div className="col-span-12 md:col-span-2 md:col-start-11 flex justify-end gap-2 text-slate-500 flex mr-2 mt-1">
            <p>limit {metaTableData?.limit}</p>
            <p>of</p>
            <p>{metaTableData?.total}</p>
            <p>data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDataTablePage;
