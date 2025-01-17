import { createOrgJsonLd } from '@/orgs/utils/create-org-json-ld';
import { getOrgDetails } from '@/orgs/data/get-org-details';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getOrgDetails(slug);
  const jsonLd = createOrgJsonLd(data);

  return (
    <div>
      <pre>{JSON.stringify(data, undefined, '\t')}</pre>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default Page;
