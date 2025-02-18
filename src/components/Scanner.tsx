import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useStore } from '../store/useStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Scanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { setFoodCourt } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        setFoodCourt(decodedText);
        scanner.clear();
        navigate('/restaurants');
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Scan Food Court QR Code</h2>
      <div id="reader" className="w-full max-w-sm mx-auto mb-8"></div>
      
      <div className="text-center">
        <Link
          to="/foodcourts"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Browse Food Courts
        </Link>
      </div>

      {scanResult && (
        <p className="mt-4 text-center">
          Redirecting to restaurant selection...
        </p>
      )}
    </div>
  );
}