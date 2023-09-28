import React from 'react'
import './Form.css'
import { useState } from 'react'
const Form = () => {
    const[title,setTitle]=useState(null);
    const[openingText,setOpeningText]=useState(null);
    const[releaseDate,setReleaseDate]=useState(null);
    const titleChangeHandler=(event)=>{
        const title1=event.target.value;
       
        setTitle(title1);
        
       }
       const openingTextChangeHandler=(event)=>{
        const openingText1=event.target.value;
       
        setOpeningText(openingText1);
        
       }
       const releaseDateChangeHandler=(event)=>{
        const releaseDate1=event.target.value;
       
        setReleaseDate(releaseDate1);
        
       }
       
    const showHandler=(event)=>{
        event.preventDefault();
        console.log("Title :-"  + title);
        console.log("Opening Text :-"  + openingText);
        console.log("Release Date:-"  + releaseDate)

    }
  return (
    <div className='form'>
      <form action="">
        <div className='section'>
        <label htmlFor="title" >Title:-</label>
       <input type="text" onChange={titleChangeHandler}/>
        </div>
      <div className='section'>
      <label htmlFor="">Opening Text</label>
       <input type="text" onChange={openingTextChangeHandler}/>
      </div>
       <div className='section'>
       <label htmlFor="">Release Date</label>
       <input type="text" onChange={releaseDateChangeHandler}/>
       </div>
       
       <button className='section' onClick={showHandler}>ADD MOVIE</button>
      </form>
    </div>
  )
}

export default Form
