interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async (props: Props) => {
  const params = await props.params;

  return (
    <div>
      <pre>{JSON.stringify({ params }, undefined, '\t')}</pre>
    </div>
  );
};

export default Page;
