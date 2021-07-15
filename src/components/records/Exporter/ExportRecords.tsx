import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import SelectCompany from './SelectCompany';
import SelectProject from './SelectProject';
import SelectDate from './SelectDate';
import { useUserFromStore } from '../../../store/user.slice';

function ExportRecords(): JSX.Element {
  const { user: userStore } = useUserFromStore();

  const { register, handleSubmit, watch, setValue } = useForm();
  const history = useHistory();

  useEffect(() => {
    if (userStore.role === 'ADMIN') setValue('company', userStore.companyId);
  }, []);

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-lg shadow-buttonShadow dark:shadow-mainShadow overflow-y-auto">
      <div className="px-5 py-3 bg-white dark:bg-component shadow-buttonShadow dark:shadow-mainShadow sm:sticky top-0">
        <h1 className="sm:text-4xl  text-3xl font-bold">Exporter un rapport</h1>
        <h2 className="sm:text-base text-sm mb-2 sm:mb-2 mt-3">{`Attention: pour exporter un rapport merci de remplir tous les champs ci-dessous *.`}</h2>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          const start = new Date(data.start).toISOString();
          const end = new Date(data.end).toISOString();
          history.push(`/exporter/companies/${data.company}/projects/${data.project}?&start=${start}&end=${end}`);
        })}
        className="flex flex-col h-full pb-2 mx-7"
        action="sumbit"
      >
        {userStore.role === 'SUPERADMIN' && <SelectCompany register={register} setValue={setValue} />}
        <SelectProject register={register} companyId={watch('company')} />
        <SelectDate register={register} />
        <input
          value="Exporter"
          type="submit"
          className="focus:outline-none text-white shadow-buttonShadow mt-10 w-12/12 sm:w-4/12 py-2 rounded-lg bg-customGreen "
        />
      </form>
    </div>
  );
}

export default ExportRecords;
