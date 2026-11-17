import QRCode from 'qrcode';

export const generateQrDataUrl = async (text, options = {}) => {
  try {
    const defaultOptions = {
      width: 280,
      margin: 2,
      color: {
        dark: '#1e1b18',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M',
      ...options
    };
    return await QRCode.toDataURL(text, defaultOptions);
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
};

export const createUpiPayUrl = ({ amount, orderId, merchantUpi = 'gunjansnacks@okhdfcbank', merchantName = 'Gunjan Snacks' }) => {
  const cleanAmount = Number(amount).toFixed(2);
  const note = encodeURIComponent(`Gunjan Snacks Order ${orderId}`);
  const name = encodeURIComponent(merchantName);
  return `upi://pay?pa=${merchantUpi}&pn=${name}&am=${cleanAmount}&cu=INR&tn=${note}`;
};
