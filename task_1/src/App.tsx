import { useEffect, useState } from 'react'; 
import * as XLSX from 'xlsx'; 
import { DataProps, headersDataKeys } from './type';


function App() { 
  const [data, setData] = useState<Array<DataProps[]>>([]);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const readExcel = (file: File) => {
    const reader = new FileReader(); 
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' }); 
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
      localStorage.setItem("data", JSON.stringify(filteredData));
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

  const handleDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setStartTime(event.target.value); 
  };

  const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setEndTime(event.target.value); 
  };

  useEffect(() => {
    const getDataLocal = localStorage.getItem("data");
    if(getDataLocal){
      const dataLocal: any[] = JSON.parse(getDataLocal);
      if(Array.isArray(dataLocal))
        setData(dataLocal);
    };  
  }, [])


  useEffect(() => {
    if (startTime !== "" && endTime !== "" && data.length > 0){
       
      // setData(prev => 
      //   prev.filter((item: any) => {
      //   const date: Date = new Date(item["Ngày"]);
      //   console.log({ date, start, end})
      //   return date >= start && date <= end;
      // }))
      console.log(startTime, endTime);
    }
  }, [startTime, endTime]);
  return (
    <>
      <p className='text-5xl my-10'>DATA REPORT</p>
      <div className='my-10'>
        <p>Upload data from here:</p>
        <input className='bg-white px-2 py-1 text-gray-400 rounded-full' type="file" accept=".xlsx" onChange={handleFileUpload} /> 
      </div>
      <div className="flex justify-center items-center">
        <div className="max-h-[500px] overflow-y-auto w-full rounded-xl">
          <table className="table-auto border-collapse border border-gray-300 w-full h-[500px] ">
            <thead className="sticky top-0 bg-gray-200">
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
      <div className='flex gap-4 justify-center items-center'>
        <label htmlFor="dateInput">Chọn ngày từ:</label>
        <input onChange={handleDateFromChange} type='time' className='text-xl py-2 px-4 rounded-full'/>
        <p> đến </p>
        <input onChange={handleDateToChange} type='time' className='text-xl py-2 px-4 rounded-full'/>

      </div>
    </>
  );

}

export default App
