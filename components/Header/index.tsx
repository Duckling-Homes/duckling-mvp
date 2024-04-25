'use client'

import { HomeOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'

import { useClerk, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { checkDeviceType } from '../../hooks/checkDeviceType'
import CustomMenu from '../Menu'

import ModelStore from '@/app/stores/modelStore'
import { Organization } from '@/types/types'
import { usePostHog } from 'posthog-js/react'
import './styles.scss'

const Header: React.FC<{ publicRoute?: boolean; orgName?: string }> = ({
  publicRoute,
  orgName,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [organization, setOrganization] = useState<null | Organization>(
    ModelStore.organization
  )
  const [organizationName, setOrganizationName] = useState<string | undefined>(
    orgName
  )

  const open = Boolean(anchorEl)
  const { signOut } = useClerk()
  const { user } = useUser()
  const posthog = usePostHog()

  useEffect(() => {
    if (organization || !user) return

    const organizationId = user?.publicMetadata.organization_id as
      | string
      | undefined

    if (organizationId) {
      ModelStore.fetchOrganization(organizationId).then((data) => {
        setOrganization(data)
        setOrganizationName(data?.name)
      })
    }
  }, [organization, user])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const doSignOut = () => {
    posthog?.capture('clicked_logout')
    signOut()
  }

  const device = checkDeviceType()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!publicRoute && device !== 'phone' && (
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            {organization ? organization.name : organizationName}
          </Typography>
          {!publicRoute && (
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
              <MenuOutlined fontSize="small" />
            </IconButton>
          )}
          <CustomMenu
            handleSignout={doSignOut}
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
