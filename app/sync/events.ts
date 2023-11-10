import { Project } from "@/types/types";
import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import { _Object, _Request } from "./db";

type SyncAPIEventTypes = {

    'did-go-online': (at: number) => void,
    'did-go-offline': (at: number) => void,
    // lower level modify
    'did-modify-object': (objectID: string, value: _Object | null) => void,

    // For sync api to listen to db pushes & update indexdb store accordingly
    'did-push-requests': (requests: _Request[]) => void,

    // // For mobx to listen to indexdb changes & update mobx store 
    'on-modify-project': (projectID: string, project: Project | null ) => void,

    'has-pending-changes': (status: boolean) => void,
}

export const SyncAPIEvents = new EventEmitter() as TypedEmitter<SyncAPIEventTypes>