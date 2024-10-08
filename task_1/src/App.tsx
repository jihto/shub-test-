import { useEffect, useState } from 'react'; 
import * as XLSX from 'xlsx'; 
import { DataProps, headersDataKeys } from './type';
import TimeRangeFilter from './components/TimeRangeFilter';


function App() { 
  const [data, setData] = useState<Array<DataProps[]>>([]); 
  const [totalPrice, setTotalPrice]= useState<number>(0);
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

  const handleQuery = (start: Date, end: Date) => {  
    try {
      const filteredData = data.filter((item: DataProps[]) => { 
      const date = new Date(`2024-10-10T${item[2].toString()}`); 
        return date >= start && date <= end;
      }) 
      const totalPrice = filteredData.reduce((total, item) => {
        return total + Number(item[8]); 
      }, 0);
      if(filteredData){
        setTotalPrice(totalPrice);
        setData(filteredData);
      }
    } catch (error) {
      setTotalPrice(0);
      setData([]);   
    } 
  }

  useEffect(() => {
    const getDataLocal = localStorage.getItem("data");
    if(getDataLocal){
      const dataLocal: any[] = JSON.parse(getDataLocal);
      if(Array.isArray(dataLocal))
        setData(dataLocal);
    };  
  }, [])


  return (
    <>
      <p className='text-5xl my-10'>Báo cáo giao dịch</p>
      <div className="flex justify-center items-center">
        <div className="max-h-[500px] md:max-h-[600px] overflow-y-auto w-full text-xs rounded-xl">
          <table className="table-auto border-collapse border border-gray-300 w-full h-[500px] md:h-[600px] ">
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
      <div className='lg:flex lg:flex-row justify-between mx-0 lg:mx-20'>
        <div className='my-5 lg:my-10 flex justify-center align-middle gap-1 items-center'>
          <p>Upload data from here (only .xlsx):</p>
          <input className='bg-white px-2 py-1 text-gray-400 rounded-full' type="file" accept=".xlsx" onChange={handleFileUpload} /> 
        </div>
        <p className='my-10'>Tổng Thành tiền: {totalPrice}</p>
      </div>
      <TimeRangeFilter onSubmit={handleQuery}/>
    </>
  );

}

export default App
