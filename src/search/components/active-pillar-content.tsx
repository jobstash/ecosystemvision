import React from 'react';

interface Props {
  title: string;
  description: string;
  items: React.ReactNode;
}

export const ActivePillarContent = (props: Props) => {
  const { title, description, items } = props;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <span>{description}</span>
      {items}
    </div>
  );
};
