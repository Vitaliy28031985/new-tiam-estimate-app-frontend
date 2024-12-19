import { InputProps } from "../interfaces/inputInterface";

export default function AuthorizationCheckbox({ changeCheckbox }: InputProps) {

    return (
        <div className="mb-6 text-center">
            <label
            className=" text-3xl text-black font-normal ml-6 peer-checked:text-4xl peer-checked:font-bold peer-checked:text-blue-30"
            >
                <input
                    className="peer sr-only"
                    onChange={changeCheckbox}
                    type="radio" name="authorization"
                    value="login" />
                Вхід
            </label>
            <label
            className=" text-3xl text-black font-normal ml-6 peer-checked:text-4xl peer-checked:font-bold peer-checked:text-blue-30"
            >
                <input
                    className="peer sr-only"
                    onChange={changeCheckbox}
                    type="radio" name="authorization"
                    value="register" />
                Реєстрація
            </label>
        </div>
    )

}