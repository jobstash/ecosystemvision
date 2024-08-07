import {
  Avatar,
  AvatarGroup,
  AvatarGroupProps,
  AvatarProps,
} from '@nextui-org/react';

interface Props extends AvatarProps {
  items: { name: string; logo: string | null }[];
  avatarProps?: {
    group?: AvatarGroupProps;
    avatar?: AvatarProps;
  };
}

export const DetailValueAvatars = ({ items, avatarProps }: Props) => {
  return (
    <AvatarGroup  {...avatarProps?.group}>
      {items.map(({ name, logo }) => (
        <Avatar
          key={name}
          showFallback
          name={name}
          src={logo ?? ''}
          classNames={{
            base: 'h-5 w-5',
            fallback: 'bg-white/5',
          }}
          {...avatarProps?.avatar}
        />
      ))}
    </AvatarGroup>
  );
};
