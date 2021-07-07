import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { connect } from 'react-redux';
import { companies } from '../../API/requests';
import { RootState } from '../../assets/redux/store';
import Spinner from '../Spinner';

function Admin({ user }: { user?: UserReduxState }): JSX.Element {
  const id = user?.companyId;
  const [company, setCompany] = useState<Company | null>(null);

  const { isLoading, error } = useQuery<Company, AxiosError>(['company', id], () => companies.getOne(id as string), {
    onSuccess: (data) => {
      setCompany(data);
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        An error has occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div className="h-full">
      <h1 className="text-black dark:text-white text-lg sm:text-2xl font-roboto font-bold">{company?.name}</h1>
      <div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-2 gap-5 h-full">
        <div className="sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <p className="text-black dark:text-white">ADMIN</p>
        </div>
        <div className="sm:col-start-2 sm:row-start-1 sm:row-end-2 col-start-1 row-start-2 border-2 dark:border-componentBorder  bg-white dark:bg-component rounded-lg shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <p className="text-black dark:text-white">ADMIN</p>
        </div>
        <div className="sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-4 row-start-3 row-end-4 col-start-1 border-2 dark:border-componentBorder  bg-white dark:bg-component rounded-lg shadow-mainShadow  mx-4 sm:mx-0">
          <p className="text-black dark:text-white">ADMIN</p>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state: RootState) => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(Admin);
