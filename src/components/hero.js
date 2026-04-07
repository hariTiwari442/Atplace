import { useEffect, useState } from "react";
import Button from "./button";

const Hero = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Capture the install prompt before it auto-fires
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Hide button if already installed
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setInstallPrompt(null);
  };

  return (
    <section className="text-center py-40 bg-gradient-to-b from-[#FFF3EB] to-white">
      <h2 className="text-3xl md:text-5xl font-bold text-[#002677]">
        Welcome to AtPlace
      </h2>
      <p className="text-gray-500 mt-2">
        Keep track of your attendance with ease
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <Button label="Login" to="auth?mode=login" />
        <Button label="Sign Up" to="auth?mode=signup" />
      </div>

      {/* Install button — only shows on Android Chrome when not yet installed */}
      {installPrompt && !isInstalled && (
        <div className="mt-6">
          <button
            onClick={handleInstall}
            className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d6510f] transition-all shadow-md"
          >
            📲 Add to Home Screen
          </button>
          <p className="text-xs text-gray-400 mt-2">
            iPhone? Tap Share → "Add to Home Screen"
          </p>
        </div>
      )}
    </section>
  );
};

export default Hero;
