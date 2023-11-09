import { Project } from "@/types/types";
import EventEmitter from "events";
import TypedEmitter from "typed-emitter";

type SyncAPIEventTypes = {
    'did-sync': (publishedChanges: boolean) => void,
    'did-go-online': (at: number) => void,
    'did-go-offline': (at: number) => void,
    // 'did-update-project': (projectID: string, value: Project | null) => void,
    'has-pending-changes': (status: boolean) => void,
}

export const SyncAPIEvents = new EventEmitter() as TypedEmitter<SyncAPIEventTypes>