import { Button, Typography } from '@mui/material';
import React from 'react';
import CSS from 'csstype';

interface PanelProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PanelStyle: CSS.Properties = {
  display: 'flex',
  height: '200px',
  width: '200px',
};

const ButtonStyle: CSS.Properties = {
  position: 'absolute',
  marginBottom: '12px',
  textAlign: 'center',
  bottom: 0,
};

const MarginStyle: CSS.Properties = {
  margin: '5px 5px 5px 5px',
};

export const Panel: React.FC<PanelProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) =>
  isOpen ? (
    <div style={PanelStyle} className={'panel'}>
      <div className={'margin'} style={MarginStyle}>
        <Typography variant="h5" className={'title'}>
          {title}
        </Typography>
        <div className={'content'}>
          {children}
          <Button style={ButtonStyle} className={'closeBtn'} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  ) : null;
