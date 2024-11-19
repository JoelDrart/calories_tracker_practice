import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activityReducer";

import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    useEffect(() => {
        localStorage.setItem("activities", JSON.stringify(state.activities));
    }, [state.activities]);

    const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities]);

    const handleRestartApp = () => {
        dispatch({ type: "RESTART_APP" });
    };

    return (
        <div className="flex flex-col max-h-screen h-screen overflow-hidden">
            <header className="bg-lime-600 py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-center text-lg font-bold uppercase text-white">
                        Contador de Calorías
                    </h1>
                    <button
                        className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleRestartApp}
                        disabled={!canRestartApp}
                    >
                        Reiniciar App
                    </button>
                </div>
            </header>
            <main className="grid grid-cols-[40%_1fr] flex-grow overflow-hidden">
                <section className="bg-lime-300 flex items-center justify-center">
                    <Form state={state} dispatch={dispatch} />
                </section>
    
                <div className="flex flex-col overflow-hidden">
                    <div className="bg-slate-900 px-auto w-full py-5">
                        <CalorieTracker activities={state.activities} />
                    </div>
                    
                    <div className="flex-grow overflow-y-auto">
                        <ActivityList activities={state.activities} dispatch={dispatch} />
                    </div>
                </div>
            </main>
        </div>
    );
    
}

export default App;
