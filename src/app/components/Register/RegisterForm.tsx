'use client';
import { useState } from "react";
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useForm, Resolver } from "react-hook-form";
import Checkbox from "@/app/UI/Inputs/Checkbox";
import { registerApi } from "@/app/utils/auth";
import Notification from "@/app/UI/Notifications/Notifications";
import { AxiosError } from "axios";




type FormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;

};

const resolver: Resolver<FormValues> = async (values) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[*!#&])[A-Za-z0-9*!#&]{6,}$/;
  const phoneRegex = /^\+380\d{9}$/;


  if (!values.name) {
    return {
      values: {},
      errors: {
        name: {
          type: "required",
          message: "Ім'я є обов'язковим полем.",
        },
      },
    };
  }

  if (!values.email) {
    return {
      values: {},
      errors: {
        email: {
          type: "required",
          message: "Це поле є обов'язковим."
        }
      }
    };
  }


  if (!values.password) {
    return {
      values: {},
      errors: {
        password: {
          type: "required",
          message: "Пароль є обов'язковим.",
        },
      },
    };
  }

  if (!values.repeatPassword) {
    return {
      values: {},
      errors: {
        repeatPassword: {
          type: "required",
          message: "Це поле є обов'язковим.",
        },
      },
    };
  }

  if (!values.phone) {
    return {
      values: {},
      errors: {
        phone: {
          type: "required",
          message: "Телефон є обов'язковим полем.",
        },
      },
    };
  }


  if (!emailRegex.test(values.email)) {
    return {
      values: {},
      errors: {
        email: {
          type: "pattern",
          message: "Потрібно ввести E-mail у наступному форматі: email@org.ua."
        }
      }
    };
  }

  if (!passwordRegex.test(values.password)) {
    return {
      values: {},
      errors: {
        password: {
          type: "pattern",
          message: "Пароль має містити щонайменше 6 символів, включаючи літери та спеціальні знаки (, #, & тощо)",
        },
      },
    };
  }

  if (values.repeatPassword !== values.password) {
    return {
      values: {},
      errors: {
        repeatPassword: {
          type: "match",
          message: "Паролі не співпадають.",
        },
      },
    };
  }


  if (!phoneRegex.test(values.phone)) {
    return {
      values: {},
      errors: {
        phone: {
          type: "pattern",
          message: "Потрібно ввести телефон у наступному форматі: +380670000000",
        },
      },
    };
  }

  return {
    values: values,
    errors: {}
  };
};

