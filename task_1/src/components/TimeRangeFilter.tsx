import React, { useState } from 'react'

interface TimeRangeFilterProps{
    onSubmit: ( startTime: Date, endTime:Date ) => void;
}

const TimeRangeFilter:React.FC<TimeRangeFilterProps> = ({
    onSubmit
}) => {
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');


    const handleDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setStartTime(event.target.value); 
    };

    const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setEndTime(event.target.value); 
    };


    const handleSubmit = () => {
        const t1 = new Date(`2024-10-10T${startTime}`);
        const t2 = new Date(`2024-10-10T${endTime}`); 
        t1 < t2 
            ? onSubmit( t1, t2 )
            : console.log("Error");
    }

    return (
        <div className='flex gap-4 justify-center items-center'>
            <label htmlFor="dateInput">Chọn ngày từ:</label>
            <input onChange={handleDateFromChange} type='time' step={2} className='text-xl py-2 px-4 rounded-full'/>
            <p> đến </p>
            <input onChange={handleDateToChange} type='time' step={2} className='text-xl py-2 px-4 rounded-full'/> 
            <button onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded-full'>Tìm kiếm</button>
        </div>
    )
}


export default TimeRangeFilter;