import React, { ReactElement, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';


interface ModalProps {

    modal: boolean;
    modalClose: any;
    children: ReactElement;

  }
  
  const modalRootElement = document.querySelector('#modal')
  
export const Modal = ({modal, modalClose, children}: ModalProps) => {
  
    const element = useMemo(() => document.createElement('div'), [])
  
    useEffect( () => {
      if ( modal && modalRootElement){
  
        modalRootElement.appendChild(element)
  
        return () => {
          modalRootElement.removeChild(element)
        }
      }
    }, [modal])
  
    if ( modal && modalRootElement ){
    
      return ReactDOM.createPortal(
        <>
          
        {children}
          
          
        </>, modalRootElement
      )
    }
    return null
    
  }