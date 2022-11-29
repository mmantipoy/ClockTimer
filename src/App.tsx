import { ChildContextProvider, ReactElement, useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ReactDOM, { createPortal } from 'react-dom';
import Select from 'react-select';
import { Modal } from './components/Modal';
import { TimerSettup } from './components/TimerSettup';

const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60 

const Timer = () => {

  
  const [modal, setModal] = useState(false)
  const [time, setTime] = useState(0)
  const [intervalL, setIntervalL] = useState<null|number>(null)
  const [mode , setMode] = useState<'timer'|'stopwatch'>('stopwatch')
  const [endAllertModal, setEndAllertModal] = useState(false)

  useEffect( () => {
    
    if  ( mode === 'timer' ){
      
      if ( time < 1) {

        setEndAllertModal(true)
        onTimerStop()
        
      }
    } else {
      if ( time > 89998) {

        onTimerStop()
      }
    }
  } ,[time])

   useEffect ( () => {

    onTimerStop()

    console.log(mode);

    if ( mode === 'stopwatch' ){

      setTime(0);
      (document.querySelector('#clock_stopwatch_select_but') as HTMLButtonElement).disabled = true;
      (document.querySelector('#clock_timer_select_but') as HTMLButtonElement).disabled = false;

    } else {
      setTime(3600);
      setModal(true);
      (document.querySelector('#clock_stopwatch_select_but') as HTMLButtonElement).disabled = false;
      (document.querySelector('#clock_timer_select_but') as HTMLButtonElement).disabled = true;
    }


  }, [mode])

  function onTimerStart(){
    let inte = null
    if ( mode === 'stopwatch' ) {
      if ( time < 89999 )
      inte = setInterval(() => {

        setTime( t => t + 1)
          
      }, 1000)
      } else 
    
    if ( time > 0) {
      
      inte = setInterval(() => {

        setTime( t => t - 1)
          
      }, 1000)
      }
      
      setIntervalL(inte)
    
  }

  function onTimerStop(){

    if ( intervalL !== null)
    clearInterval(intervalL)
    
  }

  const renderNumber = (time_: number) => {
    if ( time_ > 9 ){
      return (
        <>
          <div className='timer_display_number'>
            {Math.trunc(time_ / 10)}{Math.trunc(time_ % 10)}
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='timer_display_number'>
            {0}{time_}
          </div>

        </>
      )
    }
    
  }

  return (
  <> 
    <div className='timer'>
      <div className='timer_header'>
        <button id='clock_timer_select_but' className='timer_header_button'
        onClick={() => setMode('timer')}
        >
          <img
            height={25}
            width={25}
            src='src\assets\png\clock-solid.png' />
        </button>
        <button id='clock_stopwatch_select_but' className='timer_header_button'
        onClick={() => setMode('stopwatch')}>
          <img
            height={25}
            width={25}
            src='src\assets\png\stopwatch-solid.png' />
        </button>
        <div className='j-s-fe'>
          <p>
            {mode}
          </p>
        </div>
        <button className='timer_header_button'
          onClick={()=> setModal(() => true)}
        >
          
          <img
          height={25}
          width={25}
          src='src\assets\png\clock-rotate-left-solid.png' />
        </button>
        
        <Modal modal={modal} modalClose={() => setModal(() =>false) } >
            
            <TimerSettup setModal = {setModal} intervalL={intervalL} setTime={setTime}/>
            
        </Modal>

        <Modal modal={endAllertModal} modalClose={() => setEndAllertModal(() =>false) } >
            
            <>
            <div>
              ghghgh  
            </div></>
            
        </Modal>
        <button className='timer_header_button'
        >
          <img
          height={25}
          width={25}
          src='src\assets\png\settings.png'/>
        </button>
      </div>
      <div className='timer_display'>

        {renderNumber(Math.trunc(time / HOUR))}
        {renderNumber(Math.trunc((time / MINUTE) % 60))}
        {renderNumber(Math.trunc((time / SECOND) % 60))}

      </div>

      <div className='timer_buttons'>
        <button
          onClick={onTimerStart}
          className='timer_buttons_button'
        >
          Start {mode}
        </button>
        <button
          onClick={onTimerStop}
          className='timer_buttons_button'
        >
          Stop {mode}
        </button>
      </div>
      
    </div>
    

  </>)
}

// interface ModalProps {

//   modal: boolean;
//   modalClose: any;
//   // children: ReactElement;
//   children: string;
//   tempHours: any;
//   setTempHours: any
// }

// const modalRootElement = document.querySelector('#modal')

// const Modal = ({modal, modalClose, children,tempHours,setTempHours}: ModalProps) => {

//   const element = useMemo(() => document.createElement('div'), [])

//   useEffect( () => {
//     if ( modal && modalRootElement){

//       modalRootElement.appendChild(element)

//       return () => {
//         modalRootElement.removeChild(element)
//       }
//     }
//   }, [modal])

//   if ( modal && modalRootElement ){
    
//     return ReactDOM.createPortal(
//       <>
//         <button onClick={() => {setTempHours()}}>
//         {tempHours}
//         </button>
        
//       </>, modalRootElement
//     )
//   }
//   return null
  
// }

function App() {
  

  return (
    <div className="App">
      
      <Timer />
      
      
    </div>
  )
}

export default App
// interface time {

//   H: number;
//   M: number;
//   S: number;
//   MM: number;
// }

  // const [time, setTime] = useState<time>({H: 1, M: 40, S: 60, MM: 60 })
  // const int = () => useEffect(() => {
  //   const interval = setInterval(() => setTime(time -1), 1000);

  //   return () => clearInterval(interval);
  // }, [time]);
  
  // const timeSum = () => {

  //   return time.H + time.M + time.S + time.MM
  // }

  // const changeTime = ( h=0, m=0, s=0, mm=0 ) => {

  //   setTime(t => { return {H: t.H - h, M: t.M - m, S: t.S - s, MM: t.MM - mm}})
  // }

  // const setTime_ = (h=0, m=0, s=0, mm=0) => {

  //   setTime(t => { return {H: h, M: m, S: s, MM: mm}})
  // }