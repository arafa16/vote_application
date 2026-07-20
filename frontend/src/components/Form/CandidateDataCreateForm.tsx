import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";
import { ClassicEditor } from "../../base-components/Ckeditor";

const CandidateDataCreateForm = (props: any) => {
  const { formData, setFormData, attributes, chagePhoto } = props;
  const editorConfig = {
    toolbar: {
      items: ["bold", "italic", "numberedList"],
    },
  };

  return (
    <div className="box">
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="voting_period">Voting Period</FormLabel>
            <FormSelect
              id="voting_period"
              formSelectSize="sm"
              value={formData?.voting_period_uuid}
              onChange={(e) =>
                setFormData({ ...formData, voting_period_uuid: e.target.value })
              }
            >
              <option value=""></option>
              {attributes?.voting_period?.map((data: any, index: any) => (
                <option value={data?.uuid} key={index}>
                  {data?.name}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="name_candidate">Name</FormLabel>
            <FormInput
              id="name_candidate"
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
            <FormLabel htmlFor="vision">Vision</FormLabel>
            <ClassicEditor
              id="vision"
              value={formData?.vision}
              config={editorConfig}
              onChange={(value: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  vision: value,
                }))
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="mission">Mission</FormLabel>
            <ClassicEditor
              id="mission"
              value={formData?.mission}
              config={editorConfig}
              onChange={(value: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  mission: value,
                }))
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="file">Photo</FormLabel>
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
          {formData?.file_url && (
            <div className="col-span-12">
              <img
                src={formData.file_url}
                alt="photo"
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDataCreateForm;
