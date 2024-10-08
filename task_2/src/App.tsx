import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' 

function App() {
  const [time, setTime] = useState("07/10/2024 17:25:02");
  const [quantity, setQuantity] = useState("3.03");
  const [column, setColumn] = useState("");
  const [revenue, setRevenue] = useState("60000");
  const [price, setPrice] = useState("19800");

  const handleUpdate = () => {
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
        <div className="flex justify-between items-center mb-6">
          <button className="text-blue-500">← Đóng</button> 
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Cập nhật
          </button>
        </div>
        <h1 className="text-3xl font-bold">Nhập giao dịch</h1>
      </div>
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Time Input */}
        <div>
          <label className="block mb-2 font-medium">Thời gian</label>
          <div className="relative">
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-2.5 text-gray-400">
              🗓️
            </span>
          </div>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block mb-2 font-medium">Số lượng</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Column (Trụ) */}
        <div>
          <label className="block mb-2 font-medium">Trụ</label>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="w-full text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Chọn trụ
            </option>
            <option value="1">Trụ 1</option>
            <option value="2">Trụ 2</option>
          </select>
        </div>

        {/* Revenue Input */}
        <div>
          <label className="block mb-2 font-medium">Doanh thu</label>
          <input
            type="text"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="w-full text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="block mb-2 font-medium">Đơn giá</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full text-lg py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default App
