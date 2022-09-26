import React from "react";

interface settingsPanelProps
{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const PopUp: React.FC<settingsPanelProps> = ({ title, isOpen, onClose, children }) => isOpen ?
(
    <div className={'PopUp'}>
        <div className={'PopUpOverlay'} />
        <div className={'PopUpBox'}>
            <div className={'PopUpTitle'}>
                { title }
            </div>
            <div className={'PopUpContent'}>
                { children }
            </div>
            <div className="PopUpCloseBtn">
                Close
            </div>
        </div>
    </div>
) : null; 