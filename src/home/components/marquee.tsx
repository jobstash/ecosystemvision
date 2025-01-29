export const Marquee = () => {
  return (
    <div className="enable-animation">
      <div className="marquee">
        <div className="marquee__content">
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
        </div>

        <div aria-hidden="true" className="marquee__content">
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
          <div className="marquee__item">ecosystem.vision&nbsp;•&nbsp;</div>
        </div>
      </div>
    </div>
  );
};
