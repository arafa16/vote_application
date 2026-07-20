import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";
import { ClassicEditor } from "../../base-components/Ckeditor";

const AuditLogDataCreateForm = (props: any) => {
  const { formData, setFormData, attributes } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="user_uuid">User</FormLabel>
            <FormSelect
              id="user_uuid"
              formSelectSize="sm"
              value={formData?.user_uuid}
              onChange={(e) =>
                setFormData({ ...formData, user_uuid: e.target.value })
              }
            >
              <option value=""></option>
              {attributes?.users?.map((data: any, index: any) => (
                <option value={data?.uuid} key={index}>
                  {data?.name}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="activity">Activity</FormLabel>
            <FormInput
              id="activity"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.activity}
              onChange={(e) =>
                setFormData({ ...formData, activity: e.target.value })
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
      </div>
    </div>
  );
};

export default AuditLogDataCreateForm;
