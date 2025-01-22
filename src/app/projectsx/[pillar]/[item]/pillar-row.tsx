import { PillarItem } from './pillar-item';
import { PillarRowItem } from './types';

import { PillarLoadingWrapper } from '@/app/projectsx/[pillar]/[item]/pillar-loading-wrapper';

interface Props {
  pillar: string | null;
  pillarItems: PillarRowItem[];
}

export const PillarRow = (props: Props) => {
  const { pillar, pillarItems } = props;

  return (
    <PillarLoadingWrapper>
      <div className="flex flex-col gap-1">
        {pillar && (
          <div className="pl-2 text-13 uppercase text-accent2/90">
            <span>{pillar}</span>
          </div>
        )}
        <div className="relative flex h-14 gap-4 overflow-hidden p-1">
          <div className="flex max-w-fit flex-wrap gap-4">
            {pillarItems.map(({ label, href, isActive }) => (
              <PillarItem
                key={label}
                isActive={isActive}
                label={label}
                href={href}
              />
            ))}
          </div>

          <div className="shrink-0 grow">
            <p>{'<More />'}</p>
          </div>
        </div>
      </div>
    </PillarLoadingWrapper>
  );
};
