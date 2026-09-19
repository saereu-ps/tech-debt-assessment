import React from 'react';
import { renderToString } from 'react-dom/server';
import { QRCode } from 'react-qrcode-logo';

try {
  console.log(renderToString(<QRCode value="http://test" eyeRadius={10} />));
} catch (e) {
  console.error("CRASH:", e);
}
