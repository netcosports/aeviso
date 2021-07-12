import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import SelectInput from '../../components/form components/SelectInput';
import { AxiosError } from 'axios';
import { jobs, user } from '../../API/requests';
import { useForm } from 'react-hook-form';
import { useUserFromStore } from '../../store/user.slice';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import { useHistory } from 'react-router-dom';

interface INewUser extends User {
  confirmPassword?: string;
}

function CreateNewUser(): JSX.Element {
  const [listOfJobs, setListOfJobs] = useState<SelectItem[]>([]);
  const { user: currentUser } = useUserFromStore();
  const history = useHistory();

  const { isModal, setIsModal, message, setMessage } = useModal();
  useQuery<Job[], AxiosError>('jobs', jobs.getAll, {
    onSuccess: (data) => {
      const jobs = data.map((job) => {
        return { value: job.id, text: job.label };
      });
      setListOfJobs(jobs);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { mutate, isLoading, error } = useMutation<User, AxiosError, { user: User }>(user.create, {
    onSuccess: () => {
      setMessage('Utilisateur correctement créé/ajouté');
      setIsModal((prevState) => !prevState);
    },
  });

  if (isLoading) return <p>Envoie dans la base de données</p>;
  if (isModal)
    return (
      <Modal
        title="Crée un nouvelle utilisateur"
        buttons={
          !error
            ? [{ text: 'ok', handleClick: () => history.push('/clients/:id/collaborateurs') }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal((prevState) => !prevState) }]
        }
      >
        {message}
      </Modal>
    );
  if (error) return <p>Une erreur est survenue...</p>;

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5 overflow-y-auto">
      <h3 className="text-xl sm:mt-2 sm:text-5xl font-bold">Crée un nouveau collaborateur</h3>

      <form
        className="flex-col mt-2 sm:mt-10"
        onSubmit={handleSubmit((data: INewUser) => {
          if (data.password !== data.confirmPassword) {
            setError('password', { message: 'Les mots de passe ne correspondent pas' });
            return setError('confirmPassword', { message: 'Les mots de passe ne correspondent pas' });
          }

          delete data.confirmPassword;
          data.companyId = currentUser.companyId;

          mutate({ user: data });
        })}
      >
        <label className="flex flex-col">
          Prénom
          <input
            className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            {...register('firstName')}
          />
        </label>

        <label className="flex flex-col mt-3 ">
          Nom:
          <input
            className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 sm:h-12 sm:rounded-md px-2"
            {...register('lastName')}
          />
        </label>

        <label className="flex flex-col mt-3">
          Email:
          <input
            className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            {...register('email')}
          />
        </label>

        <SelectInput label="Fonction :" name="jobId" register={register} items={listOfJobs} />
        <SelectInput
          label={'Heures hebdomadaires :'}
          name="weeklyBasis"
          register={register}
          items={[
            { value: 'h35', text: '35h' },
            { value: 'h39', text: '39h' },
          ]}
        />
        <label className="flex flex-col mt-3">
          Mot de passe
          <input
            className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            type="password"
            {...register('password', { minLength: 4, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/ })}
          />
          <p className="text-red-500">
            {errors?.password?.type === 'pattern'
              ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
              : errors?.password?.message}
          </p>
        </label>
        <label className="flex flex-col mt-3">
          Confirmer le mot de passe
          <input
            className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            type="password"
            {...register('confirmPassword', {
              minLength: 4,
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
            })}
          />
          <p className="text-red-500">
            {errors?.confirmPassword?.type === 'pattern'
              ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
              : errors?.confirmPassword?.type}
          </p>
        </label>
        <button
          className="focus:outline-none text-white shadow-buttonShadow mt-5 w-full sm:w-4/12 py-2 sm:h-12 sm:rounded-md rounded-lg bg-customGreen "
          type="submit"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default CreateNewUser;
