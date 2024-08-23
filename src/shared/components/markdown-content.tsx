'use client';

import Markdown from 'react-markdown';

import { openNewTab } from '@/shared/utils/open-new-tab';

interface Props {
  content: string;
}

export const MarkdownContent = ({ content }: Props) => {
  return (
    <Markdown
      components={{
        p: ({ children }) => (
          <p className="space-y-2 text-sm text-white/75">{children}</p>
        ),
        a: ({ href, children }) => <LinkItem href={href}>{children}</LinkItem>,
        h1: ({ children }) => (
          <h1 className="text-bold text-xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-bold text-lg font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-bold font-bold">{children}</h3>
        ),
        ol: ({ children }) => (
          <ol className="list-outside list-decimal">{children}</ol>
        ),
        ul: ({ children }) => (
          <ul className="ml-2 list-inside list-disc space-y-1">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="mb-2 text-sm text-white/75">{children}</li>
        ),
      }}
    >
      {content.replace(/\] \(/g, '](').replace(/--/g, '-')}
    </Markdown>
  );
};

const LinkItem = ({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) => {
  const onClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openNewTab(href ?? '');
  };

  return (
    <span
      className="mb-2 cursor-pointer font-bold underline last:mb-0"
      onClick={onClick}
    >
      {children}
    </span>
  );
};
