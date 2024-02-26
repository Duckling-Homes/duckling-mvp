import { checkDeviceType } from '@/hooks/checkDeviceType'
import { Menu } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'

interface CustomMenuProps {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLElement | null
  handleSignout: () => void
}

export default function CustomMenu({
  open,
  handleClose,
  anchorEl,
  handleSignout,
}: CustomMenuProps) {
  const device = checkDeviceType()

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
      {device === 'phone' && (
        <Link href="/" passHref>
          <MenuItem>Projects</MenuItem>
        </Link>
      )}
      <MenuItem onClick={handleSignout}>Logout</MenuItem>
    </Menu>
  )
}
