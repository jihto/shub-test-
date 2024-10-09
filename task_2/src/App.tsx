import { useState } from 'react';
import toast from 'react-hot-toast';

type ErrorNumber = -1 | 0 | 1 | 2 | 3 |4;


function App() {
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState<number>(3.03);
  const [column, setColumn] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(60000);
  const [price, setPrice] = useState<number>(19800);
  const [error, setError] = useState<ErrorNumber>(-1);


  const handleUpdate = () => {
    if(typeof time !== "string" || time.length < 1){
      return setError(0);
    }
    if(typeof quantity !== "number" || quantity < 1){ 
      return setError(1);
    }
    if(typeof column !== "number" || column < 1){
      toast.error("Vui loại chọn trụ");
      return setError(2);
    } 
    if(typeof revenue !== "number" || revenue < 1){ 
      return setError(3);
    }
    if(typeof price !== "number" || price < 1){ 
      return setError(4);
    }
    setError(-1)
    toast.success(`Gửi thành công: thời gian: ${time}, số lượng: ${quantity}, trụ: ${column}, doanh thu: ${revenue}, giá: ${price}`)
    console.log({
      time,
      quantity,
      column,
      revenue,
      price,
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      {/* Header */}
      <div className='shadow-md mb-4 px-2 pb-10'>
        <div className="flex justify-between items-center">
          <button>← Đóng</button> 
          <button onClick={handleUpdate}className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90">
            Cập nhật
          </button>
        </div>
        <h1 className="text-3xl font-bold">Nhập giao dịch</h1>
      </div>
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Time Input */}
        <div className='relative'>
          <label className="absolute top-1 left-4 block mb-2 text-gray-600 text-sm font-thin">Thời gian</label> 
            <input
              type="datetime-local"
              id="datetime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full pt-6 text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${error === 0 ? 'border-red-400' : "border-gray-300"}`}
            /> 
            <p className={`${error === 0 ? 'block' : 'hidden'} text-sm text-red-400 mt-1`}>*Vui lòng chọn ngày</p>
        </div>

        {/* Quantity Input */}
        <div className='relative'>
          <label className="absolute top-1 left-4 block mb-2 text-gray-600 text-sm font-thin">Số lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={`w-full pt-6 text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${error === 1 ? 'border-red-400' : "border-gray-300"}`}
          />
          <p className={`${error === 1 ? 'block' : 'hidden'} text-sm text-red-400 mt-1`}>*Vui lòng nhập số lượng đúng định dạng</p>
        </div>

        {/* Column (Trụ) */}
        <div className='relative'>
          <label className="absolute top-1 left-4 block mb-2 text-gray-600 text-sm font-thin">Trụ</label>
          <select
            value={column}
            onChange={(e) => setColumn(Number(e.target.value))}
            className={`w-full pt-6 text-lg py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${error === 2 ? 'border-red-400' : "border-gray-300"}`}
          >
            <option value="0" disabled>
              Chọn trụ
            </option>
            <option value="1">Trụ 1</option>
            <option value="2">Trụ 2</option>
          </select>
          <p className={`${error === 2 ? 'block' : 'hidden'} text-sm text-red-400 mt-1`}>*Vui loại chọn trụ</p>
        </div>

        {/* Revenue Input */}
        <div className='relative'>
          <label className="absolute top-1 left-4 block mb-2 text-gray-600 text-sm font-thin">Doanh thu</label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className={`w-full pt-6 text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${error === 3 ? 'border-red-400' : "border-gray-300"}`}
          />
          <p className={`${error === 3 ? 'block' : 'hidden'} text-sm text-red-400 mt-1`}>*Vui lòng nhập doanh thu đúng định dạng</p>
        </div> 

        {/* Price Input */}
        <div className='relative'>
          <label className="absolute top-1 left-4 block mb-2 text-gray-600 text-sm font-thin">Đơn giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={`w-full pt-6 text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${error === 4 ? 'border-red-400' : "border-gray-300"}`}
          />
          <p className={`${error === 4 ? 'block' : 'hidden'} text-sm text-red-400 mt-1`}>*Vui lòng nhập giá đúng định dạng</p>
        </div>
      </div>
    </div>
  );
};

export default App
