import dayjs from "dayjs";
const HistoryView = (props: any) => {
  const { history } = props;

  return (
    <div className="box w-full p-4">
      <p className="font-semibold text-[12px]">History</p>
      {history && history.length > 0 ? (
        history.map((item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-y-2 gap-x-12 mt-4 bg-gray-100 p-4 rounded-lg"
          >
            <div className="col-span-12">
              <p>
                Note by {item?.user?.name} -{" "}
                {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </p>
            </div>
            <article className="col-span-7 md:col-span-12">
              <p className="text-wrap">- {item.description}</p>
            </article>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No history available</p>
      )}
      {/* <div className="flex justify-between mt-4 border-b">
        <div className="flex justify-start gap-12 py-1">
          <p>name</p>
          <p>description</p>
        </div>
        <div>
          <p>2025-05-05</p>
        </div>
      </div> */}
    </div>
  );
};

export default HistoryView;
