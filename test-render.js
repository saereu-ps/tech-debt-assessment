import React from 'react';
import { renderToString } from 'react-dom/server';
import { QRCode } from 'react-qrcode-logo';

const App = () => React.createElement(QRCode, { 
  value: "http://test",
  qrStyle: "dots",
  eyeRadius: 10,
  logoImage: "/assets/mfec-pixel.svg",
  logoWidth: 80,
  logoHeight: 20
});

try {
  console.log(renderToString(React.createElement(App)));
} catch (e) {
  console.error(e);
}
