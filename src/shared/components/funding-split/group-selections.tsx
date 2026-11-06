'use client';

import { Button } from '@heroui/react';

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
          <Button
            key={group}
            onPress={() => toggleGroup(group)}
            aria-pressed={isActive}
            size="sm"
            variant="secondary"
            className={cn('rounded-lg select-none', {
              'bg-white/30 font-bold': isActive,
            })}
          >
            {group}
          </Button>
        );
      })}
    </div>
  );
};
