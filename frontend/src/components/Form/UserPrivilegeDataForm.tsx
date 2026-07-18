import { FormLabel, FormSelect } from "../../base-components/Form";

const UserPrivilegeDataForm = (props: any) => {
  const { formData, setFormData } = props;

  return (
    <div className="box">
      <div className="grid grid-cols-12 px-8 py-4 gap-4">
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="tata_cara_voting">Tata Cara Voting</FormLabel>
            <FormSelect
              id="tata_cara_voting"
              formSelectSize="sm"
              value={formData?.tata_cara_voting}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tata_cara_voting: e.target.value,
                })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="profile_kandidat_pengawas">
              Profile Candidate Pengawas
            </FormLabel>
            <FormSelect
              id="profile_kandidat_pengawas"
              formSelectSize="sm"
              value={formData?.profile_kandidat_pengawas}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profile_kandidat_pengawas: e.target.value,
                })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="profile_kandidat_pengurus">
              Profile Candidate Pengurus
            </FormLabel>
            <FormSelect
              id="profile_kandidat_pengurus"
              formSelectSize="sm"
              value={formData?.profile_kandidat_pengurus}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profile_kandidat_pengurus: e.target.value,
                })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="mulai_voting">Mulai Voting</FormLabel>
            <FormSelect
              id="mulai_voting"
              formSelectSize="sm"
              value={formData?.mulai_voting}
              onChange={(e) =>
                setFormData({ ...formData, mulai_voting: e.target.value })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="riwayat_voting">Riwayat Voting</FormLabel>
            <FormSelect
              id="riwayat_voting"
              formSelectSize="sm"
              value={formData?.riwayat_voting}
              onChange={(e) =>
                setFormData({ ...formData, riwayat_voting: e.target.value })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="dashboard">Dashboard</FormLabel>
            <FormSelect
              id="dashboard"
              formSelectSize="sm"
              value={formData?.dashboard}
              onChange={(e) =>
                setFormData({ ...formData, dashboard: e.target.value })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="status_voting_anggota">
              Status Voting Anggota
            </FormLabel>
            <FormSelect
              id="status_voting_anggota"
              formSelectSize="sm"
              value={formData?.status_voting_anggota}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status_voting_anggota: e.target.value,
                })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="user_data">Data User</FormLabel>
            <FormSelect
              id="user_data"
              formSelectSize="sm"
              value={formData?.user_data}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  user_data: e.target.value,
                })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-12">
          <div className="col-span-12">
            <FormLabel htmlFor="setting">Setting</FormLabel>
            <FormSelect
              id="setting"
              formSelectSize="sm"
              value={formData?.setting}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  setting: e.target.value,
                })
              }
            >
              <option value={0}>inactive</option>
              <option value={1}>active</option>
            </FormSelect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPrivilegeDataForm;
