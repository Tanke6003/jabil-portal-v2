import { generateCsv,download,mkConfig,ConfigOptions, CsvOutput } from "export-to-csv"; 

export function exportToCsv(data: any[] | [any[]],pages:string[]|null, filename?: string, headers?:Array<{key:string,displayLabel:string}>) {
    if (!filename) filename = "export";
    const options:ConfigOptions = {
        fieldSeparator: ',',
        decimalSeparator: '.',
        //showTitle: true,
        //title: filename,
        filename: filename,
        useBom: true,
        useKeysAsHeaders: true,
        //showColumnHeaders: true,
        //columnHeaders: headers??Object.keys(data[0])
        
    };
    if(headers){
        options.showColumnHeaders = true;
        options.columnHeaders = headers;
        options.useKeysAsHeaders = false;
    }

    const config = mkConfig(options);
    const csv:CsvOutput = generateCsv(config)(data,);

    download(config)(csv);

}



export function convertCsvToObjectArray(csv:string):Array<{ [key: string]: any }>{
    let lines = csv.split('\n');
    let result = [];
    let headers = lines[0].split(',');
    for(let i = 1; i < lines.length; i++){
        let obj: { [key: string]: any } = {}; // Add index signature
        let currentline = lines[i].split(',');
        for(let j = 0; j < headers.length; j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}