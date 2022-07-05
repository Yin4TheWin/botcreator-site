import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Button from '../elements/Button';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <h1 style={{textAlign: 'center', width: 'auto'}}>Testimonials</h1>
          <p style={{textAlign: 'center', width: 'auto'}}>Our bots are made with ❤️ by a trusted and experienced Discord Bot developer. You can check out his fiverr page and reviews <a href="https://www.fiverr.com/franklinyin/create-a-discord-bot-with-free-hosting" target="_blank" rel="noreferrer noopener" style={{color: 'blue', textDecorationLine: 'underline'}}>here</a>, or keep scrolling to see a few satisfied customer testimonials.</p>
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-right" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — This guy is one of the BEST Fiverr people out there! I was asking for a monitoring bot which was not easy to do, yet he made the bot exactly how I wanted it to be...
                      </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">aldrintigulo</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a>Phillipines</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — Exceptionally well done - in all verticles! Always up for something new for them to tackle/help you make a reality, fair price and immediate service! Can't recommend enough!
                      </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">karamspn</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a>Denmark</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-left" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — súper rápido, bueno, logro hacer todo lo que pedí... lo recomiendo ya que siempre fue paciente para lograr el mejor resultado! felicitaciones
                      </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">elkoteluigi</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a>Chile</a>
                  </span>
                </div>
              </div>
            </div>

          </div>
          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-right" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — Responded really fast, great product for the price and got it on the same day. Would recommend to anyone looking for a budget discord bot!
                      </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">ignskrrrtt</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a>United States</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — Very fast and qualitative work. The bot runs flawlessly and has no problems. Very nice seller who offers a really good collaboration I recommend it
                      </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">lilshrxmp</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a>Germany</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-left" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    — fast service, friendly and made sure his product was exactly as required.
                      </p>
                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">legbreaklenny</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a>Australia</a>
                  </span>
                </div>
              </div>
            </div>
            </div>
            <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
              <h1 style={{textAlign: 'center', width: 'auto'}}>What are you waiting for?</h1>
              <p style={{textAlign: 'center', width: 'auto'}}>Let us help you build the server and brand of your dreams!</p>
              <Button tag="a" color="primary" wideMobile href="#/dashboard">
                Get started
              </Button>
            </div>
        </div>
      </div>

    </section>
  );
}

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;