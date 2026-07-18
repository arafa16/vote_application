import Lucide from "../../base-components/Lucide";
import { FormSelect } from "../../base-components/Form";

const VotingPeriodForm = (props: any) => {
  const { datas, dataSelect, handleChange } = props;

  return (
    <div className="box w-full flex items-center gap-x-6 md:gap-x-2 px-2 py-4">
      <div className="mx-2">
        <Lucide
          icon="Calendar"
          className="block mx-auto text-primary w-10 h-10"
        />
      </div>
      <div className={`w-full`}>
        <p className="text-[12px] mb-1">Periode Voting:</p>
        <div className={`${datas === null ? "hidden" : ""}`}>
          <FormSelect
            formSelectSize="sm"
            name="votingPeriodSelected"
            value={dataSelect}
            onChange={handleChange}
          >
            <option value={""}></option>
            {datas?.map((data: any, index: any) => (
              <option key={index} value={data.uuid}>
                {data.name}
              </option>
            ))}
          </FormSelect>
        </div>
      </div>
    </div>
  );
};

export default VotingPeriodForm;
