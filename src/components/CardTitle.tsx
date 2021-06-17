import React from 'react';

interface IProps {
  children: string;
}

function CardTitle({ children }: IProps): JSX.Element {
  return <h3 className="text-white text-lg font-bold">{children}</h3>;
}

export default CardTitle;
