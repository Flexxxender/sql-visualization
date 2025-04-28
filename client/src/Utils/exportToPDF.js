import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (diagramElement) => {
    if (!diagramElement) return;

    // Создаем canvas из элемента диаграммы
    const canvas = await html2canvas(diagramElement, {
        scale: 2,
        logging: false,
        useCORS: true,
    });

    // Создаем PDF
    const pdf = new jsPDF('landscape');
    const imgData = canvas.toDataURL('image/png');

    // Рассчитываем размеры для PDF
    const imgWidth = 280; // Ширина A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Добавляем изображение в PDF
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('sql-diagram.pdf');
};
