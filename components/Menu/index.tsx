import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';

interface CustomMenuProps {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null
}

export default function CustomMenu({
  open, handleClose, anchorEl
}: CustomMenuProps) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  );
}