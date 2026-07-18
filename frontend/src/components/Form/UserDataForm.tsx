import React from "react";
import { FormInput, FormLabel, FormSelect } from "../../base-components/Form";

const UserDataForm = (props: any) => {
  const { formData, setFormData, dataAttributes, handleSubmit } = props;

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
            <FormLabel htmlFor="nomor_anggota">Nomor Anggota</FormLabel>
            <FormInput
              id="nomor_anggota"
              type="text"
              formInputSize="sm"
              className="w-full"
              placeholder=""
              value={formData?.membership_number}
              onChange={(e) =>
                setFormData({ ...formData, membership_number: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              type="text"
              formInputSize="sm"
              className="w-full"
              placeholder=""
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="company">Group</FormLabel>
            <FormSelect
              id="company"
              formSelectSize="sm"
              value={formData?.company_uuid}
              onChange={(e) =>
                setFormData({ ...formData, company_uuid: e.target.value })
              }
            >
              <option value=""></option>
              {dataAttributes?.company?.map((data: any, index: any) => (
                <option value={data?.uuid} key={index}>
                  {data?.name}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="is_member">Status Anggota</FormLabel>
            <FormSelect
              id="is_member"
              formSelectSize="sm"
              value={formData?.is_member}
              onChange={(e) =>
                setFormData({ ...formData, is_member: e.target.value })
              }
            >
              <option value={1}>Anggota</option>
              <option value={0}>Bukan Anggota</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="status">Status</FormLabel>
            <FormSelect
              id="status"
              formSelectSize="sm"
              value={formData?.status_uuid}
              onChange={(e) =>
                setFormData({ ...formData, status_uuid: e.target.value })
              }
            >
              {dataAttributes?.status?.map((data: any, index: any) => (
                <option value={data?.uuid} key={index}>
                  {data?.name}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataForm;
