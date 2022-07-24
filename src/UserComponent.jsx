import React, { useState } from 'react';
import './App.css';
import 'react-circular-progressbar/dist/styles.css';
import image from './images/download3.jfif';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { PieChart } from 'react-minimal-pie-chart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import users from './Users';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { Popup } from 'semantic-ui-react';

const UserComponent=(props)=>{
    const index=props.index;
    const user=props.user;
    const [usersArray,setUsersArray]=useState(users);
    const navigate=useNavigate();

    const addSteps=()=>{
        let temp_users=[...usersArray];
        let temp_user=temp_users[index];

        temp_user.stepsTarget=temp_user.stepsTarget+500;
        temp_users[index]=temp_user;

        setUsersArray(temp_users);
    }

    const removeSteps=()=>{
        let temp_users=[...usersArray];
        let temp_user=temp_users[index];

        temp_user.stepsTarget=Math.max(0,temp_user.stepsTarget-500);
        temp_users[index]=temp_user;

        setUsersArray(temp_users);
    }

    const addCalories=()=>{
        let temp_users=[...usersArray];
        let temp_user=temp_users[index];

        temp_user.calorieTarget=temp_user.calorieTarget+100;
        temp_users[index]=temp_user;

        setUsersArray(temp_users);
    }

    const removeCalories=()=>{
        let temp_users=[...usersArray];
        let temp_user=temp_users[index];

        temp_user.calorieTarget=Math.max(0,temp_user.calorieTarget-100);
        temp_users[index]=temp_user;

        setUsersArray(temp_users);
    }

    const handleWorkout=()=>{
        navigate(`${index}/workout`);
    }

    const handleNutrition=()=>{
        navigate(`${index}/nutrition`);
    }

    return (
        <>
            <div className="App_main">
                

                <div className='user_comp'>
                    <div className='userinfo'>
                        <img className='userinfo_pic' src={image} alt='pic'></img>
                        <div className='userinfo_ne'>
                        <input readOnly value={user.name}></input>
                        <input readOnly value={user.email} style={{fontSize:'x-small',marginTop:'5px'}}></input>
                        </div>
                    </div>

                    <div className='action_class'>
                        {/* step component */}
                        <div className='user_comp_step'>
                            <div className='progressbar'>
                                <CircularProgressbar value={user.stepsWalked/user.stepsTarget*100} styles={buildStyles({pathColor:'#7FD18C'})}/>
                                <div className='progressbar_inside' >
                                    <span style={{fontSize:'x-small',color:'white',fontWeight:'bold'}}>{user.stepsWalked}</span>
                                    <span style={{fontSize:'xx-small',color:'white'}}>walked</span>
                                </div>
                            </div>
                            <div className='user_comp_step_info'>
                                <AddIcon className='increment' onClick={addSteps}></AddIcon>
                                <input readOnly style={{fontWeight:'bold'}} value={`${user.stepsTarget/1000}k`}></input>
                                <input readOnly style={{fontSize:'x-small'}} value="target"></input>
                                <RemoveIcon className='decrement' onClick={removeSteps}></RemoveIcon>
                            </div>
                        </div>

                        {/* workout component */}
                        <div className='user_comp_workout'>
                            <div className='user_comp_workout_info'>
                                <div className='user_comp_workout_icon'>
                                <PersonAddAlt1Icon></PersonAddAlt1Icon>
                                <EventAvailableIcon style={{marginTop:'10px'}}></EventAvailableIcon>
                                </div>
                                <div className='user_comp_workout_icon_info'>
                                <input readOnly style={{paddingLeft:'10px',width:'100%',border:'none',color:'#FFFFFF'}} value={user.performedDate}></input>
                                <input readOnly style={user.scheduledDate===user.performedDate?{paddingLeft:'10px',width:'100%',border:'none',color:'#FFFFFF',marginTop:'10px',backgroundColor:'#CC3838'}:{paddingLeft:'10px',width:'100%',border:'none',color:'#FFFFFF',marginTop:'10px'}} value={user.scheduledDate}></input>
                                </div>
                            </div>
                            {
                                user.feedback===true?<PriorityHighIcon className='arrow' onClick={handleWorkout} style={{backgroundColor:'#CC3838'}} />:<KeyboardArrowRightIcon className='arrow' onClick={handleWorkout} />
                            }
                            
                        </div>

                        {/* nutrition component */}
                        <div className='user_comp_nutr'>
                            <Popup trigger={
                                        <div className='piechart'>
                                            <PieChart
                                                data={[
                                                    { title: 'protein', value: user.proteinConsumed, color: '#F5C90F' },
                                                    { title: 'fats', value: user.fatConsumed, color: '#03C7FC' },
                                                    { title: 'carbs', value: user.carbConsumed, color: '#F45C84' },
                                                ]}
                                            />
                                            <div className='chart_inside' style={{cursor:'pointer'}}>
                                                <span style={{fontSize:'x-small',color:'white',fontWeight:'bold'}}>{user.calorieIntake}</span>
                                                <span style={{fontSize:'xx-small',color:'white'}}>calories</span>
                                            </div>
                                        </div>
                                    } position="bottom">

                                            <div className='tooltip'>
                                                <div className='tooltip_div' >
                                                    <input readOnly value='PROTEIN'/>
                                                    <input readOnly value={`${user.proteinTarget}g`} style={{textAlign:'right'}}/>
                                                    <Progress className='progress' percent={Math.floor(user.proteinConsumed/user.proteinTarget*100)} theme={{active: {color: '#F45C84',trailColor:'#101317'}}} ></Progress>
                                                </div>
                                                <div className='tooltip_div' >
                                                    <input readOnly value='FATS'/>
                                                    <input readOnly value={`${user.fatTarget}g`} style={{textAlign:'right'}}/>
                                                    <Progress className='progress' percent={Math.floor(user.fatConsumed/user.fatTarget*100)} theme={{active: {color: '#03C6FA',trailColor:'#101317'}}}></Progress>
                                                </div>
                                                <div className='tooltip_div' >
                                                    <input readOnly value='CARBS'/>
                                                    <input readOnly value={`${user.carbTarget}g`} style={{textAlign:'right'}}/>
                                                    <Progress className='progress' percent={Math.floor(user.carbConsumed/user.carbTarget*100)} theme={{active: {color: '#F0C50F',trailColor:'#101317'}}}></Progress>
                                                </div>
                                            </div>
                            </Popup>
                            
                            <div className='user_comp_nutr_info'>
                                <AddIcon className='increment' onClick={addCalories}></AddIcon>
                                <input readOnly style={{fontWeight:'bold'}} value={`${user.calorieTarget/1000}k`}></input>
                                <input readOnly style={{fontSize:'x-small'}} value='target'></input>
                                <RemoveIcon className='decrement' onClick={removeCalories}></RemoveIcon>
                            </div>

                            <KeyboardArrowRightIcon className='arrow' onClick={handleNutrition}></KeyboardArrowRightIcon>
                        </div>
                    </div>

                    <NotificationsNoneIcon className='notification'></NotificationsNoneIcon>
                
                </div>
            </div>

            {/* will be used when screen width is less then 768px */}
            <div className="App_main2">
                <div className='user_comp'>
                    <div className='userinfo'>
                        <img className='userinfo_pic' src={image} alt='pic'></img>
                        <div className='userinfo_ne'>
                        <input readOnly value={user.name}></input>
                        <input readOnly value={user.email} style={{fontSize:'small'}}></input>
                        </div>
                        <NotificationsNoneIcon className='notification'></NotificationsNoneIcon>
                    </div>

                    <div className='action_class'>
                        <div className='user_comp_step'>
                            <div className='progressbar_main' style={{ width: '35px', height: "35px",position:'relative',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <CircularProgressbar value={user.stepsWalked/user.stepsTarget*100} styles={buildStyles({pathColor:'#7FD18C'})}/>
                                <div className='progressbar_inside' >
                                    <span style={{fontSize:'7px',color:'white',fontWeight:'bold'}}>{user.stepsWalked}</span>
                                    <span style={{fontSize:'5px',color:'white'}}>walked</span>
                                </div>
                            </div>
                        <div className='user_comp_step_info'>
                            <AddIcon className='increment' onClick={addSteps}></AddIcon>
                            <input readOnly style={{fontWeight:'bold',fontSize:'small'}} value={`${user.stepsTarget/1000}k`}></input>
                            <input readOnly style={{fontSize:'x-small'}} value="target"></input>
                            <RemoveIcon className='decrement' onClick={removeSteps}></RemoveIcon>
                        </div>
                        </div>

                        <div className='user_comp_workout'>
                        <div className='user_comp_workout_info'>
                            <div className='user_comp_workout_icon'>
                            <PersonAddAlt1Icon className='scheduledate'></PersonAddAlt1Icon>
                            <EventAvailableIcon className='targetdate'></EventAvailableIcon>
                            </div>
                            <div className='user_comp_workout_icon_info'>
                            <input readOnly  value={user.performedDate}></input>
                            <input readOnly  value={user.scheduledDate} style={user.scheduledDate===user.performedDate?{marginTop:'5px',backgroundColor:'#CC3838'}:{marginTop:'5px'}}></input>
                            </div>
                        </div>
                        {
                            user.feedback===true?<PriorityHighIcon className='arrow' onClick={handleWorkout} style={{backgroundColor:'#CC3838'}} />:<KeyboardArrowRightIcon className='arrow' onClick={handleWorkout} />
                        }
                        </div>

                        <div className='user_comp_nutr'>
                            

                            <Popup trigger={
                                        <div className='piechart'>
                                            <PieChart
                                                data={[
                                                    { title: 'One', value: user.proteinConsumed, color: '#F5C90F' },
                                                    { title: 'Two', value: user.fatConsumed, color: '#03C7FC' },
                                                    { title: 'Three', value: user.carbConsumed, color: '#F45C84' },
                                                ]}
                                            />
                                            <div className='chart_inside' >
                                                <span style={{fontSize:'7px',color:'white',fontWeight:'bold'}}>{user.calorieIntake}</span>
                                                <span style={{fontSize:'5px',color:'white'}}>calories</span>
                                            </div>
                                        </div>
                                    } position="bottom center">

                                            <div className='tooltip'>
                                                <div className='tooltip_div' >
                                                    <input readOnly value='PROTEIN'/>
                                                    <input readOnly value={`${user.proteinTarget}g`} style={{textAlign:'right'}}/>
                                                    <Progress className='progress' percent={Math.floor(user.proteinConsumed/user.proteinTarget*100)} theme={{active: {color: '#F45C84',trailColor:'#101317'}}} ></Progress>
                                                </div>
                                                <div className='tooltip_div' >
                                                    <input readOnly value='FATS'/>
                                                    <input readOnly value={`${user.fatTarget}g`} style={{textAlign:'right'}}/>
                                                    <Progress className='progress' percent={Math.floor(user.fatConsumed/user.fatTarget*100)} theme={{active: {color: '#03C6FA',trailColor:'#101317'}}}></Progress>
                                                </div>
                                                <div className='tooltip_div' >
                                                    <input readOnly value='CARBS'/>
                                                    <input readOnly value={`${user.carbTarget}g`} style={{textAlign:'right'}}/>
                                                    <Progress className='progress' percent={Math.floor(user.carbConsumed/user.carbTarget*100)} theme={{active: {color: '#F0C50F',trailColor:'#101317'}}}></Progress>
                                                </div>
                                            </div>
                            </Popup>
                        <div className='user_comp_nutr_info'>
                            <AddIcon className='increment' onClick={addCalories}></AddIcon>
                            <input readOnly style={{fontWeight:'bold'}} value={`${user.calorieTarget/1000}k`}></input>
                            <input readOnly style={{fontSize:'x-small'}} value='target'></input>
                            <RemoveIcon className='decrement' onClick={removeCalories}></RemoveIcon>
                        </div>
                        <KeyboardArrowRightIcon className='arrow' onClick={handleNutrition}></KeyboardArrowRightIcon>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserComponent;