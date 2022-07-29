import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Privacy = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow:'scroll',
  };
  const outerClasses = classNames(
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className,
    'illustration-section-03'
  );

  const innerClasses = classNames(
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{marginTop: '7vh'}}>
          <div >
            <h1 style={{textAlign:'center'}}>
              Terms/<span className="text-color-primary">Conditions</span>
            </h1>
            <p style={{fontSize: 18, textAlign:'center'}}>
              Last updated July 9, 2022
              </p>
            <div style={{marginLeft: '5vw',marginRight: '5vw'}}>
            <p style={{color: '#e3eeff'}}>Thank you for using BotInk! These terms of use govern your use of BotInk. By using our service, you agree to these terms.</p>
            <p style={{color: '#e3eeff'}}>For the purposes of this document, all uses of "you" and "yours" refer to you, the user, and all uses of "we" and "our" refer to BotInk. This applies to all uses of these terms, singular or plural.</p>
              <h3 >Limits on Liability</h3>
              <p style={{color: '#e3eeff'}}>Although we are constantly trying to provide the best product we can, our service is provided "as is", meaning we make no guarantees that it will always be safe or error-free, or that it will function without any disruptions or delays. Furthermore, we are not responsible for the actions or conduct of any of our customers using our product.</p>
              <h3 >Termination Clause</h3>
              <p style={{color: '#e3eeff'}}>We reserve the right (but have no obligation) to terminate the service of any user found to be in violation of these terms.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

Privacy.propTypes = propTypes;
Privacy.defaultProps = defaultProps;

export default Privacy;