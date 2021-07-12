import React from 'react';
import { useHistory } from 'react-router-dom';

import Collaborateurs from '../../../media/icons/Collaborateurs.svg';

interface ISPNavbar {
  handleClose: () => void;
  Home: string;
  report: string;
  settings: string;
  newReport: string;
}

function Admin({ Home, report, settings, newReport, handleClose }: ISPNavbar): JSX.Element {
  const history = useHistory();

  const handleClickLink = (url: string) => {
    handleClose();
    history.push(url);
  };

  return (
    <div>
      <nav className="list-none pt-5">
        <li className="flex text-lg  items-center pl-5 h-14 rounded-xl">
          <img
            src={Home}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/aeviso')}>
            Accueil
          </button>
        </li>
        <li className="flex text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={newReport}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/nouveaurapport')}>
            Nouveau Rapport
          </button>
        </li>
        <li className="flex text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={report}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/rapport')}>
            Rapport
          </button>
        </li>
        <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={Collaborateurs}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink(`/collaborateurs`)}>
            Collaborateurs
          </button>
        </li>
        <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={settings}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('reglage')}>
            Réglages
          </button>
        </li>
      </nav>
    </div>
  );
}

export default Admin;
