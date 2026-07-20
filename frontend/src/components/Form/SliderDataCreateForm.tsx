import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";

const SliderDataCreateForm = (props: any) => {
  const { formData, setFormData, chagePhoto } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="page_view">Page View</FormLabel>
            <FormSelect
              id="page_view"
              formSelectSize="sm"
              value={formData?.page_view}
              onChange={(e) =>
                setFormData({ ...formData, page_view: e.target.value })
              }
            >
              <option value=""></option>
              <option value="beranda">beranda</option>
              <option value="voting_procedur">voting procedur</option>
            </FormSelect>
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
        <div className="col-span-12 md:col-span-12 grid grid-cols-12">
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

export default SliderDataCreateForm;
