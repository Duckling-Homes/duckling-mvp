import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';
import { checkDeviceType } from '@/hooks/checkDeviceType';
import Link from 'next/link';

interface CustomMenuProps {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null
  handleSignout: () => void;
}

export default function CustomMenu({
  open, handleClose, anchorEl, handleSignout
}: CustomMenuProps) {
  const device = checkDeviceType();

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
      {device === 'phone' &&
        <Link href="/" passHref>
          <MenuItem>
            Projects List
          </MenuItem>
        </Link>
      }
      <MenuItem onClick={handleSignout}>Logout</MenuItem>
    </Menu>
  );
}