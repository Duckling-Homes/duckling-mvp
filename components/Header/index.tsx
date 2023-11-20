'use client'

import { HomeOutlined, MenuOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useClerk, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { checkDeviceType } from '../../hooks/checkDeviceType'
import CustomMenu from '../Menu'
import Link from 'next/link'

import './styles.scss'
import ModelStore from '@/app/stores/modelStore'
import { Organization } from '@/types/types'
import PendingStatus from '../PendingStatus'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [organization, setOrganization] = useState<null | Organization>(
    ModelStore.organization
  )

  const open = Boolean(anchorEl)
  const { signOut } = useClerk()
  const { user } = useUser()

  useEffect(() => {
    if (organization || !user) return

    const organizationId = user?.publicMetadata.organization_id as
      | string
      | undefined

    if (organizationId) {
      ModelStore.fetchOrganization(organizationId).then((data) =>
        setOrganization(data)
      )
    }
  }, [organization, user])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const doSignOut = () => {
    signOut()
  }

  const device = checkDeviceType()

  return (
    <>
    <div className="header">
      {device !== 'phone' && (
        <Link href="/" passHref>
          <IconButton
            sx={{
              borderRadius: '4px',
              backgroundColor: '#2196F3',
              color: '#fff',
              padding: '8px 22px',
            }}
            aria-label="delete"
          >
            <HomeOutlined />
          </IconButton>
        </Link>
      )}
      <p className='header__title'>{organization?.name}</p>
      <IconButton
        sx={{
          borderRadius: '4px',
          backgroundColor: '#2196F3',
          color: '#fff',
          padding: device === 'phone' ? '8px 12px' : '8px 22px',
        }}
        onClick={handleClick}
        aria-label="delete"
      >
        <MenuOutlined fontSize='small' />
      </IconButton>
      <CustomMenu
        handleSignout={doSignOut}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </div>
    <PendingStatus/>
    </>
  )
}

export default Header
