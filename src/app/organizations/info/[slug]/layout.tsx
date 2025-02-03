import { DetailsTabs } from '@/shared/components/details-tabs';
import { Divider } from '@/shared/components/divider';

import { createOrgDetailsTabs } from '@/orgs/utils/create-org-details-tabs';
import { createOrgJsonLd } from '@/orgs/utils/create-org-json-ld';
import { getOrgDetails } from '@/orgs/data/get-org-details';
import { OrgDetailsHeader } from '@/orgs/components/org-details-header';

interface Props {
  params: Promise<{
    slug: string;
  }>;
  children: React.ReactNode;
}

const Layout = async ({ params, children }: Props) => {
  const { slug } = await params;
  const data = await getOrgDetails(slug);
  const jsonLd = createOrgJsonLd(data);
  const tabs = createOrgDetailsTabs(data);

  return (
    <>
      <div className="flex max-w-4xl flex-col gap-4 p-8">
        <OrgDetailsHeader org={data} />

        <Divider />

        <DetailsTabs tabs={tabs} />

        <div className="px-1">{children}</div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default Layout;
