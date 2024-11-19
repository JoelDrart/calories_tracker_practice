type CalorieDisplayProps = {
    calories: number;
    text: string;
    color?: string;
};

export default function CalorieDisplay({ calories, text, color = "white", /* Valor por defecto si no se proporciona un color */}: CalorieDisplayProps) {
    return (
        <div className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            <span
                className={`font-black text-6xl ${color && `text-${color}`}`}
            >
                {calories}
            </span>
            <p>{text}</p>
        </div>
    );
}

