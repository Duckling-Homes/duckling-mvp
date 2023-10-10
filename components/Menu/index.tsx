import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';

interface CustomMenuProps {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null
  handleSignout: () => void;
}

export default function CustomMenu({
  open, handleClose, anchorEl, handleSignout
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
      <MenuItem onClick={handleSignout}>Logout</MenuItem>
    </Menu>
  );
}