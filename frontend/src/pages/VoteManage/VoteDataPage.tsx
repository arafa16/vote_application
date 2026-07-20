import { useEffect, useState } from "react";
import VotingPeriodForm from "../../components/Form/VotingPeriodForm";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetMe, resetGetMe } from "../../stores/features/GetMeSlice";
import {
  GetVotingPeriodDatas,
  resetVotingPeriod,
} from "../../stores/features/VotingPeriodSlice";
import {
  GetStatusVotingTable,
  GetStatusVotingTableAttribute,
  resetStatusVoting,
} from "../../stores/features/StatusVotingSlice";
import Table from "../../base-components/Table";
import { FormInput, FormSelect } from "../../base-components/Form";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import dayjs from "dayjs";
import LoadingIcon from "../../base-components/LoadingIcon";

const VoteDataPage = () => {
  const [meData, setMeData] = useState<any>(null);
  const [votingPeriodDatas, setVotingPeriodDatas] = useState<any>(null);
  const [votingPeriodSelected, setVotingPeriodSelected] = useState<any>("");
  const [statusVotingDatas, setStatusVotingDatas] = useState<any>(null);
  const [metaTableData, setMetaTableData] = useState<any>(null);
  const [search, setSearch] = useState<any>("");
  const [groupDatas, setGroupDatas] = useState<any>(null);
  const [group, setGroup] = useState<any>("");
  const [statusDatas, setStatusDatas] = useState<any>(null);
  const [status, setStatus] = useState<any>("");

  const [searchParams] = useSearchParams();

  const [page, setPage] = useState<number | any>(searchParams.get("page") || 1);
  const [limit, setLimit] = useState<number | any>(
    searchParams.get("limit") || 10,
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
    data: dataVotingPeriod,
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
      setVotingPeriodDatas(dataVotingPeriod?.data);
      setVotingPeriodSelected(dataVotingPeriod?.data[0]?.uuid);
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
    dispatch(GetVotingPeriodDatas());
  }, [dispatch]);

  //get data voting
  const {
    data: dataStatusVoting,
    data_attribute: dataStatusVotingAttribute,
    isLoading: isLoadingStatusVoting,
    isError: isErrorStatusVoting,
    isSuccess: isSuccessStatusVoting,
    message: messageStatusVoting,
  } = useSelector((state: any) => state.statusVoting);

  useEffect(() => {
    if (
      dataStatusVoting !== null &&
      isSuccessStatusVoting &&
      !isLoadingStatusVoting
    ) {
      setStatusVotingDatas(dataStatusVoting?.data);
      setMetaTableData(dataStatusVoting?.meta);
      dispatch(resetStatusVoting());
    } else if (
      dataStatusVotingAttribute !== null &&
      isSuccessStatusVoting &&
      !isLoadingStatusVoting
    ) {
      setGroupDatas(dataStatusVotingAttribute?.data?.company);
      setStatusDatas(dataStatusVotingAttribute?.data?.status_voting);
      dispatch(resetStatusVoting());
    } else if (
      messageStatusVoting !== "" &&
      isErrorStatusVoting &&
      !isLoadingStatusVoting
    ) {
      dispatch(resetStatusVoting());
    }
  }, [
    dataStatusVoting,
    dataStatusVotingAttribute,
    isLoadingStatusVoting,
    isErrorStatusVoting,
    isSuccessStatusVoting,
    messageStatusVoting,
  ]);

  useEffect(() => {
    dispatch(GetStatusVotingTableAttribute());
  }, [dispatch]);

  useEffect(() => {
    if (
      search === "" &&
      group === "" &&
      status === "" &&
      votingPeriodSelected !== ""
    ) {
      const paramsObj: any = {
        page,
        limit,
        voting_period_uuid: votingPeriodSelected,
      };
      const searchParams = new URLSearchParams(paramsObj);

      dispatch(GetStatusVotingTable(searchParams));
    } else if (votingPeriodSelected !== "") {
      const handler = setTimeout(() => {
        const paramsObj: any = {
          page,
          limit,
          voting_period_uuid: votingPeriodSelected,
        };
        if (search !== "") {
          paramsObj.search = search;
        }
        if (group !== "") {
          paramsObj.company = group;
        }
        if (status !== "") {
          paramsObj.status_vote = status;
        }

        const searchParams = new URLSearchParams(paramsObj);
        dispatch(GetStatusVotingTable(searchParams));
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setStatusVotingDatas(null);
      setMetaTableData(null);
    }
  }, [search, group, status, page, limit, votingPeriodSelected]);

  const handleChangeVotingPeriod = (e: any) => {
    setVotingPeriodSelected(e.target.value);
  };

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
    navigate(`/vote_data/${id}?page=${page}&limit=${limit}`);
  };

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

  return (
    <div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 md:col-span-8 py-4">
          <div className="grid gap-y-4">
            <p className="text-[14px] mb-1 text-primary">e-VOTING</p>
            <p className="capitalize text-[24px] text-primary font-bold mb-4">
              Status Voting Anggota
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 col-start-1 md:col-start-10 mb-4">
          <VotingPeriodForm
            datas={votingPeriodDatas}
            dataSelect={votingPeriodSelected}
            handleChange={handleChangeVotingPeriod}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-12 mb-2">
          <div
            className={`col-span-2 md:col-span-1 h-1 ${isLoadingStatusVoting ? "" : "hidden"}`}
          >
            <LoadingIcon
              icon="three-dots"
              color="#005266"
              className="w-5 h-5 "
            />
          </div>
          <div className="col-span-10 col-start-3 md:col-span-1 md:col-start-12 flex justify-end ">
            <Button variant="outline-primary" size="sm" className="text-[12px]">
              Export Data
            </Button>
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
                <option value={data?.value} key={index}>
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
                  <Table.Th className="whitespace-nowrap">Group</Table.Th>
                  <Table.Th className="whitespace-nowrap">
                    Verification Date
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap">
                    Voting Pengawas
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap">
                    Voting Pengurus
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap">
                    Status Voting
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {statusVotingDatas?.map((data: any, index: any) => (
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
                      {data?.company?.name}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.verification_date &&
                        dayjs(data?.verification_date).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.commissioner_vote_date.length === 0
                        ? "-"
                        : data?.commissioner_vote_date?.map(
                            (item: any, index: any) => (
                              <p key={index}>
                                {item?.vote_time &&
                                  dayjs(item?.vote_time).format(
                                    "YYYY-MM-DD HH:mm:ss",
                                  )}
                              </p>
                            ),
                          )}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.director_vote_date.length === 0
                        ? "-"
                        : data?.director_vote_date?.map(
                            (item: any, index: any) => (
                              <p key={index}>
                                {item?.vote_time &&
                                  dayjs(item?.vote_time).format(
                                    "YYYY-MM-DD HH:mm:ss",
                                  )}
                              </p>
                            ),
                          )}
                    </Table.Td>
                    <Table.Td className="whitespace-nowrap">
                      {data?.status_vote ? (
                        <p className="bg-primary/70 w-fit px-2 text-[10px] rounded-lg text-white">
                          Sudah Voting
                        </p>
                      ) : (
                        <p className="bg-warning/70 w-fit px-2 text-[10px] rounded-lg text-white">
                          Belum Voting
                        </p>
                      )}
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

export default VoteDataPage;
