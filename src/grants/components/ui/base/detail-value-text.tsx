import { cn } from '@/shared/utils/cn';

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const DetailValueText = ({
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <span className={cn('shrink-0', className)} {...props}>
      {children}
    </span>
  );
};

interface TextsProps {
  items: string[];
  textProps?: TextProps;
  classNames?: {
    root?: string;
    text?: string;
  };
}

export const DetailValueTexts = ({
  items,
  textProps,
  classNames,
}: TextsProps) => (
  <div className={cn('flex items-center gap-4', classNames?.root)}>
    {items.map((item, index) => (
      <DetailValueText
        key={index}
        {...textProps}
        className={cn('rounded-full px-1 text-10', classNames?.text)}
      >
        {item}
      </DetailValueText>
    ))}
  </div>
);
