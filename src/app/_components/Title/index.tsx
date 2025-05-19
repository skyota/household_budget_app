'use client'

import Image from 'next/image';

const Title: React.FC<{ name: string, iconSrc: string, alt: string }> = ({ name, iconSrc, alt = 'アイコン' }) => {
  return (
    <div className="inline-flex items-center border-b-2 border-mainBlue pr-2">
      <Image src={iconSrc} alt={alt} width={36} height={36} />
      <p className="text-xl font-bold text-fontcolor">{name}</p>
    </div>
  );
};

export default Title;
