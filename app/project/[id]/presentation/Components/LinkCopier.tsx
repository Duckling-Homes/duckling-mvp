import { Button } from '@mui/material'
import React, { useState } from 'react'

import './style.scss'
import { ContentCopy } from '@mui/icons-material'

const LinkCopier: React.FC<{ link: string }> = ({ link }) => {
  const [buttonText, setButtonText] = useState('Copy Link')

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setButtonText('Copied!')
        setTimeout(() => setButtonText('Copy Link'), 2000)
      })
      .catch((err) => {
        setButtonText('Copy Failed')
        console.error('Failed to copy link: ', err)
      })
  }

  const shortenedLink = `${link.substring(0, 75)}...`

  return (
    <div className="linkCopier">
      <p className="linkCopier__text">{shortenedLink}</p>
      <Button
        startIcon={<ContentCopy />}
        variant="contained"
        size="small"
        onClick={copyToClipboard}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default LinkCopier
