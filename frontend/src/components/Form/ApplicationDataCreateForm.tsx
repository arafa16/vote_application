import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";

const ApplicationDataCreateForm = (props: any) => {
  const { formData, setFormData, chagePhoto } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput
              id="name"
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
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormInput
              id="description"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="file">Image</FormLabel>
            <FormInput
              id="file"
              type="file"
              formInputSize="sm"
              className="w-full"
              onChange={chagePhoto}
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
        <div className="col-span-12 md:col-span-1 grid grid-cols-12">
          {formData?.file_url && (
            <div className="col-span-12">
              <img
                src={formData.file_url}
                alt="image"
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDataCreateForm;
