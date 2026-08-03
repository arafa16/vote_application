import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../base-components/Table";
import Lucide from "../../base-components/Lucide";
import LoadingIcon from "../../base-components/LoadingIcon";
import { FormInput, FormSelect } from "../../base-components/Form";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import {
  GetEmailDataTable,
  resetEmail,
} from "../../stores/features/EmailSlice";
import { PrivilegeCheck } from "../../utils/privilege-check";

const EmailQueueTablePage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [dataTable, setDataTable] = useState<any>(null);
  const [metaTableData, setMetaTableData] = useState<any>(null);

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState<any>(searchParams.get("search") || "");
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get("limit")) || 10,
  );
  const [status, setStatus] = useState<string>(
    searchParams.get("status") || "pending",
  );
  const [type, setType] = useState<string>(searchParams.get("type") || "");

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

  useEffect(() => {
    if (meData !== null) {
      PrivilegeCheck(meData?.privilege?.setting, navigate);
    }
  }, [meData]);

  const {
    data: dataEmail,
    isLoading: isLoadingEmail,
    isError: isErrorEmail,
    isSuccess: isSuccessEmail,
    message: messageEmail,
  } = useSelector((state: any) => state.email);

  useEffect(() => {
    if (dataEmail !== null && isSuccessEmail && !isLoadingEmail) {
      setDataTable(dataEmail?.data);
      setMetaTableData(dataEmail?.meta);
      dispatch(resetEmail());
    } else if (messageEmail !== "" && isErrorEmail && !isLoadingEmail) {
      dispatch(resetEmail());
    }
  }, [dataEmail, isLoadingEmail, isErrorEmail, isSuccessEmail, messageEmail]);

  useEffect(() => {
    if (search === "" && status === "") {
      const paramsObj: any = {
        page,
        limit,
      };
      const searchParams = new URLSearchParams(paramsObj);
      dispatch(GetEmailDataTable({ searchParams }));
    } else {
      const handler = setTimeout(() => {
        const paramsObj: any = {
          page,
          limit,
        };

        if (search !== "") {
          paramsObj.search = search;
        }

        if (status !== "") {
          paramsObj.status = status;
        }

        if (type !== "") {
          paramsObj.type = type;
        }

        const searchParams = new URLSearchParams(paramsObj);
        dispatch(GetEmailDataTable({ searchParams }));
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [dispatch, page, limit, search, status, type]);

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

  const handleClickData = (id: any) => {
    navigate(
      `/email/data/${id}?page=${page}&limit=${limit}&search=${search}&status=${status}&type=${type}`,
    );
  };

  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleChangeStatus = (e: any) => {
    setStatus(e.target.value);
  };

  const handleChangeType = (e: any) => {
    setType(e.target.value);
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold">
              Email
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-12 mb-2">
          <div className={`col-span-2 md:col-span-1 h-1 `}>
            <LoadingIcon
              icon="three-dots"
              color="#005266"
              className={`w-5 h-5 ${!isLoadingEmail ? "hidden" : ""}`}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-2 grid items-end mb-2 gap-x-2">
          <div className="col-span-12 md:col-span-2 grid items-end mb-2 md:mb-0">
            <FormInput
              id="subject_email"
              type="text"
              className="w-full"
              placeholder="Search by To"
              formInputSize="sm"
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
          <div className="col-span-12 md:col-span-2 grid items-end mb-2 md:mb-0">
            <FormSelect
              id="status"
              formSelectSize="sm"
              value={status}
              onChange={handleChangeStatus}
            >
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="sent">sent</option>
              <option value="failed">failed</option>
            </FormSelect>
          </div>
          <div className="col-span-12 md:col-span-2 grid items-end mb-2 md:mb-0">
            <FormSelect
              id="type"
              formSelectSize="sm"
              value={type}
              onChange={handleChangeType}
            >
              <option value="">All</option>
              <option value="invitation">invitation</option>
              <option value="verification">verification</option>
              <option value="notification">notification</option>
              <option value="reminder">reminder</option>
              <option value="password_reset">password_reset</option>
            </FormSelect>
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
                  <Table.Th className="whitespace-nowrap">Subject</Table.Th>
                  <Table.Th className="whitespace-nowrap">To</Table.Th>
                  <Table.Th className="whitespace-nowrap">Cc</Table.Th>
                  <Table.Th className="whitespace-nowrap">Bcc</Table.Th>
                  <Table.Th className="whitespace-nowrap">Type</Table.Th>
                  <Table.Th className="whitespace-nowrap">Retry Count</Table.Th>
                  <Table.Th className="whitespace-nowrap">Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {dataTable?.map((data: any, index: any) => (
                  <Table.Tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleClickData(data?.uuid)}
                    key={index}
                  >
                    <Table.Td className="whitespace-nowrap">
                      {page > 1 ? (page - 1) * limit + index + 1 : index + 1}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.subject}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.to}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.cc}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.bcc}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.type}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.retry_count}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.status}
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

export default EmailQueueTablePage;
