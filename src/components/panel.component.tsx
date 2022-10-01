import { Button } from '@mui/material';
import React from 'react';

interface PanelProps
{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({title, isOpen, onClose, children}) =>
(
<div className={'panel'}>
        <div className={'title'}>
            {title}
        </div>
        <div className={'content'}>
            {children}
        <Button className={'closeBtn'} 
            onClick={onClose}>Close</Button>
        </div>
    </div>
);