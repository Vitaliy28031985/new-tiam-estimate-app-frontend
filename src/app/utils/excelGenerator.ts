import * as XLSX from 'xlsx';
import { ProjectItem, Estimate, EstimatePosition } from '@/app/interfaces/projects';

function roundingNumber(value: number): number {
  return Math.round(value * 100) / 100; 
}


export async function generateAndDownloadExcel(project: ProjectItem, estimates: Estimate[]) {
  const workbook = XLSX.utils.book_new();

  const headerStyle = {
    font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "4F81BD" } },
    alignment: { horizontal: 'center', vertical: 'center' },
    border: {
      top: { style: 'thin', color: { rgb: '000000' } },
      right: { style: 'thin', color: { rgb: '000000' } },
      bottom: { style: 'thin', color: { rgb: '000000' } },
      left: { style: 'thin', color: { rgb: '000000' } }
    }
  };

  const cellStyle = {
    alignment: { horizontal: 'center', vertical: 'center' },
    border: {
      top: { style: 'thin', color: { rgb: '000000' } },
      right: { style: 'thin', color: { rgb: '000000' } },
      bottom: { style: 'thin', color: { rgb: '000000' } },
      left: { style: 'thin', color: { rgb: '000000' } }
    }
  };

  // Формуємо дані для аркуша
  const wsData: (string | number)[][] = [];

  // Додаємо дані для кожної оцінки
  estimates.forEach((estimate, index) => {
    wsData.push(['   ']);
    wsData.push(['   ']);
    wsData.push([' ', ' ', `${estimate.title}`]);
    wsData.push(['   ']);
    wsData.push(['№ з/п.', 'Назва', 'Одиниця', 'Кількість', 'Ціна в грн.', 'Сума в грн.']);

    if (!estimate.positions) {
      console.warn(`Estimate ${index + 1} has no positions`);
      return;
    }

    estimate.positions.forEach((position: EstimatePosition, posIndex: number) => {
      wsData.push([
        posIndex + 1,
        position.title || '',
        position.unit || '',
        position.number ?? 0,
        position.price ?? 0,
        roundingNumber(position.result ?? 0),
      ]);
    });

    // Додаємо підсумок для кожної оцінки
    wsData.push(['', 'Всього:', '', '', '', roundingNumber(estimate.total ?? 0)]);
  });

  // Додаємо підсумкові дані проекту
  wsData.push([]); // Пустий рядок для відступу
  wsData.push(['Загальна сума:', ' ', ' ', ' ', ' ', roundingNumber(project.total ?? 0)]);
  if (project.discount !== 0) {
    wsData.push(['Знижка:', ' ', ' ', ' ', ' ', roundingNumber(project.discount ?? 0)]);
  }
  wsData.push(['Аванс:', ' ', ' ', ' ', ' ', project.advancesTotal ?? 0]);
  wsData.push(['Витрачено на матеріали:', ' ', ' ', ' ', ' ', project.materialsTotal ?? 0]);
  wsData.push(['До сплати:', ' ', ' ', ' ', ' ', roundingNumber(project.general ?? 0)]);

  // Створення аркуша з усіма даними
  const ws = XLSX.utils.aoa_to_sheet(wsData); // Створюємо аркуш з таблицею

  // Присвоєння стилю заголовку для кожної клітинки в першому рядку
  for (let col = 0; col < 6; col++) {
    const cell = ws[XLSX.utils.encode_cell({ r: 0, c: col })];
    if (cell) cell.s = headerStyle;
  }

  // Присвоєння стилю для звичайних клітинок
  for (let row = 1; row < wsData.length; row++) {
    for (let col = 0; col < 6; col++) {
      const cell = ws[XLSX.utils.encode_cell({ r: row, c: col })];
      if (cell) cell.s = cellStyle;
    }
  }

  // Додаємо аркуш до книги
  XLSX.utils.book_append_sheet(workbook, ws, 'Estimates');

  // Генерація Excel файлу
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Триггер для завантаження файлу
  const fileName = `${project.title}.xlsx`;
  if (typeof window !== 'undefined') {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  console.log(`Excel file "${fileName}" has been generated and download triggered.`);
}
