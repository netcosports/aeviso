import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { companies } from '../../API/requests';

interface Data {
  id: string;
  data: Company;
}
interface IProps {
  setCompany: Dispatch<SetStateAction<Company[]>>;
}
function UpdateCompany({ setCompany }: IProps): JSX.Element {
  const { register, handleSubmit } = useForm<Company>();
  const { id }: { id: string } = useParams();

  const { mutate, error } = useMutation<Company, AxiosError, Data>((data) => companies.put(data), {
    onSuccess: (data) => setCompany((prev) => [...prev, data]),
  });

  if (error) {
    return (
      <p>
        An error occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div>
      <h3>Please update the Company</h3>
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit((data) => {
          mutate({ id, data });
        })}
      >
        <label>
          Name :
          <input type="text" {...register('name')} />
        </label>
        <label>
          Zip Code :
          <input type="text" {...register('zipCode')} />
        </label>
        <label>
          City:
          <input type="text" {...register('city')} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCompany;
