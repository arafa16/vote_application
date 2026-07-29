import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";

const EmailQueueDataCreateForm = (props: any) => {
  const { formData, setFormData } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="subject">Subject</FormLabel>
            <FormInput
              id="subject"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.subject}
              disabled={true}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="To">To</FormLabel>
            <FormInput
              id="To"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.to}
              disabled={true}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="cc">Cc</FormLabel>
            <FormInput
              id="cc"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.cc}
              disabled={true}
              onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="bcc">Bcc</FormLabel>
            <FormInput
              id="bcc"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.bcc}
              disabled={true}
              onChange={(e) =>
                setFormData({ ...formData, bcc: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="type">Type</FormLabel>
            <FormInput
              id="type"
              type="text"
              formInputSize="sm"
              className="w-full"
              value={formData?.type}
              disabled={true}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="status">Status</FormLabel>
            <FormSelect
              id="status"
              formSelectSize="sm"
              value={formData?.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="sent">sent</option>
              <option value="failed">failed</option>
            </FormSelect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailQueueDataCreateForm;
