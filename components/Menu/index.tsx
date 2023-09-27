import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';

export default function CustomMenu({ open, handleClose, anchorEl }) {
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