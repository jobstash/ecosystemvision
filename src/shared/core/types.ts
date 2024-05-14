export type InfoTagProps = {
  text: string;
  icon: React.ReactNode;
  link?: string;
  showExternalIcon?: boolean;
};

export type EnabledTagsConfig<T> = Partial<Record<keyof T, boolean>>;
