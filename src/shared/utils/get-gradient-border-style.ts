const START_COLOR = 'transparent';
const END_COLOR = '#2e2e2e';
const BASE_BACKGROUND_COLOR = '#121212';
const TRANSPARENT_BORDER = '2px solid transparent';
const BASE_BACKGROUND_GRADIENT_DIRECTION = '135deg';
const BORDER_GRADIENT_DIRECTION = '315deg';

export const getGradientBorderStyle = (): React.CSSProperties => {
  return {
    background: `linear-gradient(${BASE_BACKGROUND_GRADIENT_DIRECTION}, ${BASE_BACKGROUND_COLOR}, ${BASE_BACKGROUND_COLOR}) padding-box, linear-gradient(${BORDER_GRADIENT_DIRECTION}, ${START_COLOR}, ${END_COLOR}) border-box`,
    border: TRANSPARENT_BORDER,
  };
};
