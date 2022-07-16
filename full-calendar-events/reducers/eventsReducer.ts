import { calendarEventType, reducerActionType } from "../model";

export default function eventsReducer(currentState: calendarEventType[], action: reducerActionType)
    : calendarEventType[] {
    let newState = [...currentState];
    switch (action.name) {
        case 'SET_DATE': {
            let payloadType: { id: number, date: Date };
            let payload = action.payload as typeof payloadType;
            let ft = newState.filter(el => el.id == payload.id)[0];
            if (ft) {
                ft.date = payload.date;
                ft.randomIdForUIKey = (Math.random() * 10000000).toFixed(0);
            }
            break;
        }
        case 'REMOVE_AND_ADD': {
            let eventId = action.payload as number;
            let ft = newState.filter(el => el.id == eventId)[0];
            if (ft) {
                let newEl = { ...ft };
                newEl.randomIdForUIKey = (Math.random() * 100000000).toFixed(0);
                let ind = newState.findIndex(el => el.id == eventId);
                newState.splice(ind, 1, newEl);
            }
            break;
        }
    }
    return newState;
}