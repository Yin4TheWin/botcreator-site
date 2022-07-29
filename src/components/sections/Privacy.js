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
    'illustration-section-04'
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
              Privacy <span className="text-color-primary">Policy</span>
            </h1>
            <p style={{fontSize: 18, textAlign:'center'}}>
              Last updated July 9, 2022
              </p>
            <div style={{marginLeft: '5vw',marginRight: '5vw'}}>
            <p style={{color: '#e3eeff'}}>Thank you for using BotInk! This privacy policy describes how and what information we collect about you when you use our services. We use your data in order to provide and improve our service. By using BotInk, you agree to the collection and use of information in accordance with this Privacy Policy.</p>
            <p style={{color: '#e3eeff'}}>For the purposes of this privacy policy, all uses of "you" and "yours" refer to you, the user, and all uses of "we" and "our" refer to BotInk. This applies to all uses of these terms, singular or plural.</p>
              <h3 >What information do we store about you?</h3>
              <p style={{color: '#e3eeff'}}>We keep track of your email address and link it to each bot you have purchased. That way, you can edit your bots and cancel subscriptions when you desire.
              We also store your Discord bot's token in order to host your bot on our servers. Your token is stored securely on Firebase, a third party hosting service owned by Google.
              Payment info is handled by a third-party service and is not stored on our servers.</p>
              <h3 >How is your bot token used?</h3>
              <p style={{color: '#e3eeff'}}>We need your bot token in order to publish custom commands as your bot. We will not collect your bot token until after you purchase a bot. After payment, we publish our commands to your bot using your token and bot id, then start hosting your bot on our servers using your token. The source code for our server is publicy available on <a target="_blank" rel="noreferrer noopener" style={{color: 'blue', textDecorationLine: 'underline'}} href="https://github.com/Yin4TheWin/botink-server">Github</a> if you would like to verify/get a full look at how your token is used.</p>
              <h3 >How are your email and password used?</h3>
              <p style={{color: '#e3eeff'}}>We only use your email and password to confirm it's you and log you into your account. Authentication is handled by Firebase, a secure third-party service provided by Google. We do not have access to your passwords! We have your email on file; however, we will not give this information to anyone else or contact you except for important updates or if you contact us first.</p>
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