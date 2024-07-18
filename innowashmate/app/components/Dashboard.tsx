import React from 'react';
import Image from 'next/image';
import arrow from '../assets/arrow.svg';
import './dashboard.css'
const Dashboard: React.FC = () => {
    return (
        <div className='home'>
            <div className='centring'>
                <div className='dropselection'>
                    <select name="dorm" className='dchoice'>
                        <option value="6">Dorm 6</option>
                        <option value="7">Dorm 7</option>
                    </select>
                    <select name="floor" className='dchoice'>
                        <option value="1">Floor 1</option>
                        <option value="2">Floor 2</option>
                        <option value="3">Floor 3</option>
                        <option value="4">Floor 4</option>
                        <option value="5">Floor 5</option>
                        <option value="6">Floor 6</option>
                        <option value="7">Floor 7</option>
                        <option value="8">Floor 8</option>
                        <option value="9">Floor 9</option>
                        <option value="10">Floor 10</option>
                        <option value="11">Floor 11</option>
                        <option value="12">Floor 12</option>
                        <option value="13">Floor 13</option>
                    </select>
                </div>
                <div className='radios'>
                    <div className='radiostyle'>
                        <input type="radio" id="Washer1" name='machine' />
                        <label htmlFor="Washer1">Washer 1</label>
                    </div>
                    <div className='radiostyle'>
                        <input type="radio" id="Washer2" name='machine' />
                        <label htmlFor="Washer2">Washer 2</label>
                    </div>
                    <div className='radiostyle'>
                        <input type="radio" id="Dryer1" name='machine' />
                        <label htmlFor="Dryer1">Dryer 1</label>
                    </div>
                    <div className='radiostyle'>
                        <input type="radio" id="Dryer2" name='machine' />
                        <label htmlFor="Dryer2">Dryer 2</label>
                    </div>
                </div>
                <div className='schdule'>
                    <div className='days'>
                        <div className='daystyle'>
                            <h1>Today</h1>
                        </div>
                        <div className='daystyle'>
                            <h1>Tomorrow</h1>
                        </div>
                        <div className='daystyle'>
                            <h1 className='longday'>Day After Tomorrow</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
