import React from 'react';
import UserComponent from './UserComponent';
import users from './Users';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WebhookIcon from '@mui/icons-material/Webhook';

const Dashboard=()=>{
    return (
        <div className="App">

            {/* this is our heading area */}
            <div className="options">
                <div style={{width:'28%',backgroundColor:'transparent'}}></div>
                <div className='options_main'>
                    <div className="option_steps">
                    <DirectionsWalkIcon style={{color:'white',backgroundColor:'#101317',paddingRight:'3px',fontSize:'25px'}}></DirectionsWalkIcon>
                    <input value="Steps"></input>
                    </div>
                    <div className="option_workout">
                    <FitnessCenterIcon style={{color:'white',backgroundColor:'#101317',paddingRight:'3px',fontSize:'25px',transform:'rotate(90deg)'}}></FitnessCenterIcon>
                    <input value="Workout"></input>
                    </div>  
                    <div className="option_nutrition">
                    <WebhookIcon style={{color:'white',backgroundColor:'#101317',paddingRight:'3px',fontSize:'25px'}}></WebhookIcon>
                    <input value="Nutrition"></input>
                    </div>
                </div>
                <div style={{width:'',backgroundColor:'transparent'}}></div>
            </div>

            {/* here is the mapping of our users */}
            {
                users.map((User,index)=>{
                return (<UserComponent index={index} user={User}></UserComponent>);
                })
            }
        </div>    
    );
}

export default Dashboard;