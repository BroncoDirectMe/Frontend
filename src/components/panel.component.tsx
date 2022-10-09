import { Button } from '@mui/material';
import React from 'react';
import CSS from 'csstype';
import { BorderAllRounded, BorderStyle } from '@mui/icons-material';

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
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderRadius: '2px'
  };

const ButtonStyle: CSS.Properties = {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
};

const MarginStyle: CSS.Properties = {
    margin: '5px 5px 5px 5px'
};


export const Panel: React.FC<PanelProps> = ({title, isOpen, onClose, children}) => isOpen ?
(
    <div style={PanelStyle}
         className={'panel'}>
        <div className={'margin'}
             style={MarginStyle}>
                <text className={'title'}
                      style={{fontWeight: 'bold'}}>
                    {title}
                </text>
                <div className={'content'}>
                    <br>{children}</br>
                <Button 
                    style={ButtonStyle}
                    className={'closeBtn'} 
                    onClick={onClose}>Close</Button>
                </div>
        </div>
    </div>
) : null;