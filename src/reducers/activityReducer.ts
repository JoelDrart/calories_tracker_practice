import { Activity } from "../types"

export type ActivityActions = {
    type: "SAVE_ACTIVITY", payload: {newActivity: Activity}
}

type ActivityState = {
    activities : Activity[]
}

export const initialState : ActivityState = {
    activities: []
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    switch (action.type) {
        case 'SAVE_ACTIVITY':
            
            console.log("SAVE_ACTIVITY")

            return {
                ...state,
                activities: [...state.activities, action.payload.newActivity]
            }
            break;
    
        default:
            break;
    }

    return state;
}