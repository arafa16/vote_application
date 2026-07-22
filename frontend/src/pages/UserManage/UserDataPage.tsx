import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import {
  GetUserTable,
  GetCreateAttribute,
  resetUser,
} from "../../stores/features/UserSlice";
import Table from "../../base-components/Table";
import { FormInput, FormSelect } from "../../base-components/Form";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import LoadingIcon from "../../base-components/LoadingIcon";
import dayjs from "dayjs";

const UserDataPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [userDatas, setUserDatas] = useState<any>(null);
  const [metaTableData, setMetaTableData] = useState<any>(null);
  const [search, setSearch] = useState<any>("");
  const [groupDatas, setGroupDatas] = useState<any>(null);
  const [group, setGroup] = useState<any>("");
  const [statusDatas, setStatusDatas] = useState<any>(null);
  const [status, setStatus] = useState<any>("");

  const [searchParams] = useSearchParams();

  const [page, setPage] = useState<number | any>(
    Number(searchParams.get("page")) || 1,
  );
  const [limit, setLimit] = useState<number | any>(
    Number(searchParams.get("limit")) || 10,
  );

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
    data: dataUser,
    dataAttribute: dataAttributeUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
    message: messageUser,
  } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (dataUser !== null && isSuccessUser && !isLoadingUser) {
      setUserDatas(dataUser?.data);
      setMetaTableData(dataUser?.meta);
      dispatch(resetUser());
    } else if (dataAttributeUser !== null && isSuccessUser && !isLoadingUser) {
      setGroupDatas(dataAttributeUser?.data?.company);
      setStatusDatas(dataAttributeUser?.data?.status);
      dispatch(resetUser());
    } else if (messageUser !== "" && isErrorUser && !isLoadingUser) {
      dispatch(resetUser());
    }
  }, [dataUser, isLoadingUser, isErrorUser, isSuccessUser, messageUser]);

  useEffect(() => {
    dispatch(GetUserTable());
    dispatch(GetCreateAttribute());
  }, [dispatch]);

  useEffect(() => {
    if (search === "" && group === "" && status === "") {
      const paramsObj: any = {
        page,
        limit,
      };
      const searchParams = new URLSearchParams(paramsObj);

      dispatch(GetUserTable(searchParams));
    } else {
      const handler = setTimeout(() => {
        const paramsObj: any = {
          page,
          limit,
        };
        if (search !== "") {
          paramsObj.search = search;
        }
        if (group !== "") {
          paramsObj.company = group;
        }
        if (status !== "") {
          paramsObj.status = status;
        }

        const searchParams = new URLSearchParams(paramsObj);
        dispatch(GetUserTable(searchParams));
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [search, group, status, page, limit]);

  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleChangeGroup = (e: any) => {
    setGroup(e.target.value);
  };

  const handleChangeStatus = (e: any) => {
    setStatus(e.target.value);
  };

  const handleClickData = (id: any) => {
    navigate(`/user/${id}?page=${page}&limit=${limit}`);
  };

  const handleNext = () => {
    let count = page + 1;
    console.log("cek data", metaTableData?.pages, count, page);
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
    navigate("/user_create");
  };

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold">
              Data User
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-12 mb-2">
          <div
            className={`col-span-2 md:col-span-1 h-1 ${isLoadingUser ? "" : "hidden"}`}
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
                className="text-[12px] w-full"
              >
                Export Data
              </Button>
            </div>
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
              placeholder="Search by name or nik"
              formInputSize="sm"
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
          <div className="col-span-12 md:col-span-2 grid items-end mb-2 md:mb-0">
            <FormSelect
              id="group"
              formSelectSize="sm"
              value={group}
              onChange={handleChangeGroup}
            >
              <option value="">All Group</option>
              {groupDatas?.map((data: any, index: any) => (
                <option value={data?.uuid} key={index}>
                  {data?.name}
                </option>
              ))}
            </FormSelect>
          </div>
          <div className="col-span-12 md:col-span-2 grid items-end mb-2 md:mb-0">
            <FormSelect
              id="status"
              formSelectSize="sm"
              value={status}
              onChange={handleChangeStatus}
            >
              <option value="">All Status</option>
              {statusDatas?.map((data: any, index: any) => (
                <option
                  value={data?.uuid}
                  key={index}
                  className={`${data?.code === "4" ? "hidden" : ""}`}
                >
                  {data?.name}
                </option>
              ))}
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
                  <Table.Th className="whitespace-nowrap">Nama</Table.Th>
                  <Table.Th className="whitespace-nowrap">
                    Nomor Anggota
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap">Email</Table.Th>
                  <Table.Th className="whitespace-nowrap">Group</Table.Th>
                  <Table.Th className="whitespace-nowrap">
                    Verification Date
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap">
                    Verification
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap">
                    Status Anggota
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap">Status User</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {userDatas?.map((data: any, index: any) => (
                  <Table.Tr
                    className="cursor-pointer hover:bg-gray-100"
                    key={index}
                    onClick={() => handleClickData(data.uuid)}
                  >
                    <Table.Td className="whitespace-nowrap">
                      {page > 1 ? (page - 1) * limit + index + 1 : index + 1}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.name}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.membership_number}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.email}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.company?.name}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.verification_date &&
                        dayjs(data?.verification_date).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {`${data?.is_verified ? "verified" : "unverified"}`}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {`${data?.is_member ? "Anggota" : "Bukan Anggota"}`}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.status?.name}
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

export default UserDataPage;
