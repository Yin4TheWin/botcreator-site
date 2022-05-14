import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { firebase } from '../../firebase';
import { Button, TextField } from '@mui/material';
import { getDatabase, ref, child, push, update } from "firebase/database";

const db = getDatabase(firebase)

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {

  const outerClasses = classNames(
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );  

  const [email, setEmail] = React.useState("")

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div
          className={innerClasses}
        >
          <div className="cta-slogan">
            <h3 className="m-0">
              Want to get updates?
              </h3>
              <p>
                We'll send you an email when Bot Ink is ready to launch!
              </p>
          </div>
          <div>
            <TextField style={{marginBottom: '3vh', backgroundColor: '#d1d1d1', borderRadius: '5px'}} value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email" type="email" variant="outlined" color="secondary"/>
            <Button variant="contained" onClick={()=>{
              if(email.toLowerCase().split("@").length==2&&email.toLowerCase().split("@")[1].includes(".")&&email.toLowerCase().split("@")[0].length>0){
                const newPostKey = push(child(ref(db), 'updates')).key;
                const updates = {};
                updates['/updates/' + newPostKey] = email;
                update(ref(db), updates).then(()=>{
                  alert("Success! You will be notified when bot ink is available for public use.")
                }).catch(err=>{
                  alert(err)
                })
              } else{
                alert("Please enter a valid email address!")
              }
            }}>Submit</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;