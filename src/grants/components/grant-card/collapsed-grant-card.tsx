import { cn } from '@/shared/utils/cn';

import { Grant } from '@/grants/core/schemas';
import { getGrantCardData } from '@/grants/utils/get-grant-card-data';
import { DetailItems } from '@/grants/components/ui/base/detail-item';
import { Title } from '@/grants/components/ui/base/title';

interface Props {
  grant: Grant;
}

export const CollapsedGrantCard = ({ grant }: Props) => {
  const { topItems, hasTopItems, midItems } = getGrantCardData(grant);

  return (
    // <div>
    //   <pre>{JSON.stringify(grant)}</pre>
    // </div>
    <div
      className="flex max-h-[500px] rounded-20 bg-gradient-to-t from-tertiary/20 p-5 text-13 lg:bg-gradient-to-r  lg:from-white/15"
      data-uuid={grant.slug}
    >
      <div className="flex flex-wrap gap-2">
        <Title className="text-12 whitespace-nowrap font-semibold">
          {grant.name}
        </Title>
        <div className="flex  gap-6">
          {hasTopItems && (
            <DetailItems
              items={topItems}
              classNames={{
                container: 'gap-x-4 gap-y-1.5',
                root: 'text-13 flex-nowrap flex',
              }}
            />
          )}
        </div>

        <DetailItems
          items={midItems}
          classNames={{
            label: 'pr-2',
            root: 'flex-nowrap flex first:hidden',
            container: cn('flex grow flex-nowrap gap-6', { '': hasTopItems }),
          }}
        />
      </div>
    </div>
  );
};
