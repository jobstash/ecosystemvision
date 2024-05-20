import { DraggableWrapper } from '@/shared/components/draggable-wrapper';

import { DetailsPanelTabMapper } from './tab-mapper';

interface Props {
  tabs: { text: string; href: string }[];
  asyncTabs?: React.ReactNode;
}

export const DetailsPanelTabs = ({ tabs, asyncTabs }: Props) => {
  return (
    <DraggableWrapper className={ROW_CLASSNAME}>
      <DetailsPanelTabMapper tabs={tabs} />
      {asyncTabs}
    </DraggableWrapper>
  );
};

const ROW_CLASSNAME = 'flex items-center gap-4';
