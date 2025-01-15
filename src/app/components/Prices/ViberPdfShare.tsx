'use client';

import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Price } from '@/app/interfaces/PriceInterface';

interface ViberPdfShareProps {
  data: Price[] | null;
}

const ViberPdfShare: React.FC<ViberPdfShareProps> = ({ data }) => {
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generatePrintContent = () => {
    if (!data || data.length === 0) {
      return <p>Дані не доступні</p>;
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

  const generatePDF = async (): Promise<Blob> => {
    if (!contentRef.current) {
      throw new Error('Content not found');
    }

    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    return pdf.output('blob');
  };

  const handleShare = async () => {
    setError(null);
    try {
      const pdfBlob = await generatePDF();

      if (navigator.share) {
        try {
          await navigator.share({
            files: [new File([pdfBlob], 'price-list.pdf', { type: 'application/pdf' })],
            title: 'Прайс робіт',
            text: 'Перегляньте наш прайс-лист',
          });
        } catch (shareError) {
          console.error('Error in Web Share API:', shareError);
          throw new Error('Не вдалося поділитися файлом. Спробуйте інший метод.');
        }
      } else {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      }
    } catch (error) {
      console.error('Error in handleShare:', error);
      setError(error instanceof Error ? error.message : 'Сталася невідома помилка');
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <div className='absolute -z-50 top-44' ref={contentRef}>
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