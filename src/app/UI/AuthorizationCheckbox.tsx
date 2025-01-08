import { InputProps } from "../interfaces/inputInterface";

export default function AuthorizationCheckbox({ changeCheckbox }: InputProps) {

    return (
        <div className="mb-6 text-center">
            <label
                className="text-3xl text-black font-normal ml-6"
            >
                <input
                    className="peer sr-only"
                    onChange={changeCheckbox}
                    type="radio" name="authorization"
                    value="login" />
                <span className="peer-checked:text-4xl peer-checked:font-bold peer-checked:text-blue-30">Вхід</span>
            </label>
            <label
                className="text-3xl text-black font-normal ml-6"
            >
                <input
                    className="peer sr-only"
                    onChange={changeCheckbox}
                    type="radio" name="authorization"
                    value="register" />
                <span className="peer-checked:text-4xl peer-checked:font-bold peer-checked:text-blue-30">Реєстрація</span>
            </label>
        </div>
    )

}