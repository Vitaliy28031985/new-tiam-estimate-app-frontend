import * as XLSX from 'xlsx';
import { ProjectItem, Estimate, EstimatePosition } from '@/app/interfaces/projects';
// import { roundingNumber } from '@/app/utils/formatFunctions';


// export async function generateAndDownloadExcel(project: ProjectItem, estimates: Estimate[]) {
//   const workbook = XLSX.utils.book_new(); // Створення нової книги

//   // Додаємо листи для кожної оцінки, тобто для кожної кімнати
//   estimates.forEach((estimate, index) => {
//     if (!estimate.positions) {
//       console.warn(`Estimate ${index + 1} has no positions`);
//       return;
//     }

//     // Формуємо дані для таблиці
//     const wsData = [
//       ['№ з/п.', 'Назва', 'Одиниця', 'Кількість', 'Ціна в грн.', 'Сума в грн.'],
//       ...estimate.positions.map((position: EstimatePosition, posIndex: number) => [
//         posIndex + 1,
//         position.title || '',
//         position.unit || '',
//         position.number ?? 0,
//         position.price ?? 0,
//         roundingNumber(position.result ?? 0)
//       ]),
//       ['Всього:', '', '', '', '', roundingNumber(estimate.total ?? 0)]
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(wsData); // Створення аркуша з оцінками
//     XLSX.utils.book_append_sheet(workbook, ws, `Room ${index + 1}`); // Додаємо аркуш до книги (Room 1, Room 2 і т.д.)
//   });

//   // Додаємо лист з підсумковими даними
//   const summaryData = [
//     ['Загальна сума:', roundingNumber(project.total ?? 0)],
//     ['Знижка:', roundingNumber(project.discount ?? 0)],
//     ['Аванс:', project.advancesTotal ?? 0],
//     ['Витрачено на матеріали:', project.materialsTotal ?? 0],
//     ['До сплати:', roundingNumber(project.general ?? 0)]
//   ];

//   const summaryWs = XLSX.utils.aoa_to_sheet(summaryData); // Створення аркуша з підсумками
//   XLSX.utils.book_append_sheet(workbook, summaryWs, 'Summary'); // Додаємо аркуш з підсумками до книги

//   // Генерація Excel файлу
//   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//   const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//   // Триггер для завантаження файлу
//   const fileName = `${project.title}_estimates.xlsx`;
//   if (typeof window !== 'undefined') {
//     const url = window.URL.createObjectURL(data);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', fileName);
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   }

//   console.log(`Excel file "${fileName}" has been generated and download triggered.`);
// }

function roundingNumber(value: number): number {
  return Math.round(value * 100) / 100; // округлення до двох знаків після коми
}


export async function generateAndDownloadExcel(project: ProjectItem, estimates: Estimate[]) {
  const workbook = XLSX.utils.book_new(); // Створення нової книги

  // Формуємо дані для аркуша
  let wsData: (string | number)[][] = [
    
  ];

  // Додаємо дані для кожної оцінки
    estimates.forEach((estimate, index) => {
        wsData.push(['   ']);
        wsData.push(['   ']);
        wsData.push([' ', ' ', `${estimate.title}`]);
          wsData.push(['   ']);
     wsData.push(['№ з/п.', 'Назва', 'Одиниця', 'Кількість', 'Ціна в грн.', 'Сума в грн.'],) 
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
    wsData.push(['', 'Всього:',  '', '', '', roundingNumber(estimate.total ?? 0)]);
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
  XLSX.utils.book_append_sheet(workbook, ws, 'Estimates'); // Додаємо аркуш до книги

  // Генерація Excel файлу
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Триггер для завантаження файлу
  const fileName = `${project.title}_estimates.xlsx`;
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