'use client'

const SectionTitle: React.FC<{ title: string; englishTitle: string }> = ({ title, englishTitle }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-bold leading-none tracking-normal text-mainBlue md:text-xs">
        {englishTitle}
      </p>
      <h2 className="text-4xl font-bold leading-none tracking-normal text-fontcolor md:text-xl">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
