import { Activity } from "../types";

type ActivityListProps = {
    activities: Activity[];
};

export default function ActivityList({ activities }: ActivityListProps) {
    return (
        <div className="max-w-[90%] mx-auto">
            <h2 className="text-4xl font-bold text-slate-600 text-center mt-5">
                Comida y Actividades
            </h2>
            {activities.length === 0 ? (
                <p>No hay actividades</p>
            ) : (
                activities.map((activity) => (
                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                        <div className="space-y-2 relative ">
                            <p>{activity.category === 1 ? "Comida" : "Ejercicio"}</p>
                            <p className="text-2xl font-bold pt-5">{activity.activity}</p>
                            <p className="font-black text-4xl text-lime-500">
                                {activity.calories} {""}
                                <span>Calorías</span>
                            </p>
                        </div>
                        <div>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
