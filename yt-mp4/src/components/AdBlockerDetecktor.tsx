import { useEffect, useState } from "react";

interface AdBlockDetectorProps {
  onDetect?: (detected: boolean) => void;
}

const AdBlockDetector: React.FC<AdBlockDetectorProps> = ({ onDetect }) => {
  const [adBlocked, setAdBlocked] = useState<boolean>(false);

  useEffect(() => {
    let detected = false;

    const bait = document.createElement("div");
    bait.className = "adsbox";
    bait.style.position = "absolute";
    bait.style.height = "1px";
    bait.style.width = "1px";
    bait.style.top = "-1000px";
    document.body.appendChild(bait);

    const fakeScript = document.createElement("script");
    fakeScript.src = "/ads.js";
    fakeScript.type = "text/javascript";
    fakeScript.onerror = () => {
      detected = true;
      setAdBlocked(true);
      onDetect?.(true);
    };
    document.body.appendChild(fakeScript);

    const timeout = setTimeout(() => {
      const baitBlocked =
        window.getComputedStyle(bait).display === "none" || bait.offsetParent === null;
      if (baitBlocked && !detected) {
        detected = true;
        setAdBlocked(true);
        onDetect?.(true);
      }
      document.body.removeChild(bait);
      document.body.removeChild(fakeScript);
    }, 150);

    return () => clearTimeout(timeout);
  }, [onDetect]);

  
  useEffect(() => {
    if (adBlocked) {
      console.warn("AdBlocker detected! Some features may be limited.");
    }
  }, [adBlocked]);

  return null;
};

export default AdBlockDetector;
