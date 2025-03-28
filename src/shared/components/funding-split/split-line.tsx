'use client';

import { useFundingSplitContext } from './context';
import { SplitLineItem } from './split-line-item';

export const SplitLine = () => {
  const { grants, funding } = useFundingSplitContext();
  return (
    <div className="flex h-2 w-full">
      <div
        className="flex h-full bg-[#7EDCD5]"
        style={{ width: `${grants.percentage}%` }}
      >
        {grants.items.map((item, index) => (
          <SplitLineItem key={index} item={item} index={index} />
        ))}
      </div>
      <div
        className="flex h-full bg-[#FE5468]"
        style={{ width: `${funding.percentage}%` }}
      >
        {funding.items.map((item, index) => (
          <SplitLineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};
