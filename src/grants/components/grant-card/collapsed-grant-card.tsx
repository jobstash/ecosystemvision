import { Grant } from '@/grants/core/schemas';
// import { getGrantCardData } from '@/grants/utils/get-grant-card-data';

interface Props {
  grant: Grant;
}

export const CollapsedGrantCard = ({ grant }: Props) => {
  // const {
  //   slug,
  //   logo,
  //   name,
  //   url,
  //   discord,
  //   twitter,
  //   topItems,
  //   hasTopItems,
  //   midItems,
  //   lowerItems,
  //   hasLowerItems,
  //   hasWebLinks,
  // } = getGrantCardData(grant);

  return (
    // <div>
    //   <pre>{JSON.stringify(grant)}</pre>
    // </div>
    <div
      className="flex max-h-[500px] items-center justify-between gap-6 overflow-hidden rounded-20 bg-gradient-to-r from-white/15 to-gradient-1  p-5"
      data-uuid={grant.slug}
    >
      {grant.name}
      {/* <div className="flex grow flex-col gap-4 lg:pr-24">
        <Title className="text-2xl font-bold lg:text-32">{name}</Title>
        <div className="flex flex-wrap gap-4">
          {hasWebLinks && <WebLinks links={{ url, discord, twitter }} />}

          {hasTopItems && (
            <DetailItems
              items={topItems}
              classNames={{ container: 'gap-x-4 gap-y-1.5', root: 'text-13' }}
            />
          )}
        </div>

        <DetailItems
          items={midItems}
          classNames={{
            label: 'w-full pb-2 md:pb-0 md:w-auto lg:w-full lg:pb-2',
            root: 'w-full md:w-auto first:text-white/75 lg:first:border-0 lg:first:py-0 lg:items-start lg:first:max-w-xl lg:flex-col lg:items-start',
            container: cn(
              'gap-y-4 md:gap-x-6 md:border-divider/25 lg:w-full lg:grow lg:border-divider/10 lg:py-4',
              { 'md:border-t md:pt-4': hasTopItems },
            ),
          }}
        />

        {hasLowerItems && (
          <div className="border-t border-divider/10 pt-4 lg:border-none lg:pt-0">
            <DetailItems
              items={lowerItems}
              classNames={{
                label: 'hidden md:flex',
              }}
            />
          </div>
        )}
      </div>

      <div className="hidden flex-col gap-4 lg:flex">
        <div className="flex size-[144px] items-center justify-center overflow-hidden rounded-xl">
          <Avatar
            classNames={{
              base: 'bg-black w-8 h-8 rounded h-[144px] w-[144px]',
            }}
            showFallback
            src={logo ?? ''}
            name={name}
          />
        </div>
      </div> */}
    </div>
  );
};
