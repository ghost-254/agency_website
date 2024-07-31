import Image from "next/image";
import React from "react";
import CompanyImg from "@/public/customer.png";

const Company = () => {
  return (
    <div className="pt-[6rem] pb-[3rem] ">
      <h1 className="mb-[1.5rem] font-bold text-[22px] text-center md:text-[30px] text-[#02073e]">
        Our Focus and Partners
      </h1>
      <p className="w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto text-[17px] text-center text-gray-950 opacity-80">
        We collaborate with diverse partners to support and empower our community. 
        Sacramento Community College District provides educational resources, aiding underserved individuals. 
        Faith-based partners offer spiritual guidance and essential services. 
        We stand with LGBTQ+ advocacy groups for inclusivity and support. 
        We honor veterans through dedicated organizations. Collaborating with local homeless agencies, we combat hunger and address local issues effectively. 
        Together, these partnerships strengthen our mission to serve and empower the homeless and underserved.
      </p>
      <div className="mt-[2rem] text-center w-[80%] mx-auto">
        <Image src={CompanyImg} alt="company" />
      </div>
    </div>
  );
};

export default Company;
