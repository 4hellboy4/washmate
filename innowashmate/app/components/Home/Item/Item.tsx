import React from 'react';
import Image from 'next/image';
import clock from '../../../assets/clock.svg';
import './Item.css'

interface Props {
    interval: string;
    machine: string;
    left_time: string;
}

const Item: React.FC<Props> = ({interval, machine, left_time}) => {
    return (
        <div className='bookbox'>
            <p className='interval'>{interval}</p>
            <Image src={clock} alt='clock' className='clock'></Image>
            <div className='machinecont'>
                <h1 className='machine'>{machine}</h1>
                <p className='time'>{left_time}</p>
            </div>
        </div>
    );
};

export default Item;
