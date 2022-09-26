import { Button } from "@mui/material";
import React from "react";
import './settingsPanel.component.css';

interface ModalProps
{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => isOpen ?
(
    <div className={'modal'}>
        <div className={'modalOverlay'} />
        <div className={'modalBox'}>
            <div className={'modalTitle'}>
                { title }
            </div>
            <div className={'modalContent'}>
                { children }
            </div>
            <Button 
                onClick={onClose}
                className="modalCloseBtn"
                > Close </Button>
        </div>
    </div>
) : null; 