export default function RegisterForm() {
  const messagePassword = 'Пароль має містити щонайменше 6 символів, включаючи літери та спеціальні знаки (, #, & тощо)';
  const messageEmail = 'Потрібно ввести E-mail у наступному форматі: email@org.ua.';
  const messageName = 'Ім`я є обов`язковим полем.';
  const messageRepeatPassword = 'Паролі мають співпадати';
  const messagePhone = 'Потрібно ввести телефон у наступному форматі: +380670000000'
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [role, setRole] = useState('customer');
  const [message, setMessage] = useState('');
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Успіх'>('Успіх');


  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible((prev) => !prev);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, } = e.currentTarget;
    switch (name) {
      case 'role':
        setRole(value);
        break;

      default:
        return;
    }

  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: resolver
  });


  const onSubmit = handleSubmit(async (data) => {
    const registerData = { ...data, role };

    try {
      await registerApi(registerData);
      setMessage('Реєстрація пройшла успшно! Пепейдіть на свою скриньку щоб підтвердити реєстрацію!');
      setType('success');
      setNotificationTitle('Успіх');
      setNotificationIsOpen(true);
      reset();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setMessage('Помилка: ' + (error.response?.data?.message || 'Не вдалося зареєструватися в систему'));
          setType('error');
          setNotificationTitle('Помилка');
          setNotificationIsOpen(true);
        } else {
          setMessage("No response from server");
        }
      } else {
        console.log("Unknown error", error);
      }
      console.error('Login failed:', error);
    }

  });

  return (
    <div>
      <form onSubmit={onSubmit}>

        <div>
          <label className="inline-block text-bas text-black font-normal mb-2">Ім&apos;я*</label>
          <input
            className={errors?.name ? `
              desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
              h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-2 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
              : `
              desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
              h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
            {...register("name")} placeholder="Іван" />
          {errors?.name ?
            (<div className='flex items-center mb-2'><ExclamationCircleIcon className='size-4 text-red-0 mr-3' />
              <p className="text-red-500 text-xs font-normal">{errors.name.message}</p></div>) :
            (<div className='flex items-center mb-2'><ExclamationCircleIcon className='size-4 text-gray-20 mr-3' />
              <p className="text-gray-20 text-xs font-normal">{messageName}</p></div>)
          }
        </div>

        <div>
          <label className="inline-block text-bas text-black font-normal mb-2">E-mail*</label>
          <input
            className={errors?.email ? `
              desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
              h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-2 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
              : `
              desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
              h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-2 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
            {...register("email")} placeholder="email@org.ua" />
          {errors?.email ?
            (<div className='flex items-center mb-2'><ExclamationCircleIcon className='size-4 text-red-0 mr-3' />
              <p className="text-red-500 text-xs font-normal">{errors.email.message}</p></div>) :
            (<div className='flex items-center mb-2'><ExclamationCircleIcon className='size-4 text-gray-20 mr-3' />
              <p className="text-gray-20 text-xs font-normal">{messageEmail}</p></div>)
          }
        </div>

        <div className='relative mb-2'>
          <label className="inline-block text-bas text-black font-normal mb-2">Пароль*</label>
          <input type={passwordVisible ? "text" : "password"} className={errors?.password ? `
          desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
          h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-2 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
            : `
            desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
            h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-2 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
            {...register("password")} placeholder="Very#5" />
          {errors?.password ? (<div className='flex items-center'><ExclamationCircleIcon className='size-4 text-red-0 mr-3' />
            <p className="w-5/6 text-red-500 text-xs font-normal">{errors.password.message}</p></div>) :
            (<div className='flex items-center'><ExclamationCircleIcon className='size-4 text-gray-20 mr-3' />
              <p className="w-5/6 text-gray-20 text-xs font-normal">{messagePassword}</p></div>)
          }
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-11 right-5"
          >
            {passwordVisible ? (
              <EyeSlashIcon className={errors?.password ? `size-6 text-red-0` : `size-6 text-blue-20`} />
            ) : (
              <EyeIcon className={errors?.password ? `size-6 text-red-0` : `size-6 text-blue-20`} />
            )}
          </button>
        </div>

        <div className='relative mb-2'>
          <label className="inline-block text-bas text-black font-normal mb-2">Повторіть пароль*</label>
          <input type={repeatPasswordVisible ? "text" : "password"} className={errors?.repeatPassword ? `
          desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
          h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-2 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
            : `
            desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
            h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-2 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
            {...register("repeatPassword")} placeholder="Very#5" />
          {errors?.repeatPassword ? (<div className='flex items-center'><ExclamationCircleIcon className='size-4 text-red-0 mr-3' />
            <p className="text-red-500 text-xs font-normal">{errors.repeatPassword.message}</p></div>) :
            (<div className='flex items-center'><ExclamationCircleIcon className='size-4 text-gray-20 mr-3' />
              <p className="text-gray-20 text-xs font-normal">{messageRepeatPassword}</p></div>)
          }
          <button
            type="button"
            onClick={toggleRepeatPasswordVisibility}
            className="absolute top-11 right-5"
          >
            {repeatPasswordVisible ? (
              <EyeSlashIcon className={errors?.repeatPassword ? `size-6 text-red-0` : `size-6 text-blue-20`} />
            ) : (
              <EyeIcon className={errors?.repeatPassword ? `size-6 text-red-0` : `size-6 text-blue-20`} />
            )}
          </button>
        </div>


        <div>
          <label className="inline-block text-bas text-black font-normal mb-2">Введіть номер телефону*</label>
          <input
            type="phone"
            className={errors?.phone ? `
              desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
              h-[49px] px-4 py-3 rounded-3xl border border-red-0 justify-start items-center inline-flex mb-2 text-red-0 text-sm font-normal focus:border-red-0 focus:outline-none`
              : `
              desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
              h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-2 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none`}
            {...register("phone")} placeholder="+380670000000" />
          {errors?.phone ?
            (<div className='flex items-center'><ExclamationCircleIcon className='size-4 text-red-0 mr-3' />
              <p className="text-red-500 text-xs font-normal">{errors.phone.message}</p></div>) :
            (<div className='flex items-center'><ExclamationCircleIcon className='size-4 text-gray-20 mr-3' />
              <p className="text-gray-20 text-xs font-normal">{messagePhone}</p></div>)
          }
        </div>

        <div className="flex gap-3 mt-5">
          <h5 className="ml-6 text-base font-normal text-black">Роль:</h5>
          <div className="flex desktop:gap-10 tabletBig:gap-10 tablet:gap-10 mobile:gap-5">
            <Checkbox title="Замовник" type="radio" name="role" value="customer" data={role} changeCheckbox={handleChange} />
            <Checkbox title="Виконавець" type="radio" name="role" value="executor" data={role} changeCheckbox={handleChange} />
          </div>
        </div>
        <input type="submit" value="Зареєструватись" className={`
        desktop:w-[453px] tabletBig:w-[453px] tablet:w-[453px] mobile:w-[345px]
        bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl
       text-white rounded-3xl hover:bg-blue-20 mt-6 focus:bg-blue-20 disabled:text-gray-10`} />

      </form>

      {notificationIsOpen && (
        <Notification
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />
      )}
    </div>
  )
}
//