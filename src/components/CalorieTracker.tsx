import { useMemo } from "react";
import { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
    activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
    //contadores
    const caloriesConsumed = useMemo(
        () =>
            activities.reduce(
                (total, activity) =>
                    activity.category === 1 ? total + activity.calories : total,
                0
            ),
        [activities]
    );
    const caloriesBurned = useMemo(
        () =>
            activities.reduce(
                (total, activity) =>
                    activity.category === 2 ? total + activity.calories : total,
                0
            ),
        [activities]
    );

    const totalCalories = useMemo( () => caloriesConsumed - caloriesBurned ,[caloriesConsumed, caloriesBurned]);

    const totalCaloriesColor = useMemo( () => totalCalories > 0 ? "red-400" : "green-400", [totalCalories]);

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center ">
                Resumen de Calorías
            </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5 mx-32">
                <CalorieDisplay calories={caloriesConsumed} text="Consumidas" color="orange-400" />
                <CalorieDisplay calories={caloriesBurned} text="Quemadas" color="green-400"/>
                <CalorieDisplay calories={totalCalories} text="Diferencia" color={totalCaloriesColor}/>
            </div>
        </>
    );
}
