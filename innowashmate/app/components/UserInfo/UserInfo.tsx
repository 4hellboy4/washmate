import React from 'react';
import styles from './UserInfo.module.css';

interface props {
    name: string;
    surname: string;
    email: string;
    tg_alias: string;
    avatar: string;
}

const UserInfo: React.FC<props> = (
{
    name="Name",
    surname="Surname",
    email="n.surname@innopolis.university",
    tg_alias="@aliasName",
    avatar = "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20width%3D'24'%20height%3D'24'%3E%3Cpath%20fill%3D'black'%20d%3D'M12%2017.5q1.325%200%202.513-.575t1.912-1.675q.275-.425.075-.837T15.85%2014q-.2%200-.362.088t-.263.262q-.575.775-1.425%201.213T12%2016t-1.8-.437t-1.425-1.213q-.125-.175-.288-.262T8.125%2014q-.45%200-.65.4t.075.8q.725%201.125%201.913%201.713T12%2017.5m3.5-6.5q.625%200%201.063-.437T17%209.5t-.437-1.062T15.5%208t-1.062.438T14%209.5t.438%201.063T15.5%2011m-7%200q.625%200%201.063-.437T10%209.5t-.437-1.062T8.5%208t-1.062.438T7%209.5t.438%201.063T8.5%2011M12%2022q-2.075%200-3.9-.788t-3.175-2.137T2.788%2015.9T2%2012t.788-3.9t2.137-3.175T8.1%202.788T12%202t3.9.788t3.175%202.137T21.213%208.1T22%2012t-.788%203.9t-2.137%203.175t-3.175%202.138T12%2022m0-2q3.35%200%205.675-2.325T20%2012t-2.325-5.675T12%204T6.325%206.325T4%2012t2.325%205.675T12%2020'%2F%3E%3C%2Fsvg%3E"
}) => {


    return(
        <div className={styles.userInfo}>
            <img className={styles.avatar} src={avatar} alt="avatar"/>
            <span className={styles.name}>{name} {surname}</span>
            <span className={styles.email}>{email}</span>
            <span className={styles.tg}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className={styles.icon}>
                    <path
                        d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/>
                </svg>
                {tg_alias}
            </span>
        </div>
    );
}

export default UserInfo;
