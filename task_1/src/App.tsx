import { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx'; 
import { DataProps, headersDataKeys } from './type';


function App() {

  const [data, setData] = useState<Array<DataProps[]>>([]);

  const readExcel = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      // Get the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON without headers
      const jsonData: Array<any> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Find the row that contains "STT" or "stt" and start from that point
      const startIndex = jsonData.findIndex(
        (row) => typeof row[0] === 'string' && row[0].toLowerCase() === 'stt'
      );

      // Splice or slice the array starting from the found row
      let filteredData = startIndex !== -1 ? jsonData.slice(startIndex + 1) : [];
      const maxColumns = Math.max(...filteredData.map(row => row.length));

      // Normalize each row to have the same number of columns by filling empty cells with ""
      filteredData = filteredData.map((row: any[]) =>
        Array.from({ length: maxColumns }, (_, index) => row[index] ?? "")
      );  
      setData(filteredData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      readExcel(file);
    }
  };

  return (
    <>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} /> 
      <div className="flex justify-center items-center h-screen">
        <div className="max-h-[500px] overflow-auto w-full rounded-xl">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead className='sticky'>
              <tr>
                {headersDataKeys.map((header: string, index: number) => (
                  <th key={index}
                    className="border border-gray-500 px-4 py-2 text-black bg-gray-200 text-left text-sm font-medium whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell: any, colIndex: number) => (
                    <td key={colIndex} className="border border-gray-300 px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );

}

export default App
