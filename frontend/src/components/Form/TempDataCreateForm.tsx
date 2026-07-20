import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";

const TempDataCreateForm = (props: any) => {
  const { formData, setFormData, chagePhoto } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="name_company">Name</FormLabel>
            <FormInput
              id="name_company"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="sequence">Sequence</FormLabel>
            <FormInput
              id="sequence"
              type="number"
              formInputSize="sm"
              className="w-full"
              value={formData?.sequence}
              onChange={(e) =>
                setFormData({ ...formData, sequence: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="code">Code</FormLabel>
            <FormInput
              id="code"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempDataCreateForm;
