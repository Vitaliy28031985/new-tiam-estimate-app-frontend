
import { Metadata } from "next";
import Authorization from '@/app/components/Authorization/Authorization';

export const metadata: Metadata = {
    title: "Авторизація",
    description: "Сторінка входу та реєстрації",
};

export default function Register() {
    return (<Authorization />)
}

