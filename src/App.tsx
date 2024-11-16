import { useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activityReducer";

import Form from "./components/Form";
import ActivityList from "./components/ActivityList";

function App() {

    const [state, dispatch] = useReducer(activityReducer, initialState);


    return (
        <>
            <div className="flex flex-col h-screen">
                <header className="bg-lime-600 py-3">
                    <div className="max-w-4xl mx-auto flex justify-between ">
                        <h1 className="text-center text-lg font-bold uppercase text-white">
                            Contador de Calorías
                        </h1>
                    </div>
                </header>
                <main className="grid grid-cols-[40%_1fr] flex-grow">
                    
                    <section className="bg-lime-300 flex items-center justify-center ">
                        <Form 
                            dispatch={dispatch}
                        />
                    </section>
                    
                    <div className="flex flex-col">
                        <div className="bg-slate-950 h-32 ">
                            <h1 className="text-white">Dashboard</h1>
                        </div>
                        <div className=" flex-grow  ">
                            <ActivityList 
                                activities={state.activities}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default App;
