'use client'

import Navigation from "./Navigation";

const Footer: React.FC = () => {

  return (
    <div className="bg-[#2A2A30]">
      <div className="inner">
        <div className="px-12 py-10 flex flex-col gap-10 md:px-0 md:py-5 md:gap-7">
          <Navigation />
          <p className="text-white text-base leading-relaxed text-center">© BudgetNavi All Right Reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;
