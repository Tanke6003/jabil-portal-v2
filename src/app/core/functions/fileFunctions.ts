
import * as xlsx from 'xlsx';




export function exportToExcel(data: any[] | any[][], fileName: string, headers?: Array<{ key: string, displayLabel: string }>, sheetNames?: string[]) {
    

    const wb: xlsx.WorkBook = xlsx.utils.book_new();

    if (sheetNames && sheetNames.length > 0) {
        sheetNames.forEach((sheetName, index) => {
            const fileData = data[index].map((item:any) => {
                const newItem: { [key: string]: any } = {};
                headers?.forEach((header) => {
                newItem[header.displayLabel] = item[header.key];
                });
                return newItem;
            });
            const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(fileData, { header: headers?.map((header) => header.displayLabel) });
            xlsx.utils.book_append_sheet(wb, ws, sheetName || `Sheet${index + 1}`);
        });
    } else {
        const fileData = data.map((item:any) => {
            const newItem: { [key: string]: any } = {};
            headers?.forEach((header) => {
            newItem[header.displayLabel] = item[header.key];
            });
            return newItem;
        });
        const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(fileData, { header: headers?.map((header) => header.displayLabel) });
        xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    }

    xlsx.writeFile(wb, `${fileName}.xlsx`);
}

export function readExcelFile(file: File): Promise<{ [sheetName: string]: any[] }> {
    const reader = new FileReader();

    return new Promise<{ [sheetName: string]: any[] }>((resolve, reject) => {
        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workbook: xlsx.WorkBook = xlsx.read(data, { type: 'array' });
            const result: { [sheetName: string]: any[] } = {};

            workbook.SheetNames.forEach((sheetName) => {
                const worksheet: xlsx.WorkSheet = workbook.Sheets[sheetName];
                const jsonData: any[] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
                const headers: string[] = jsonData[0];
                const data: any[] = jsonData.slice(1).map((row) => {
                    const rowData: { [header: string]: any } = {};
                    headers.forEach((header, index) => {
                        rowData[header] = row[index];
                    });
                    return rowData;
                });

                result[sheetName] = data;
            });

            resolve(result);


        };

        reader.onerror = (e: any) => {
            reject(e.target.error);
        };

        reader.readAsArrayBuffer(file);
    });
}