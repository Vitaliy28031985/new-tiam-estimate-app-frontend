import { InputProps } from "../interfaces/inputInterface";

export default function ChangeProject({ changeCheckbox }: InputProps) {

    return (
        <div className="mb-6 text-center">
            <label
            className="font-medium text-sm px-3 py-1 text-blue-25"
            >
                <input
                    className="peer sr-only"
                    onChange={changeCheckbox}
                    type="radio" name="project"
                    value="large" />
                Основний
            </label>
            <label
            className="font-medium text-sm px-3 py-1 text-blue-25"
            >
                <input
                    className="peer sr-only"
                    onChange={changeCheckbox}
                    type="radio" name="project"
                    value="small" />
                Знижений
            </label>
        </div>
    )

}