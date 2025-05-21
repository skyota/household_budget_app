'use client'

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  value: { year: number; month: number; };
  onChange: (year: number, month: number) => void;
}

const MonthNavigator = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const { year, month } = value;

  const goToPrevMonth = () => {
    if (month == 1) {
      onChange(year - 1, 12);
    } else {
      onChange(year, month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      onChange(year + 1, 1);
    } else {
      onChange(year, month + 1);
    }
  };

  const handleSelect = (y: number, m: number) => {
    onChange(y, m);
    setOpen(false);
  };

  const startYear = year - 1;
  const endYear = year + 1;

  return (
    <div className="w-full flex justify-between items-center">
      <button onClick={goToPrevMonth} className="flex items-center gap-3 group">
        <Image src="/images/left-arrow.png" alt="前月" width={9} height={18} className="transition-transform group-hover:-translate-x-1" />
        <p className='text-xl font-bold text-fontcolor'>前月</p>
      </button>
      <div className='relative'>
        <button onClick={() => setOpen(!open)} className='flex items-center gap-3 group'>
          <p className='text-xl font-bold text-fontcolor'>{year}年{month}月</p>
          <Image src="/images/down-arrow.png" alt="月選択" width={18} height={9} className="transition-transform group-hover:translate-y-1" />
        </button>
        {open && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 max-h-60 overflow-y-auto bg-white border rounded shadow z-10">
            {Array.from({ length: (endYear - startYear + 1) * 12 }).map((_, i) => {
              const y = startYear + Math.floor(i / 12);
              const m = (i % 12) + 1;
              return (
                <div
                  key={`${y}-${m}`}
                  onClick={() => handleSelect(y, m)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-center"
                >
                  {y}年{m}月
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button onClick={goToNextMonth} className="flex items-center gap-3 group">
        <p className='text-xl font-bold text-fontcolor'>次月</p>
        <Image src="/images/right-arrow.png" alt="次月" width={9} height={18} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  )
}

export default MonthNavigator;
