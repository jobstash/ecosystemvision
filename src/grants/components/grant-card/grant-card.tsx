interface Props {
  id: string;
}

export const GrantCard = ({ id }: Props) => {
  // TODO: JOB-678
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-gradient-to-l from-[#0D0D0D] to-primary p-6 py-16 transition-all duration-300 hover:bg-white/10">
      <span className="font-bold">{`Grant Program ${id}`}</span>
    </div>
  );
};

// TODO: Extract to cta-slot for grant-item component
{
  /* <div className="flex flex-col gap-3">
  <div className="flex size-32 items-center justify-center bg-white/5">
    <span>LOGO HERE: {logo}</span>
  </div>
  <div className="flex items-center gap-3">
    {url && (
      <Button size="sm" as={Link} href={url} isIconOnly>
        <WebIcon />
      </Button>
    )}
    {discord && (
      <Button size="sm" as={Link} href={discord} isIconOnly>
        <DiscordIcon />
      </Button>
    )}
    {twitter && (
      <Button size="sm" as={Link} href={twitter} isIconOnly>
        <TwitterIcon />
      </Button>
    )}
  </div>
</div>; */
}
