'use client';

import { Chip } from '@heroui/chip';

import { cn } from '@/shared/utils/cn';

import { useFundingSplitContext } from './context';

interface Props {
  type: 'grant' | 'funding';
}

export const GroupSelections = ({ type }: Props) => {
  const { grants, funding } = useFundingSplitContext();

  const toggleGroup =
    type === 'grant' ? grants.toggleGroup : funding.toggleGroup;

  const activeGroups =
    type === 'grant' ? grants.activeGroups : funding.activeGroups;

  const items = type === 'grant' ? grants.items : funding.items;
  const groups = Array.from(new Set(items.map((item) => item.group))).sort();

  if (!groups.length) return <span className="text-white/40">None</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {groups.map((group) => {
        const isActive = activeGroups.has(group);
        return (
          <Chip
            key={group}
            onClick={() => toggleGroup(group)}
            radius="sm"
            classNames={{
              base: cn('select-none hover:cursor-pointer', {
                'bg-white/30': isActive,
              }),
              content: cn({ 'font-bold': isActive }),
            }}
          >
            {group}
          </Chip>
        );
      })}
    </div>
  );
};
