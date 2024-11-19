import { useState, useEffect } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

import { v4 as uuidv4 } from "uuid";

type FormProps = {
    dispatch: React.Dispatch<ActivityActions>;
    state: ActivityState;
};

export default function Form({ dispatch, state }: FormProps) {
    const initialState: Activity = {
        id: uuidv4(),
        category: 1,
        activity: "",
        calories: 0,
    };

    const [form, setForm] = useState<Activity>(initialState);

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(
                (stateActivity) => stateActivity.id === state.activeId
            )[0];
            setForm(selectedActivity);
        } else {
            setForm({ ...initialState, id: uuidv4() });
        }
    }, [state.activeId, state.activities]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        const isNumber = ["category", "calories"].includes(e.target.id);

        setForm({
            ...form,
            [e.target.id]: isNumber ? +e.target.value : e.target.value,
        });
    };

    const isValidForm = () => {
        const { activity, calories } = form;
        return activity.trim() !== "" && calories > 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: "SAVE_ACTIVITY", payload: { newActivity: form } });
        setForm({ ...initialState, id: uuidv4() });
    };

    const handleCancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch({ type: "CLEAR_ACTIVEID" });
    };

    return (
        <>
            <form
                className="space-y-5 bg-white p-5 rounded-lg shadow-lg w-full mx-11"
                onSubmit={handleSubmit}
            >
                {/* <p>Formulario</p> */}
                {state.activeId ? (
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Editar Actividad</h2>
                        <button
                            className="text-sm text-white bg-red-400 p-2 rounded-lg hover:bg-red-500 hover:shadow-lg cursor-pointer" 
                            onClick={handleCancelEdit}
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <h2 className="text-center text-2xl font-bold">
                        Agregar Actividad
                    </h2>
                )}

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">
                        Categoría:{" "}
                    </label>
                    <select
                        name=""
                        id="category"
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        value={form.category}
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="activity" className="font-bold">
                        Actividad:{" "}
                    </label>
                    <input
                        type="text"
                        id="activity"
                        className="border border-slate-300 p-2 rounded-lg w-full"
                        placeholder="Ej. Correr 5km, Caminar 1km, etc."
                        value={form.activity}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">
                        Calorías:{" "}
                    </label>
                    <input
                        type="number"
                        id="calories"
                        className="border border-slate-300 p-2 rounded-lg w-full"
                        placeholder="Ej. 500"
                        value={form.calories}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-50"
                    value={
                        form.category === 1
                            ? "Guardar Comida"
                            : "Guardar Ejercicio"
                    }
                    disabled={!isValidForm()}
                />
            </form>
        </>
    );
}
