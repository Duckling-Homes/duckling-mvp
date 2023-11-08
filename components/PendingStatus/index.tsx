import ModelStore from "@/app/stores/modelStore";
import { observer } from "mobx-react-lite";
import { SyncOutlined } from "@mui/icons-material";

const PendingStatus = observer(() => {
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
        { ModelStore.onlineStatus === 'offline' &&
            <div> 
                <div>Sync status <SyncOutlined fontSize="inherit"/> Offline.</div>
                <div>Changes will be synced once you're back online. </div>
            </div>
        }
        { ModelStore.onlineStatus === 'online' && ModelStore.hasPendingChanges &&
            <div> Sync status <SyncOutlined fontSize="inherit"/> Saving...</div>

        }
        { ModelStore.onlineStatus === 'online' && !ModelStore.hasPendingChanges &&
            <div> Sync status <SyncOutlined fontSize="inherit"/> Up to date.</div>
        }
    </div>
})

export default PendingStatus;