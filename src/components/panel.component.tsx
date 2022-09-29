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
    <div className={'panelOverlay'} />
    <div className={'panelBox'}>
        <div className={'panelCloseBtn'}>
        </div>
        <div className={'panelTitle'}>
            {title}
        </div>
        <div className={'panelContent'}>
            {children}
        </div>
    </div>
</div>
);