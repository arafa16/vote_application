import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import LoadingIcon from "../../base-components/LoadingIcon";

const CandidateVoteView = (props: any) => {
  const {
    data,
    voting_period_uuid,
    user_uuid,
    view_button,
    is_view_cancel,
    is_loading,
    is_check,
    handleClick,
    handleClickCancel,
  } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 mb-2">
        <div
          className={`${is_view_cancel ? "col-span-8" : "col-span-12"} md:col-span-6 mt-2 mx-4 rounded-lg flex justify-start items-center`}
        >
          <p className="text-[14px] my-2 mx-4 text-primary capitalize">
            {data?.name}
          </p>
          <Lucide
            icon="CheckCircle"
            className={`block mx-2 text-primary ${is_check ? "" : "hidden"}`}
          />
        </div>
        <div
          className={`${is_view_cancel ? "" : "hidden"} col-span-4 md:col-span-6 px-4 flex justify-end items-center`}
        >
          <Lucide
            icon="XSquare"
            className={` text-primary text-red-500 hover:bg-red-500 hover:text-white rounded cursor-pointer`}
            onClick={handleClickCancel}
          />
        </div>
      </div>
      <div className="my-2 py-2 px-4 text-xl grid grid-cols-12 gap-x-4">
        <div className="h-full w-full px-2 col-span-12">
          <div className="w-full overflow-hidden rounded-md">
            <img
              className="h-full w-full object-cover md:h-auto md:w-full"
              alt="file not found"
              src={import.meta.env.VITE_REACT_APP_API_URL + data?.photo_url}
            />
          </div>
        </div>
      </div>
      <div
        className={`mb-4 px-4 flex justify-end ${view_button ? "" : "hidden"}`}
      >
        {" "}
        <LoadingIcon
          icon="tail-spin"
          className={`w-8 h-8 ${is_loading ? "" : "hidden"}`}
        />
        <Button
          size="sm"
          variant="primary"
          className={`w-full md:w-auto text-[12px] md:px-10 md:py-1 ${is_loading ? "hidden" : ""}`}
          onClick={() =>
            handleClick({
              voting_period_uuid: voting_period_uuid,
              user_uuid: user_uuid,
              candidate_uuid: data?.uuid,
            })
          }
        >
          <Lucide icon="CheckSquare" className="block mx-2 text-white " />
          Pilih {data?.name}
        </Button>
      </div>
    </div>
  );
};

export default CandidateVoteView;
