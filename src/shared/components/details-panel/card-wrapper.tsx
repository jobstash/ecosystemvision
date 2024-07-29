import { getGradientBorderStyle } from '@/shared/utils/get-gradient-border-style';

interface Props {
  children: React.ReactNode;
}

export const DetailsPanelCardWrapper = ({ children }: Props) => {
  const style = getGradientBorderStyle();

  return (
    <div className="flex flex-col gap-4 rounded-3xl p-6" style={style}>
      {children}
    </div>
  );
};
