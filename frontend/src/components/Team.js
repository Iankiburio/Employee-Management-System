import React from 'react';
import '../css/about.css';

function Team(){
    
    return(
      <section id="developers-team">
        <div className='team'>
            <h1>Dev team</h1>
            <div className='about-cards'>
            <div className='individual-card'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1vuzW6wb2nju6RlKd2jLZkzihEdySc_qeg&usqp=CAU'
                className='about-img'
                alt='Developer 3'></img>
                <h3>Newton Bundi</h3>
                <p>Fullstack developer</p>
            </div>
            <div className='individual-card'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXfxl6vkDx7ETp2HN5W_3SJs-fD_33rMFxgA&usqp=CAU'
                className='about-img'
                alt='Developer 4'></img>
                <h3>Faith Achieng</h3>
                <p>Fullstack developer</p>
            </div>
            <div className='individual-card'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoB9MI5iNDtogDQXCYFNijLtKtWCyz4q97DQ&usqp=CAU'
                className='about-img'
                alt='Developer 1'></img>
                <h3>Lucy Kariuki</h3>
                <p>Fullstack developer</p>
            </div>
            <div className='individual-card'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2s0rsNNpUtO5yD3FuHI-NiPxOob7eFYnr8Fmd_CnhPF2DEWKYoYG_Lv2jCw&s'
                className='about-img'
                alt='Developer 1'></img>
                <h3>Ian Kiburio</h3>
                <p>Fullstack developer</p>
            </div>
            <div className='individual-card'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpuZVkfmNVYUG9apjwQ30yxuMXL83usa_Jxg&usqp=CAU'
                className='about-img'
                alt='Developer 2'></img>
                <h3>Eunice Mwenda</h3>
                <p>Fullstack developer</p>
            </div>
            </div>
        </div>
        </section>
    );
}

export default Team;
