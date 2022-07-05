import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
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
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
          <Modal
            open={open}
            style={{overflow:'scroll',}}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" color="black">
                        Key Points
                    </Typography>
                    <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }} color="black">
                        What information do we store about you?
                    </Typography>
                    <ul>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            For each user, we keep track of their email address and link it to each bot they have purchased. That way, customers can edit their bots and cancel subscriptions when they desire.
                        </Typography>
                      </li>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            We also store your Discord bot's token in order to host your bot on our servers. Your token is stored securely on Firebase, a third party hosting service owned by Google.
                        </Typography>
                      </li>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            Payment info is handled by a third-party service and is not stored.
                        </Typography>
                      </li>
                    </ul>
                    <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }} color="black">
                        How is your bot token used?
                    </Typography>
                    <ul>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            We need your bot token in order to publish custom commands as your bot.
                        </Typography>
                      </li>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            Before payment, we attempt to log in as your bot (then immediately log out!) in order to confirm that the provided token is valid and to grab your bot's user id (which is publicy available) so we can publish our custom commands later. NOTE: If you do not pay for hosting or the provided token is invalid, we will not store your token on our server!
                        </Typography>
                      </li>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            After payment, we publish our commands to your bot using your token and bot id, then start hosting your bot on our servers using your token. The source code for our server is publicy available on <a target="_blank" style={{color: 'blue', textDecorationLine: 'underline'}} href="https://github.com/Yin4TheWin/botink-server">Github</a> if you would like to verify/get a full look at how your token is used.
                        </Typography>
                      </li>
                    </ul>
                    <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }} color="black">
                        How are your email and password used?
                    </Typography>
                    <ul>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            We only use your email and password to confirm it's you and log you into your account.
                        </Typography>
                      </li>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            Authentication is handled by Firebase, a secure third-party service provided by Google. We do not have access to your passwords!
                        </Typography>
                      </li>
                      <li>
                        <Typography id="modal-modal-description" variant="p" sx={{ mt: 2 }} color="black">
                            We have your email on file; however, we will not give this information to anyone else or contact you except for important updates or if you contact us first.
                        </Typography>
                      </li>
                    </ul>
                </Box>
            </Modal>
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Bot <span className="text-color-primary">Ink</span> (Under Construction)
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
              Get a custom discord bot with tons of general features for your members, a functional music player, and excellent moderation tools for just $4.99/month. Simply create an account and setup in seconds!
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="#/dashboard">
                    Get started
                    </Button>
                    <Button tag="a" color="light" target="_blank" rel="noreferrer noopener" wideMobile href="https://discord.gg/qEtqDbZj7H">
                    Join our Support Server
                    </Button>
                  {/* <Button tag="a" color="dark" wideMobile href="https://github.com/cruip/open-react-template/">
                    View on Github
                    </Button> */}
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
              <Image
                className="has-shadow"
                src={require('./../../assets/images/Inky.png')}
                alt="Hero"
                width={256}
                height={256} /> 
                <p>Meet Inky, the sentient squid who makes your bots! He wants you to read our <a onClick={()=>{setOpen(true)}} style={{marginBottom: '2vh', color: 'blue', textDecorationLine: 'underline'}}>privacy policy</a> so you know how your bot token is used.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;