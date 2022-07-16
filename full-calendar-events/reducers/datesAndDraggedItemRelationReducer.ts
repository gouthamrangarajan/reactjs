import { datesAndDraggedItemRelationType, reducerActionType } from "../model";

export default function datesAndDraggedItemRelationReducer(currentState: datesAndDraggedItemRelationType,
    action: reducerActionType): datesAndDraggedItemRelationType {
    let { name, payload } = action;
    payload = payload as Date;
    let newState = [...currentState];

    switch (name) {
        case 'IN_PLACE': {
            let ft = newState.filter(el => el.date == payload)[0];
            if (ft)
                ft.draggedItemInPlace = true;
            else
                newState.push({ date: payload, draggedItemInPlace: true });
            break;
        }
        case 'OUT_PLACE': {
            let ft = newState.filter(el => el.date == payload)[0];
            if (ft)
                ft.draggedItemInPlace = false;
            else
                newState.push({ date: payload, draggedItemInPlace: false });
            break;
        }
        case 'RESET': {
            newState = [];
            break;
        }
    }
    return newState;
}