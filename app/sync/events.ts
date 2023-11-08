import EventEmitter from "events";
import TypedEmitter from "typed-emitter";

type SyncAPIEventTypes = {
    'did-go-online': (at: number) => void,
    'did-go-offline': (at: number) => void,
    'has-pending-changes': (status: boolean) => void,
}

export const SyncAPIEvents = new EventEmitter() as TypedEmitter<SyncAPIEventTypes>