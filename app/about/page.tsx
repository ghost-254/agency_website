import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <div className="container mx-auto px-14 py-8">
      <div className="flex flex-wrap mb-8">
        <div className="w-full md:w-1/2 mt-10">
          <Image 
            src="/profile.jpg" 
            alt="Profile Picture" 
            width={450}
            height={600}
            className="rounded shadow-lg mb-4 md:mb-0" 
          />
          {/* Adding Name and Icons */}
          <div className="font-mono mt-4 mb-6">
            <div className="text-sm font-semibold flex items-center">
              <Link href="https://www.linkedin.com/in/sandra-hertkorn-6407738a/"><FaLinkedinIn className="font-mono text-green-700 mr-4 hover:text-green-900" /></Link>
              <span>Sandra Hertkorn</span>
            </div>
            <div className="flex items-center text-sm text-gray-700 mt-2">
              <Link href="mailto:sandra.hertkorn@outreachconnect.org"><FaEnvelope className="font-mono text-green-700 mr-4 hover:text-green-900" /></Link>
              <span>sandra.hertkorn@outreachconnect.org</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-8">

          <h2 className="text-2xl font-semibold mb-4 mt-8">Behind the Vision</h2>
          <p className="mb-4 text-left">
            Outreachconnect.org is a woman-owned initiative founded by a former Army veteran with over fifty years of combined experience in healthcare. 
            The organization emphasizes diversity and ethics, aiming to bridge the gap in engaging community agencies and expedite support for the homeless.
            Inspired by some of the greatest women, we believe that the true measure of poverty extends beyond physical deprivation, encompassing the lack of love, care, and recognition. 
          </p>
          <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-700 mb-4">
            &quot;We think sometimes that poverty is only being hungry, naked and homeless. The poverty of being unwanted, unloved and uncared for is the greatest poverty.&quot;
            <br />
            <span className="not-italic font-semibold">- Mother Teresa</span>
          </blockquote>
          <p className="mb-4">
            Outreachconnect.org is dedicated to advocacy that promotes human dignity. By connecting the homeless with the support services offered by various agencies and organizations, we demonstrate social responsibility and commitment to those less fortunate.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap text-center">
        <div className="w-full md:w-1/3 p-4">
          <h3 className="text-xl font-semibold mb-4">What We Do?</h3>
          <p className='text-left'>
            At Outreachconnect.org, we bridge the gap between the homeless and essential support services. 
            We engage with community agencies to expedite assistance and advocate for the dignity of those less fortunate. 
            Our goal is to ensure access to resources and promote a supportive community for all.
          </p>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <h3 className="text-xl font-semibold mb-4">What is Our Process?</h3>
          <p className="mb-4 text-left">
            We engage with community agencies, assess individual needs, and connect the homeless with essential services. 
            Our structured approach ensures timely support and fosters collaboration between organizations.
          </p>
          <ol className="list-decimal list-inside text-left mb-4">
            <li>Engage with community agencies.</li>
            <li>Assess individual needs.</li>
            <li>Connect with essential services.</li>
            <li>Ensure timely support.</li>
            <li>Foster organizational collaboration.</li>
          </ol>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <h3 className="text-xl font-semibold mb-4">Why We Stand Out?</h3>
          <p className='text-left'>
            Our unique approach sets us apart. We prioritize dignity, act swiftly, and collaborate effectively to provide comprehensive support.
          </p>
          <ol className="list-decimal list-inside text-left mb-4 mt-5">
            <li>Prioritize dignity and respect.</li>
            <li>Swift and efficient action.</li>
            <li>Effective collaboration.</li>
            <li>Comprehensive support.</li>
            <li>Commitment to ethical practices.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default About;
