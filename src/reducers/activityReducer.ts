import { Activity } from "../types"

export type ActivityActions = 
    | { type: "SAVE_ACTIVITY"; payload: { newActivity: Activity } }
    | { type: "SET-ACTIVEID"; payload: { id: Activity["id"] } }
    | { type: "DELETE_ACTIVITY"; payload: { id: Activity["id"] } }
    | { type: "CLEAR_ACTIVEID" }
    | { type: "RESTART_APP" }


export type ActivityState = {
    activities : Activity[],
    activeId: Activity["id"]
}


const localStorageActivities = () :Activity[] =>{
    const activities = localStorage.getItem("activities");
    if(activities){
        return JSON.parse(activities);
    }
    return [];
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    switch (action.type) {
        case 'SAVE_ACTIVITY':
            
            { let updatedActivities: Activity[] = [];

            if(state.activeId){
                updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity ) 
            }else{
                updatedActivities = [...state.activities, action.payload.newActivity]
            }

            return {
                ...state,
                activities: updatedActivities,
                activeId: ''
            }
            break; }
        
        case 'SET-ACTIVEID':
            return {
                ...state,
                activeId: action.payload.id
                
            }
            break;
        case "CLEAR_ACTIVEID":
                return {
                    ...state,
                    activeId: "",
                };
                break;
        case "DELETE_ACTIVITY":
            return {
                ...state,
                activities: state.activities.filter(
                    (activity) => activity.id !== action.payload.id
                ),
            };
            break;
        case "RESTART_APP":
            return {
                activities: [],
                activeId: "",
            };
            break;

        default:
            break;
    }

    return state;
}