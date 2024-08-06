import React, { useState } from "react";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Icon1 from "@/public/icon1.png";
import Icon2 from "@/public/icon2.png";

const SupportTeam = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission logic
    console.log({ name, email, phone, message });
  };

  return (
    <div id="supportTeam" className="pt-[7rem] pb-[3rem]">
      <div className="w-[80%] mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-[2rem] ">
        <div>
          <h1 className="text-[27px] md:text-[35px] lg:text-[40px] mb-[1rem] font-bold text-[#02073e] leading-[2.4rem] md:leading-[4rem]">
            Do you need help? Our Support Team is ready to assist you
          </h1>
          <p className="text-gray-900 opacity-90 text-[17px] mt-[1rem]">
            At Outreach Connect, we are committed to helping you with any inquiries or support you may need. 
            Our team is here to ensure you have all the information and assistance necessary to make a difference. 
            Feel free to reach out to us through the following channels:
          </p>
          <div className="flex items-center space-x-6 mt-[2rem]">
            <Image src={Icon1} alt="icon" width={60} height={60} />
            <div>
              <h1 className="text-[18px] text-gray-900 font-[500] mb-[0.5rem]">
                Email client support
              </h1>
              <p className="md:w-[70%] w-[90%] text-[15px] text-black opacity-85">
                Reach out to us via email for any questions or support. 
                Our team is dedicated to providing timely and comprehensive responses to your inquiries.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 mt-[2rem]">
            <Image src={Icon2} alt="icon" width={60} height={60} />
            <div>
              <h1 className="text-[18px] text-gray-900 font-[500] mb-[0.5rem]">
                Direct ticket support
              </h1>
              <p className="md:w-[70%] w-[90%] text-[15px] text-black opacity-85">
                Submit a support ticket, and our team will get back to you promptly to address your needs and concerns.
              </p>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-anchor-placement="top-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-[27px] text-center text-[#02073e] font-bold mb-[1rem]">Contact Us</h2>
            <div>
              <label className="block text-[17px] text-[#02073e] font-[500] mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[17px] text-[#02073e] font-[500] mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[17px] text-[#02073e] font-[500] mb-2" htmlFor="phone">Phone</label>
              <PhoneInput
                country={'us'}
                value={phone}
                onChange={setPhone}
                inputClass="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-[17px] text-[#02073e] font-[500] mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full p-2 bg-[#02073e] text-white font-bold rounded">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportTeam;
