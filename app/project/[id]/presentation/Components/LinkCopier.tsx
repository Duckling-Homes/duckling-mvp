import { Button } from '@mui/material'
import React, { useState } from 'react'

const LinkCopier: React.FC<{ link: string }> = ({ link }) => {
  const [buttonText, setButtonText] = useState('Copy Shareable Link')

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setButtonText('Copied!')
        setTimeout(() => setButtonText('Copy Shareable Link'), 2000)
      })
      .catch((err) => {
        setButtonText('Copy Failed')
        console.error('Failed to copy link: ', err)
      })
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <p style={{ marginRight: '20px', fontSize: '16px', fontWeight: '300' }}>
        {link}
      </p>
      <Button variant="contained" size="small" onClick={copyToClipboard}>
        {buttonText}
      </Button>
    </div>
  )
}

export default LinkCopier
