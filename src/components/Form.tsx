import { useState } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";

export default function Form() {

    const [form, setForm] = useState<Activity>({
        category: 1,
        activity: '',
        calories: 0
    });

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumber = ['category', 'calories'].includes(e.target.id);
        
        setForm({
            ...form,
            [e.target.id]: isNumber ? +e.target.value : e.target.value
        });
    }

    return (
        <>
            <form className="space-y-5 bg-white p-5 rounded-lg shadow-lg w-full mx-11">
                {/* <p>Formulario</p> */}
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">Categoría: </label>
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
                    <label htmlFor="activity" className="font-bold">Actividad: </label>
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
                    <label htmlFor="calories" className="font-bold">Calorías: </label>
                    <input
                        type="number"
                        id="calories"
                        className="border border-slate-300 p-2 rounded-lg w-full"
                        placeholder="Ej. 500"
                        value={form.calories}
                        onChange={handleChange}
                    />
                </div>

                <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg" value='Guardar' />


            </form>
        </>
    );
}
