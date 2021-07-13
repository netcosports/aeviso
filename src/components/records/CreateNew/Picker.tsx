import React, { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { user } from '../../../API/requests';
import { useUserFromStore } from '../../../store/user.slice';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useRecordFromStore } from '../../../store/record.slice';
import { getLocaleDate } from '../../../assets/date';

interface IPicker {
  setDayActive: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<FieldValues>;
}

function Picker({ setDayActive, register }: IPicker): JSX.Element {
  const { dispatchSelectDate } = useRecordFromStore();

  const handleChange = (date: Date) => {
    dispatchSelectDate(getLocaleDate(date));
    setDayActive(false);
  };

  const { user: userStore } = useUserFromStore();

  const { isLoading, error, data } = useQuery<Project[], AxiosError>(
    ['projects', userStore.id],
    () => user.getProjects(userStore.id as string),
    {
      enabled: Boolean(userStore.id),
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex w-full sm:mt-10 justify-between sm:items-end flex-col sm:flex-row">
        <Link to="/records/export">
          <p className="bg-customGreen text-white ml-4 mt-5 px-4 py-1 rounded-md shadow-buttonShadow text-center w-6/12 sm:w-full">
            Exporter un rapport
          </p>
        </Link>
      </div>
      <div className="mx-3 mt-5 sm:mt-16">
        <label className="mt-5 text-lg font-bold sm:text-xl" htmlFor="select">
          Sélectionner un projet
        </label>

        <select
          {...register('project', { value: data?.[0]?.id || '' })}
          className="focus:outline-none w-full text-black dark:text-gray-300 text-sm bg-white dark:bg-component border-b pt-3 pb-2 border-black dark:border-white"
        >
          {data?.map((project) => {
            return (
              <option value={project.id} key={project.id}>
                {project.name}
              </option>
            );
          })}
        </select>
      </div>
      <p className="font-bold sm:text-2xl mt-10 mx-4">Pour créer un rapport sélectionnez une journée</p>
      <div className="flex mt-5 sm:p-10 mb-10 w-12/12 bg-black rounded-xl">
        <Calendar onChange={handleChange} />
      </div>
    </div>
  );
}

export default Picker;
