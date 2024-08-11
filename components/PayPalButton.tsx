"use client"

import React, { useEffect } from 'react';
import Script from 'next/script';

const PayPalButton = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      if (window.paypal) {
        window.paypal.HostedButtons({
          hostedButtonId: "STT4ECDW3D9WS",
        }).render("#paypal-container-STT4ECDW3D9WS");
      }
    });
  }, []);

  return (
    <div>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAAM52acxEiK4GCRiUfkJwGpXduspaVHcvBY3TnYQOxjkWKuIQSJ57fW7qkyVPQJww7YQ8Gn4TzJnqBDag&components=hosted-buttons&disable-funding=venmo&currency=USD"
        strategy="lazyOnload"
        onLoad={() => {
          if (document.readyState === 'complete' && window.paypal) {
            window.paypal.HostedButtons({
              hostedButtonId: "STT4ECDW3D9WS",
            }).render("#paypal-container-STT4ECDW3D9WS");
          }
        }}
      />
      <div id="paypal-container-STT4ECDW3D9WS"></div>
    </div>
  );
};

export default PayPalButton;
