'use client';
import React, { useState, useEffect } from 'react';
import { usePDF } from 'react-to-pdf';
import { Price } from '@/app/interfaces/PriceInterface';

interface ViberPdfShareProps {
  data: Price[] | null;
}

const ViberPdfShare: React.FC<ViberPdfShareProps> = ({ data }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'price-list.pdf' });
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Використовуємо useEffect, щоб дізнатися, чи код виконується на клієнті
  useEffect(() => {
    setIsClient(true); // Встановлюємо прапор для клієнтського середовища
  }, []);

  // Генерація HTML-контенту, якщо дані доступні
  const generatePrintContent = () => {
    if (!data || data.length === 0) {
      return <p>Дані не доступні</p>; // Повертаємо повідомлення, якщо дані відсутні
    }

    return (
      <div className="print-content ml-20">
        <h3 className="font-bold font-alternates text-5xl mb-10 text-center">Прайс робіт</h3>
        <div className='flex items-center gap-4 mb-2'>
          <div className='w-96'>
            <p className='font-normal text-base text-black text-center'>Найменування роботи</p>
          </div>
          <div className='w-52'>
            <p className='font-normal text-base text-black text-start'>Ціна за одиницю (грн)</p>
          </div>
        </div>
        {data.map(({ id, title, price }) => (
          <div className='flex items-center gap-4 mb-3' key={id}>
            <div className='w-96 relative'>
              <div className='border border-blue-20 pl-12 pr-4 py-3 rounded-full'>
                <p className='font-normal text-base text-gray-35 text-start'>{title}</p>
              </div>
            </div>
            <div className='w-52'>
              <div className='border border-blue-20 px-5 py-3 rounded-full'>
                <p className='font-normal text-base text-gray-35 text-center'>{price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Обробка події для спільного використання прайс-листа
  const handleShare = async () => {
    setError(null);
    try {
      console.log('Generating PDF...');
      
      // Викликаємо toPDF() для створення PDF, не зберігаючи результат у змінну
      await toPDF();

      console.log('PDF generated successfully');

      // Якщо підтримується Web Share API
      if (navigator.share) {
        console.log('Web Share API is supported, attempting to share...');
        try {
          // Отримуємо доступ до PDF після його створення через targetRef
          const pdfBlob = new Blob([targetRef.current], { type: 'application/pdf' });

          // Поділитися через Web Share API
          await navigator.share({
            files: [new File([pdfBlob], 'price-list.pdf', { type: 'application/pdf' })],
            title: 'Прайс робіт',
            text: 'Перегляньте наш прайс-лист',
          });
          console.log('Shared successfully');
        } catch (shareError) {
          console.error('Error in Web Share API:', shareError);
          throw new Error('Не вдалося поділитися файлом. Спробуйте інший метод.');
        }
      } else {
        console.log('Web Share API is not supported, opening PDF in new tab...');
        // Відкриваємо PDF в новій вкладці
        const pdfUrl = URL.createObjectURL(targetRef.current);
        window.open(pdfUrl, '_blank');
      }
    } catch (error) {
      console.error('Error in handleShare:', error);
      setError(error instanceof Error ? error.message : 'Сталася невідома помилка');
    }
  };

  // Перевірка, чи відбувається рендеринг на клієнті
  if (!isClient) {
    return null; // Повертаємо нічого, поки не завантажиться клієнт
  }

  return (
    <div>
      <div className='absolute -z-50 top-44' ref={targetRef}>
        {/* Вставка HTML-контенту */}
        {generatePrintContent()}
      </div>
      <button 
        className="mr-16 bg-blue-30 py-3 px-8 font-bold text-base text-white rounded-full hover:bg-blue-20 focus:bg-blue-20 disabled:text-gray-10"
        onClick={handleShare}
      >
        Відправити
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ViberPdfShare;
