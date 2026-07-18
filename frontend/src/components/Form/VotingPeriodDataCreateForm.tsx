import React from "react";
import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";

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
              type="date"
              formInputSize="sm"
              className="w-full"
              placeholder=""
              value={formData?.start_date}
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
              type="date"
              formInputSize="sm"
              className="w-full"
              placeholder=""
              value={formData?.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPeriodDataCreateForm;
