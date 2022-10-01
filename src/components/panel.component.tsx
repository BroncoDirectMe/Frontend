import { Button } from '@mui/material';
import React from 'react';

interface PanelProps
{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({title, isOpen, onClose, children}) => isOpen ?
(
<div className={'panel'}>
        <Button className={'closeBtn'} 
                onClick={onClose}>Close</Button>
        <div className={'title'}>
            {title}
        </div>
        <div className={'content'}>
            {children}
        </div>
    </div>
) : null;