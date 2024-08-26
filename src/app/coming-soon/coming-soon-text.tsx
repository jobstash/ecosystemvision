import React from 'react';

const TEXT = 'Coming Soon';

export const ComingSoonText = () => {
  return (
    <div className="stack max-w-lg font-grotesk text-4xl font-bold text-white">
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          className="stack-item select-none"
          style={{ '--index': index } as React.CSSProperties}
        >
          {TEXT}
        </span>
      ))}
    </div>
  );
};
