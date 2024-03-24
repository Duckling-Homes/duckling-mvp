import ModelStore from '@/app/stores/modelStore'
import { observer } from 'mobx-react-lite'
import { SyncOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'

import './style.scss'

const PendingStatus = observer(() => {
  const [onlineStatusFiveSecondsAgo, setOnlineStatusFiveSecondsAgo] = useState(
    ModelStore.onlineStatus
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineStatusFiveSecondsAgo(ModelStore.onlineStatus)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        fontSize: '0.75em',
        paddingTop: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'center',
      }}
    >
      {ModelStore.onlineStatus === 'offline' && (
        <div className="syncwarning-offline">
          <div>
            Sync status <SyncOutlined fontSize="inherit" /> Offline.
          </div>
          <div>{`Changes will be synced once you're back online.`}</div>
        </div>
      )}
      {ModelStore.onlineStatus === 'online' && (
        <div className="syncwarning">
          {ModelStore.hasPendingChanges && (
            <div>
              {' '}
              Sync status <SyncOutlined fontSize="inherit" /> Unsaved changes
              pending...
            </div>
          )}
          {!ModelStore.hasPendingChanges &&
            !ModelStore.currentProjectLoading && (
              <div>
                {' '}
                Sync status <SyncOutlined fontSize="inherit" /> Up to date.
              </div>
            )}
          {onlineStatusFiveSecondsAgo === 'offline' && (
            <div> You are back online! ✅ </div>
          )}
          {!ModelStore.hasPendingChanges &&
            ModelStore.currentProjectLoading && (
              <div> Fetching the latest... </div>
            )}
        </div>
      )}
    </div>
  )
})

export default PendingStatus
