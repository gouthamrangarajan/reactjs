import { screenToDraggedItemRelationType, reducerActionType } from "../model";

export default function screenToDraggedItemRelationReducer(currentState: screenToDraggedItemRelationType,
    action: reducerActionType): screenToDraggedItemRelationType {
    let { name, payload } = action;
    payload = payload as screenToDraggedItemRelationType;
    let newState = [...currentState];

    switch (name) {
        case 'IN_PLACE': {
            let ft = newState.filter(el => el.date == payload.date && el.from == payload.from && el.to == payload.to)[0];
            if (ft)
                ft.draggedItemInPlace = true;
            else
                newState.push({ date: payload.date, draggedItemInPlace: true, from: payload.from, to: payload.to });
            break;
        }
        case 'OUT_PLACE': {
            let ft = newState.filter(el => el.date == payload.date && el.from == payload.from && el.to == payload.to)[0];
            if (ft)
                ft.draggedItemInPlace = false;
            else
                newState.push({ date: payload.date, draggedItemInPlace: true, from: payload.from, to: payload.to });
            break;
        }
        case 'RESET': {
            newState = [];
            break;
        }
    }
    return newState;
}