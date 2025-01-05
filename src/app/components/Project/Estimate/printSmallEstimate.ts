import { EstimatePosition, ProjectItem } from "@/app/interfaces/projects";
import { roundingNumber } from "@/app/utils/formatFunctions";

export const handlePrintEstimateSmall = (data: ProjectItem | null) => {
  const printContent = `
    <div class="print-content">
       <h3 class="title">Кошторис</h3>

    ${data && data.lowEstimates?.map((estimate) => `
    <p class="font-semibold text-xl text-center mb-3 mt-3">${ estimate?.title}</p>
    <table className="w-full bg-white rounded-lg shadow-pricesTablet mb-6">
      <thead>
      <tr>
          <th class="border border-gray-20 p-3"><p class="font-bold text-sm">№ з/п.</p></th>
          <th class="border border-gray-20 p-3"><p class="font-bold text-sm">Назва</p></th>
          <th class="border border-gray-20 p-3"><p class="font-bold text-sm">Одиниця</p></th>
          <th class="border border-gray-20 p-3"><p class="font-bold text-sm">Кількість</p></th>
          <th class="border border-gray-20 p-3"><p class="font-bold text-sm">Ціна в грн.</p></th>
          <th class="border border-gray-20 p-3"><p class="font-bold text-sm">Сума в грн.</p></th>
      </tr>
      </thead> 
      <tbody>
      ${estimate && estimate.positions?.map((position: EstimatePosition, index: number) => `
       <tr>
          <td class="border border-gray-20 p-3"><p class="text-xs font-normal text-center">${index + 1}</p></td>
          <td class="border border-gray-20 p-3"><p class="text-xs font-normal">${position.title}</p></td>
          <td class="border border-gray-20 p-3"><p class="text-xs font-normal text-center">${position.unit}</p></td>
          <td class="border border-gray-20 p-3"><p class="text-xs font-normal text-center">${position.number}</p></td>
          <td class="w-28 border border-gray-20 p-3"><p class="text-xs font-normal text-center">${position.price}</p></td>
          <td class="w-28 border border-gray-20 p-3"><p class="text-xs font-normal text-center">${roundingNumber(position.result)}</p></td>
       </tr>
      `).join('')}
       <tr class="bg-gray-30">
            <td colSpan={5} class="p-3 border border-gray-20"><p class="font-bold text-sm text-white">Всього:</p></td>
            <td class="p-3 border border-gray-20 text-center"></td>
            <td class="p-3 border border-gray-20 text-center"></td>
            <td class="p-3 border border-gray-20 text-center"></td>
            <td class="p-3 border border-gray-20 text-center"></td>
            <td class="p-3 border border-gray-20 text-center"><p class="font-bold text-sm text-white">${estimate.total && roundingNumber(estimate.total)}</p></td>
        </tr>
      </tbody>
    </table>
    `).join('')}
      
       <div class="w-5/6 flex items-center justify-between mb-8 mt-8">
           <p class="text-lg font-normal">Загальна сума:</p>
           <p class="text-lg font-normal">${data?.lowTotal && roundingNumber(data?.lowTotal)}</p>
       </div>

      <div class="w-5/6 flex items-center justify-between mb-4">
            <p class="text-lg font-normal">Аванс:</p>
            <p class="text-lg font-normal">${data?.advancesTotal}</p>
      </div>

      <div class="w-5/6 flex items-center justify-between mb-4">
            <p class="text-lg font-normal">Витрачено на матеріали:</p>
            <p class="text-lg font-normal">${data?.materialsTotal}</p>
      </div>

       <div class="w-5/6 flex items-center justify-between p-6 bg-gray-5 rounded-full">
            <p class="text-xl font-semibold">До сплати:</p>
            <p class="text-xl font-semibold">${data?.lowGeneral && roundingNumber(data?.lowGeneral)}</p>
       </div>

      </div>
  `;

  const printWindow = window.open('', '', 'width=800,height=600');
  if (printWindow) {
    const styles = `
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" rel="stylesheet">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .print-content {
          margin-left: auto;
          margin-right: auto;
        }

        button {
          display: none;
        }

        .title {
          font-weight: 700; 
          font-size: 3rem;
          line-height: 1;
          text-align: center;
          margin-bottom: 20px;
          margin-top: 10px;
        }
      </style>
    `;
      
    printWindow.document.write('<html><head><title>Print</title>' + styles + '</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};