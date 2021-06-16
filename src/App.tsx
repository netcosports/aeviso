import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <Layout />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
