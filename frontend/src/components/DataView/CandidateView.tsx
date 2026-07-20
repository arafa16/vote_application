import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import LoadingIcon from "../../base-components/LoadingIcon";

const CandidateView = (props: any) => {
  const {
    data,
    voting_period_uuid,
    user_uuid,
    color,
    view_button,
    is_loading,
    is_check,
    handleClick,
  } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 mb-2">
        <div
          className={`col-span-11 md:col-span-3 bg-${color} mt-2 mx-4 rounded-lg flex justify-center items-center`}
        >
          <p className="text-[14px] my-2 mx-4 text-white capitalize">
            {data?.name}
          </p>
          <Lucide
            icon="CheckCircle"
            className={`block mx-2 text-white ${is_check ? "" : "hidden"}`}
          />
        </div>
      </div>
      <div className="my-2 py-2 px-4 text-xl grid grid-cols-12 gap-x-4">
        <div className="h-40 md:h-96 px-2 col-span-12 md:col-span-12 lg:col-span-7">
          <div className="h-full overflow-hidden rounded-md image-fit">
            <img
              alt="file not found"
              src={import.meta.env.VITE_REACT_APP_API_URL + data?.photo_url}
            />
          </div>
        </div>
        <div className="px-2 col-span-12 lg:col-span-5 text-[14px]">
          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-12 grid grid-cols-12">
              <div className="col-span-2 md:col-span-1">Visi</div>
              <div className="col-span-1">:</div>
            </div>
            <div className="col-span-12 grid grid-cols-12 px-4">
              <div className="col-span-12 md:col-span-11 flex gap-2">
                <div className="col-span-11 flex gap-y-2 whitespace-pre-line text-justify">
                  <div
                    className="
                    [&_ol]:list-decimal
                    [&_ol]:pl-6
                    [&_ul]:list-disc
                    [&_ul]:pl-6
                    [&_li]:mb-2
                  "
                    dangerouslySetInnerHTML={{
                      __html: data?.vision,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-12 grid grid-cols-12">
              <div className="col-span-2 md:col-span-1">Misi</div>
              <div className="col-span-1">:</div>
            </div>
            <div className="col-span-12 grid grid-cols-12 px-2">
              <div className="col-span-12 md:col-span-11 flex gap-2">
                <div className="col-span-11 flex gap-y-2 whitespace-pre-line text-justify">
                  <div
                    className="
                    [&_ol]:list-decimal
                    [&_ol]:pl-6
                    [&_ul]:list-disc
                    [&_ul]:pl-6
                    [&_li]:mb-2
                  "
                    dangerouslySetInnerHTML={{
                      __html: data?.mission,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mb-4 px-4 flex justify-end ${view_button ? "" : "hidden"}`}
      >
        {" "}
        <LoadingIcon
          icon="tail-spin"
          className={`w-10 h-10 ${is_loading ? "" : "hidden"}`}
        />
        <Button
          size="sm"
          variant="primary"
          className={`w-full md:w-auto md:px-10 md:py-2 ${is_loading ? "hidden" : ""}`}
          onClick={() =>
            handleClick({
              voting_period_uuid: voting_period_uuid,
              user_uuid: user_uuid,
              candidate_uuid: data?.uuid,
            })
          }
        >
          <Lucide icon="CheckSquare" className="block mx-2 text-white " />
          Pilih Kandidat
        </Button>
      </div>
    </div>
  );
};

export default CandidateView;
