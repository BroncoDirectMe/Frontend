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
    <div className={'Modal'}>
        <div className={'ModalOverlay'} />
        <div className={'ModalBox'}>
            <div className={'ModalTitle'}>
                { title }
            </div>
            <div className={'ModalContent'}>
                { children }
            </div>
            <Button 
                onClick={onClose}
                className="ModalCloseBtn"
                > Close </Button>
        </div>
    </div>
) : null; 