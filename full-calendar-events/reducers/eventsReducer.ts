import { calendarEventType, reducerActionType } from "../model";

export default function eventsReducer(currentState: calendarEventType[], action: reducerActionType)
    : calendarEventType[] {
    let newState = [...currentState];
    switch (action.name) {
        case 'QUICK_ADD': {
            let payload: string = action.payload as string;
            if (payload.trim() != '')
                newState.push({
                    id: parseInt((Math.random() * 100000000).toFixed(0))
                    , randomIdForUIKey: (Math.random() * 100000000).toFixed(0)
                    , title: payload
                });
            break;
        }
        case 'SET_DATE': {
            let payloadType: { id: number, date: Date };
            let payload = action.payload as typeof payloadType;
            let ft = newState.filter(el => el.id == payload.id)[0];
            if (ft) {
                ft.date = payload.date;
                ft.from = "9 AM";
                ft.to = "10 AM";
                ft.randomIdForUIKey = (Math.random() * 10000000).toFixed(0);
            }
            break;
        }
        case 'SET_DATETIME': {
            let payloadType: { id: number, date: Date, from: string, to: string };
            let payload = action.payload as typeof payloadType;
            let ft = newState.filter(el => el.id == payload.id)[0];
            if (ft) {
                ft.date = payload.date;
                ft.from = payload.from;
                ft.to = payload.to;
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
        case "SET_TO": {
            let payload: { to: string, eventId: number } = action.payload;
            let { to, eventId } = payload;
            let ft = newState.filter(el => el.id == eventId)[0];
            if (ft) {
                ft.to = to;
            }
            break;
        }
    }
    return newState;
}