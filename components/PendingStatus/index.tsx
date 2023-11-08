import ModelStore from "@/app/stores/modelStore";
import { isOnline } from "@/app/sync/utils";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { SyncOutlined } from "@mui/icons-material";

const PendingStatus = observer(() => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsOffline(!isOnline())
        }, 200);

        const cleanup = () => {
            clearInterval(interval);
        }

        return cleanup;
    }, [])


    return <div style= {{
        width: '100%',
        textAlign: 'center',
        fontSize: '0.75em',
        paddingTop: '1px',
        display: 'flex',
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center"
    }}>
        { isOffline &&
            <div> 
                <div>Sync status <SyncOutlined fontSize="inherit"/> Offline.</div>
                <div>Changes will be synced once you're back online. </div>
            </div>
        }
        { !isOffline && ModelStore.hasPendingChanges &&
            <div> Sync status <SyncOutlined fontSize="inherit"/> Saving...</div>

        }
        { !isOffline && !ModelStore.hasPendingChanges &&
            <div> Sync status <SyncOutlined fontSize="inherit"/> Up to date.</div>
        }
    </div>
})

export default PendingStatus;