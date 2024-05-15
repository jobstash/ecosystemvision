const PRIMARY_START_COLOR = '#8743FF';
const PRIMARY_END_COLOR = '#4136F1';
const SECONDARY_START_COLOR = '#363638';
const SECONDARY_END_COLOR = '#27272A';
const BASE_BACKGROUND_COLOR = '#1e1e1e';
const TRANSPARENT_BORDER = '2px solid transparent';
const BASE_BACKGROUND_GRADIENT_DIRECTION = '90deg';
const BORDER_GRADIENT_DIRECTION = '270deg';

export const getGradientBorderStyle = (
  isPrimary = true,
): React.CSSProperties => {
  const startColor = isPrimary ? PRIMARY_START_COLOR : SECONDARY_START_COLOR;
  const endColor = isPrimary ? PRIMARY_END_COLOR : SECONDARY_END_COLOR;

  return {
    background: `linear-gradient(${BASE_BACKGROUND_GRADIENT_DIRECTION}, ${BASE_BACKGROUND_COLOR}, ${BASE_BACKGROUND_COLOR}) padding-box, linear-gradient(${BORDER_GRADIENT_DIRECTION}, ${startColor}, ${endColor}) border-box`,
    border: TRANSPARENT_BORDER,
  };
};
