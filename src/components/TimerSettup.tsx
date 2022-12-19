
import React, { useEffect, useRef, useState } from 'react';

interface TimerSettupProps {

    setModal: (x: boolean) => void;
    intervalL: null|number;
    setTime: (x: number) => void
}

export function TimerSettup({setModal, intervalL, setTime}: TimerSettupProps){  
    
      const ref1 = useRef(null)
      const [tempHours, setTempHours] = useState(0)
      const [tempMinutes, setTempMinutes] = useState(0)
      const [tempSeconds, setTempSeconds] = useState(0)
      useEffect ( () => {
        console.log(ref1.current);
      }, [ref1.current])
      const tempTimeChange = (id: string) => {
    
        let c = (document.querySelector('#'+id) as HTMLInputElement)
        // console.log(c.value, parseInt(c.value).toString());
        if ( isNaN(parseInt(c.value)) ) {
          c.value = '';
          return
        }
        if (parseInt(c.value).toString() != c.value ){
    
          switch (id) {
            case 'hs':
              c.value = tempHours.toString()
              return
            case 'ms':
              c.value = tempMinutes.toString()
              return
            case 'ss':
              c.value = tempSeconds.toString()
              return
            
        }}
        switch (id) {
          case 'hs':
            if ( parseInt(c.value) > 24) c.value = '24'
            setTempHours(parseInt(c.value))
            break
          case 'ms':
            if ( parseInt(c.value) > 60) c.value = '60'
            setTempMinutes(parseInt(c.value))
            break
          case 'ss':
            if ( parseInt(c.value) > 60) c.value = '60'
            setTempSeconds(parseInt(c.value))
            break
        
          }
      }
    
      const tempTimeInc = (id: string) => {
        
        let c = (document.querySelector('#'+id) as HTMLInputElement)
        console.log(c.value);
        switch (id) {
          case 'hs':
            
            if ( tempHours > 24 ){ 
              console.log('object');
              setTempHours( 0 )
              c.value = '0'
          } else {
            console.log('object---');
            setTempHours( t => t+ 1)
            let a = tempHours + 1
            c.value = a.toString()
            console.log(tempHours);
            console.log(c.value);
          }
            
            break
          case 'ms':
            if ( tempMinutes > 60 ) { 
              setTempMinutes( 0 )
              c.value = '0'
          } else {
            setTempMinutes( t => t+1)
            c.value = tempMinutes.toString()}
            
            break
          case 'ss':
            if ( tempSeconds > 60 ) { 
              setTempSeconds( 0 )
              c.value = '0'
          } else {
            setTempSeconds( t => t+1)
            c.value = tempSeconds.toString()}
            
            break
        
          }
        
      }
    
      const renderTimeSelectBlock = (id: string) =>{
    
        return (
          <>
            <div className='timer_settings_block_number'>
              <p>{id.split('')[0].toUpperCase()}</p>
              <button 
              onClick={() => tempTimeInc(id)}
              className='timer_settings_arrow'>
                <img 
                height={20}
                width={40}
                src='src\assets\png\arrow-up.png' />
              </button>
              <input ref={ref1} onChange={() => tempTimeChange(id)} id={id} className='timer_settings_time' type="text" placeholder='0' />
              <button  className='timer_settings_arrow'>
                <img 
                height={20}
                width={40}
                src='src\assets\png\arrow-down.png' />
              </button>
            </div>
          </>
        )
      }
      
      const changeMainTime = () => {
        const sum = (tempHours * 60 * 60) + (tempMinutes * 60) + tempSeconds
        if ( sum === 0 ) {
          setModal(false)
          return
        }
        // console.log(tempHours,tempMinutes,tempSeconds);
        setTime( sum )
        setModal(false)
        if ( intervalL !== null)
        clearInterval(intervalL)
        setTempHours(0)
        setTempMinutes(0)
        setTempSeconds(0)
        
      }
    
      const cancelChangeMainTime = () => {
        
        setTempHours(0)
        setTempMinutes(0)
        setTempSeconds(0)
        setModal(false)
        
      }
    return (
        <>
            <div className='timer_settings' >
              
              <div className='timer_container'>
              <div className='p-r' onClick={cancelChangeMainTime}>
                <div className='timer_header_text' > <p> Set you time </p></div>
                <button className='timer_header_button fl-r' >
                  <img 
                  
                  height={20}
                  width={30}
                  src='src\assets\png\x-mark.png' />
                </button>
                </div>
              <div className='timer_settings_block'>

                {renderTimeSelectBlock('hs')}
                {renderTimeSelectBlock('ms')}
                {renderTimeSelectBlock('ss')}
                
                </div>

                <button 
                onClick={changeMainTime}
                className='timer_settings_submit'>
                  Change Time
                </button>

              </div>
              
            </div>
        </>
    )
}