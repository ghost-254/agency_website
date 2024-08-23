"use client"

import React, { useEffect } from 'react';
import Script from 'next/script';

const PayPalButton = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      if (window.paypal) {
        window.paypal.HostedButtons({
          hostedButtonId: "PMXSBVHJAFT2Y",
        }).render("#paypal-container-PMXSBVHJAFT2Y");
      }
    });
  }, []);

  return (
    <div>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAA_A2FR9ukQgTc0zBin-VB5IcBMcAMegKNxwy4tHtmO_oTBt0nxxFX0yLrad-E715ASA_BlUPhRQ5rcSw&components=hosted-buttons&enable-funding=venmo&currency=USD"
        strategy="lazyOnload"
        onLoad={() => {
          if (document.readyState === 'complete' && window.paypal) {
            window.paypal.HostedButtons({
              hostedButtonId: "PMXSBVHJAFT2Y",
            }).render("#paypal-container-PMXSBVHJAFT2Y");
          }
        }}
      />
      <div id="paypal-container-PMXSBVHJAFT2Y"></div>
    </div>
  );
};

export default PayPalButton;
