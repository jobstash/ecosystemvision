import Link from 'next/link';

const MIN_HEIGHT_STYLE = { minHeight: 53 };

export const Brand = () => {
  return (
    <Link href="/">
      <div
        className="flex items-center justify-center"
        style={MIN_HEIGHT_STYLE}
      >
        <span className="font-bold">Ecosystem Vision</span>
      </div>
    </Link>
  );
};
