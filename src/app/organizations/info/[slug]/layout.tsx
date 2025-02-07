import { DetailsLayout } from '@/shared/components/details-layout';

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
      <DetailsLayout
        nav="organizations"
        header={<OrgDetailsHeader org={data} />}
        tabs={tabs}
      >
        {children}
      </DetailsLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default Layout;
