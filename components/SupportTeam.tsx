import React, { useState } from "react";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Icon1 from "@/public/icon1.png";
import Icon2 from "@/public/icon2.png";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import Modal from "react-modal";
import Loader from "./Loader";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const SupportTeam: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, phone: value }));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!formData.phone || formData.phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
  
    setIsSending(true);
  
    emailjs
      .send("service_9e15qfs", "template_zaqsvj7", formData as unknown as Record<string, unknown>, "arlDmaff6RViM50u3")
      .then(
        () => {
          setIsSending(false);
          setModalIsOpen(true);
          setTimeout(() => setModalIsOpen(false), 5000);
        },
        (error) => {
          setIsSending(false);
          console.error(error.text);
        }
      );
  };  

  return (
    <div id="supportTeam" className="pt-[7rem] pb-[3rem]">
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[2rem] items-center">
        <div>
          <h1 className="text-[27px] md:text-[35px] lg:text-[40px] mb-[1rem] font-bold text-[#02073e] leading-[2.4rem] md:leading-[4rem]">
            Questions or Seeking Additional Information?
          </h1>
          <p className="text-gray-900 opacity-90 text-[17px] mt-[1rem]">
            At Outreach Connect, we are committed to helping you with any
            inquiries or support you may need. Our team is here to ensure you
            have all the information and assistance necessary to make a
            difference. Feel free to reach out to us through the following
            channels:
          </p>
          <div className="flex items-center space-x-6 mt-[2rem]">
            <Image src={Icon1} alt="icon" width={60} height={60} />
            <div>
              <h1 className="text-[18px] text-gray-900 font-[500] mb-[0.5rem]">
                Email client support
              </h1>
              <p className="md:w-[70%] w-[90%] text-[15px] text-black opacity-85">
                Reach out to us via email{" "}
                <Link
                  href="mailto:official@outreachconnect.org"
                  className="text-blue-300 hue-rotate-180 hover:underline-offset-8"
                >
                  official@outreachconnect.org
                </Link>{" "}
                for any questions or support. Our team is dedicated to providing
                timely and comprehensive responses to your inquiries.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 mt-[2rem]">
            <Image src={Icon2} alt="icon" width={60} height={60} />
            <div>
              <h1 className="text-[18px] text-gray-900 font-[500] mb-[0.5rem]">
                Direct contact
              </h1>
              <p className="md:w-[70%] w-[90%] text-[15px] text-black opacity-85">
                Reach out to us with any questions by leaving a message directly
                on the contact form here. We will get back to you promptly to
                address your needs, concerns, or inquiries.
              </p>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-anchor-placement="top-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-[27px] text-center text-[#02073e] font-bold mb-[1rem]">
              Contact Us
            </h2>
            <div className="mb-4">
              <label className="block text-[17px] text-[#02073e] font-[500] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[17px] text-[#02073e] font-[500] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[17px] text-[#02073e] font-[500] mb-2">
                Phone
              </label>
              <PhoneInput
                country={"us"}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputClass="w-full p-2 border border-gray-300 rounded"
              />
              {/* Hidden input to include phone in form data */}
              <input type="hidden" name="phone" value={formData.phone} />
            </div>
            <div className="mb-4">
              <label className="block text-[17px] text-[#02073e] font-[500] mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-[#02073e] text-white font-bold rounded"
            >
              Send Message
            </button>
          </form>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-8 rounded shadow-md text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500 mx-auto mb-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p>Your message has been successfully sent.</p>
            </div>
          </Modal>
          <Modal
            isOpen={isSending}
            onRequestClose={() => setIsSending(false)}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-8 rounded shadow-md text-center">
              <Loader />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SupportTeam;
