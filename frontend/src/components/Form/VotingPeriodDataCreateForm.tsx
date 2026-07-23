import React from "react";
import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";
import dayjs from "dayjs";

const VotingPeriodDataCreateForm = (props: any) => {
  const { formData, setFormData } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="name_user">Name</FormLabel>
            <FormInput
              id="name_user"
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
              placeholder=""
              value={formData?.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="start_date">Start Date</FormLabel>
            <FormInput
              id="start_date"
              type="datetime-local"
              step="1"
              formInputSize="sm"
              className="w-full"
              placeholder=""
              value={
                formData?.start_date
                  ? dayjs(formData.start_date).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              }
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="end_date">End Date</FormLabel>
            <FormInput
              id="end_date"
              type="datetime-local"
              step="1"
              formInputSize="sm"
              className="w-full"
              placeholder=""
              value={
                formData?.end_date
                  ? dayjs(formData.end_date).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              }
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="is_active">Status</FormLabel>
            <FormSelect
              id="is_active"
              formSelectSize="sm"
              value={formData?.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.value })
              }
            >
              <option value={1}>active</option>
              <option value={0}>inactive</option>
            </FormSelect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPeriodDataCreateForm;
