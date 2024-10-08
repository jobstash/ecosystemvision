import { memo } from 'react';

export const GainIcon = memo(() => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V35C2 35.7956 2.31607 36.5587 2.87868 37.1213C3.44129 37.6839 4.20435 38 5 38H35C35.7956 38 36.5587 37.6839 37.1213 37.1213C37.6839 36.5587 38 35.7956 38 35V5C38 4.20435 37.6839 3.44129 37.1213 2.87868C36.5587 2.31607 35.7956 2 35 2Z"
      stroke="#BEC1D3"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M9.44141 25.835L15.0984 20.178L19.4864 24.555L30.0014 14"
      stroke="#BEC1D3"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 14H30V22"
      stroke="#BEC1D3"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

GainIcon.displayName = 'GainIcon';
