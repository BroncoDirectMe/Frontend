import { Button, Typography } from '@mui/material';
import React from 'react';
import '../styles/panel_component.css';

interface PanelProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) =>
  isOpen ? (
    <div className={'panel'}>
      <div className={'margin'}>
        <Typography variant="h5" className={'title'}>
          {title}
        </Typography>
        <div className={'content'}>
          {children}
          <Button className={'closeBtn'} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  ) : null;
