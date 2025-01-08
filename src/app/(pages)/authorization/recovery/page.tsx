'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import fon from '@/app/assets/bg-img.png';
import logo from '@/app/assets/logo_mob.svg';
import axios from "axios";
import { useRouter } from "next/navigation";
import BASE_URL from '@/app/utils/base';
import { IoMdArrowRoundBack } from "react-icons/io";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Notification from "@/app/UI/Notifications/Notifications";

export default function RecoveryPassword() {
  const [step, setStep] = useState<'email' | 'code' | 'new-password' | 'succes'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Успіх'>('Успіх');
  const router = useRouter();


  const handleEmailSubmit = async () => {
    try {
      const data = { email };
      const response = await axios.post(`${BASE_URL}api/auth/send/verify`, data);

      if (response) {
        setMessage(response.data.message);
        setType('success');
        setNotificationTitle('Успіх');
        setNotificationIsOpen(true);
        setStep('code');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage((error.response?.data?.message || 'Не вдалося відправити код.'));
        setType('error');
        setNotificationTitle('Помилка');
        setNotificationIsOpen(true);
      } else {
        setType('error');
        setNotificationTitle('Помилка');
        setNotificationIsOpen(true);
        setMessage('Помилка: Щось пішло не так.');
      }
    }
  };

  const handleCodeSubmit = () => {
    setStep('new-password');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePasswordSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage('Пароли не співпадають.');
      setType('error');
      setNotificationTitle('Помилка');
      setNotificationIsOpen(true);
      return;
    }
    try {
      const data = {
        'email': email,
        'password': password,
        'code': Number(code)
      }
      console.log(data);
      const response = await axios.post(`${BASE_URL}api/auth/verify`, data);
      if (response) {
        setMessage('Пароль змінено.');
        setStep('succes');
        setEmail('');
        setCode('');
        setPassword('');
        setConfirmPassword('');
        setType('success');
        setNotificationTitle('Успіх');
        setNotificationIsOpen(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage('Помилка: ' + (error.response?.data?.message || 'Не вдалося змінити пароль'));
        setType('error');
        setNotificationTitle('Помилка');
        setNotificationIsOpen(true);
      } else {
        setMessage('Помилка: Щось пішло не так.');
        setType('error');
        setNotificationTitle('Помилка');
        setNotificationIsOpen(true);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-0 pt-[215px] relative overflow-y-scroll">
      <Link href="/" className='absolute top-7 left-9'>
        <Image
          src={logo}
          alt="logo"
          width={64}
          height={64}
          quality={100}
          priority
        />
      </Link>
      <div className='w-[1249px] ml-auto mr-auto container pb-[115px]'>
        <div className='w-[501px] relative z-20 bg-white shadow-base px-6 py-10 rounded-[24px]'>


          <Link
            className="flex items-center gap-2 font-medium text-blue-30 text-sm mb-6"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            <IoMdArrowRoundBack className="size-5 text-blue-30" />
            Повернутись назад
          </Link>


          <div className='flex-col items-center mb-6 gap-4'>

            {step === 'email' && (
              <>
                <h2 className="text-4xl font-bold text-center mx-auto mb-6">Відновлення паролю</h2>
                <p className="text-left text-gray-20 mb-6 p-2">Введіть свою електрону пошту, на яку зареєстровано акаунт</p>
                <p className="text-regular text-black mb-3">E-mail</p>
                <input
                  type="email"
                  placeholder="Введіть email"
                  className="w-[453px] h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleEmailSubmit}
                  className="w-[453px] bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl text-white rounded-3xl hover:bg-blue-20 mt-6 focus:bg-blue-20">
                  Отправить код
                </button>
              </>
            )}

            {step === 'code' && (
              <>
                <h2 className="text-4xl font-bold text-center mx-auto mb-6">Код підтвердження</h2>
                <p className="text-left text-gray-20 mb-6 p-2">Введіть код підтвердження, який ми надіслали Вам на електронну пошту {email}</p>
                <p className="text-regular text-black mb-3">Код підтвердження</p>
                <input
                  type="text"
                  placeholder="Код*"
                  className="w-[453px] h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  onClick={handleCodeSubmit}
                  className="w-[453px] bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl text-white rounded-3xl hover:bg-blue-20 mt-6 mb-6 focus:bg-blue-20"
                >
                  Далі
                </button>
                <p className="text-left text-gray-20 mb-6 p-2">Не надійшов код?</p>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleEmailSubmit}
                    className="mx-auto text-center font-semibold border-b border-blue-30 text-xl text-blue-30"
                  >
                    Надіслати код повторно

                  </button>

                </div>

              </>
            )}

            {step === 'new-password' && (
              <>
                <h2 className="text-4xl font-bold text-center mx-auto mb-6">Новий пароль</h2>
                <p className="text-left text-gray-20 mb-6 p-2">Створіть новий пароль</p>

                <div className='relative mb-6' >
                  <label className="text-regular text-black mb-3">Введіть новий пароль</label>
                  <input type={passwordVisible ? "text" : "password"}
                    className="w-[453px] h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 -translate-y-1/3  right-5"
                  >
                    {!passwordVisible ? (
                      <EyeSlashIcon className={`size-6 text-blue-20`} />
                    ) : (
                      <EyeIcon className={`size-6 text-blue-20`} />
                    )}
                  </button>
                </div>
                <div className='relative mb-6' >
                  <label className="text-regular text-black mb-3">Повторіть пароль</label>
                  <input type={passwordVisible ? "text" : "password"}
                    className="w-[453px] h-[49px] px-4 py-3 rounded-3xl border border-gray-15 justify-start items-center inline-flex mb-3 text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 -translate-y-1/3 right-5"
                  >
                    {!passwordVisible ? (
                      <EyeSlashIcon className={`size-6 text-blue-20`} />
                    ) : (
                      <EyeIcon className={`size-6 text-blue-20`} />
                    )}
                  </button>
                </div>

                <button
                  onClick={handlePasswordSubmit}
                  className="w-[453px] bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl text-white rounded-3xl hover:bg-blue-20 mt-6 focus:bg-blue-20"
                >
                  Далі
                </button>
              </>
            )}

            {step === 'succes' && (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">{message}</h2>
                <button
                  onClick={() => router.push('/')}
                  className="w-[453px] bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl text-white rounded-3xl hover:bg-blue-20 mt-6 focus:bg-blue-20"
                >
                  Повернутися на головну
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='absolute right-0 top-0'>
        <Image
          src={fon}
          alt="fon"
          width={609}
          height={679}
          quality={100}
          priority
        />
      </div>


      {notificationIsOpen && (

        <Notification
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />

      )}

    </div >
  )
}