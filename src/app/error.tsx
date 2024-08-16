'use client';

import { ErrorBoundaryProps } from '@/shared/core/types';
import { InternalErrorResult } from '@/shared/components/internal-error-result';

const Error = (props: ErrorBoundaryProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-2xl">
        <InternalErrorResult showReset={false} {...props} />
      </div>
    </div>
  );
};

export default Error;
