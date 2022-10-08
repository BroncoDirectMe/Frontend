import { Button } from '@mui/material';
import React from 'react';
import CSS from 'csstype';

interface PanelProps
{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const PanelStyle: CSS.Properties = {
    height: '200px',
    width: '200px',
    border: '2px gray',
    borderRadius: '5px'
  };

const ButtonStyle: CSS.Properties = {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center'
};

export const Panel: React.FC<PanelProps> = ({title, isOpen, onClose, children}) => isOpen ?
(
    <div style={PanelStyle}
         className={'panel'}>
        <h3 className={'title'}>
            {title}
        </h3>
        <div className={'content'}>
            {children}
        <Button 
            style={ButtonStyle}
            className={'closeBtn'} 
            onClick={onClose}>Close</Button>
        </div>
    </div>
) : null;