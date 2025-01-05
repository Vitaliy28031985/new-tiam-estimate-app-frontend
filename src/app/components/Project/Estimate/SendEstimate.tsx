'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EstimatePosition, ProjectItem } from '@/app/interfaces/projects';
import { roundingNumber } from '@/app/utils/formatFunctions';

interface SendEstimatePdfProps {
  data: ProjectItem | null;
}

const SendEstimatePdf: React.FC<SendEstimatePdfProps> = ({ data }) => {
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const setContentRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    contentRefs.current[index] = el;
  }, []);

  const generatePrintContent = () => {
    if (!data) {
      return <p>Дані не доступні</p>;
    }

    return (
      <>
        {data.estimates?.map((estimate, estimateIndex) => (
          <div key={estimate.id} ref={setContentRef(estimateIndex)} className="print-content px-2 mb-10">
            {estimateIndex === 0 && (
              <h3 className="font-bold font-alternates text-5xl mb-10 text-center">Кошторис</h3>
            )}
            <p className="font-semibold text-xl text-center mb-4">{estimate.title}</p>
            <table className="w-full bg-white rounded-lg shadow-pricesTablet mb-6">
              <thead>
                <tr>
                  <th className="border border-gray-20 p-3"><p className="font-bold text-sm">№ з/п.</p></th>
                  <th className="border border-gray-20 p-3"><p className="font-bold text-sm">Назва</p></th>
                  <th className="border border-gray-20 p-3"><p className="font-bold text-sm">Одиниця</p></th>
                  <th className="border border-gray-20 p-3"><p className="font-bold text-sm">Кількість</p></th>
                  <th className="border border-gray-20 p-3"><p className="font-bold text-sm">Ціна в грн.</p></th>
                  <th className="border border-gray-20 p-3"><p className="font-bold text-sm">Сума в грн.</p></th>
                </tr>
              </thead>
              <tbody>
                {estimate?.positions && estimate?.positions?.map((position: EstimatePosition, index: number) => (
                  <tr key={position.id || index} className={`${position.isShow ? 'bg-gray-25' : ''}`}>
                    <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{index + 1}</p></td>
                    <td className="border border-gray-20 p-3"><p className="text-xs font-normal">{position.title}</p></td>
                    <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{position.unit}</p></td>
                    <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{position.number}</p></td>
                    <td className="w-28 border border-gray-20 p-3"><p className="text-xs font-normal text-center">{position.price}</p></td>
                    <td className="w-28 border border-gray-20 p-3"><p className="text-xs font-normal text-center">{roundingNumber(position.result)}</p></td>
                  </tr>
                ))}
                <tr className="bg-gray-30">
                  <td colSpan={5} className="p-3 border border-gray-20"><p className="font-bold text-sm text-white">Всього:</p></td>
                  <td className="p-3 border border-gray-20 text-center"><p className="font-bold text-sm text-white">{estimate.total && roundingNumber(estimate.total)}</p></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        <div ref={summaryRef} className="print-content px-2 mb-10">
            <div className="flex items-center justify-between mb-8">
              <p className="text-lg font-normal">Загальна сума:</p>
              <p className="text-lg font-normal">{data?.total && roundingNumber(data?.total)}</p>
            </div>
          {data?.discount !== 0 && (
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-normal text-green">Знижка:</p>
              <p className="text-lg font-normal text-green">{data?.discount && roundingNumber(data?.discount)}</p>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-normal">Аванс:</p>
            <p className="text-lg font-normal">{data?.advancesTotal}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-normal">Витрачено на матеріали:</p>
            <p className="text-lg font-normal">{data?.materialsTotal}</p>
          </div>
          <div className="flex items-center justify-between p-6 bg-gray-5 rounded-full">
            <p className="text-xl font-semibold">До сплати:</p>
            <p className="text-xl font-semibold">{data?.general && roundingNumber(data?.general)}</p>
          </div>
        </div>
      </>
    );
  };

  const generatePDF = async (): Promise<Blob> => {
    if (!contentRefs.current.length) {
      throw new Error('Content not found');
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; 

    for (let i = 0; i < contentRefs.current.length; i++) {
      const element = contentRefs.current[i];
      if (element) {
        if (i > 0) {
          pdf.addPage();
        }

        const canvas = await html2canvas(element, {
          scale: 2,
          logging: false,
          useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdfWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

        // If the content is larger than one page, add additional pages
        let heightLeft = imgHeight;
        let position = -pdfHeight; // Start position for next pages

        while (heightLeft >= pdfHeight) {
          position = position - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }
    }

    // Add summary page
    if (summaryRef.current) {
      pdf.addPage();
      const canvas = await html2canvas(summaryRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdfWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
    }

    return pdf.output('blob');
  };

  const handleShare = async () => {
    setError(null);
    try {
      const pdfBlob = await generatePDF();

      if (navigator.share) {
        try {
          await navigator.share({
            files: [new File([pdfBlob], 'estimate.pdf', { type: 'application/pdf' })],
            title: 'Кошторис',
            text: 'Перегляньте наш кошторис',
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
      <div className="absolute -z-50 top-44">
        {generatePrintContent()}
      </div>
      <button
        className="mr-3 bg-blue-30 py-3 px-8 font-bold text-base text-white rounded-full hover:bg-blue-20 focus:bg-blue-20 disabled:text-gray-10"
        onClick={handleShare}
      >
        Відправити
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SendEstimatePdf;

