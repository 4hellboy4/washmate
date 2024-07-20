import React from "react";
import Image from "next/image";
import telegram from "@/app/assets/telegram.svg";

import './PersonalInfo.css';

const PersonalInfo: React.FC = () => {
    return (
        <div className='info'>
            <h1 className='Name'>Ahmed Baha Eddine Alimi</h1>
            <h3 className='email'>a.alimi@innopolis.univeristy</h3>
            <div className='telegram'>
                <Image src={telegram} alt='telegram'></Image>
                <h5 className='telegramtag'>@Allimi3</h5>
            </div>
        </div>
    )
}

export default PersonalInfo;