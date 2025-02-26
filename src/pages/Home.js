import Hero from "../components/hero";
import FeatureList from "../components/Featurecardlist";
import location from "../assets/location.png";
import report from "../assets/report.png";
import saveTime from "../assets/save-time.png";
import easy from "../assets/easy.png";
const featureCardContent = [
  {
    key: 1,
    title: "Easy to Use",
    icon: easy,
    description: "Simple interface for quick attendance tracking",
    iconColor: "blue",
  },
  {
    key: 2,
    title: "Multiple Places",
    icon: location,
    description: "Track attendance for various locations",
    iconColor: "blue",
  },
  {
    key: 3,
    title: "Detailed reports",
    icon: report,
    description: "Get insights with comprehensive attendance reports",
    iconColor: "blue",
  },
  {
    key: 4,
    title: "Time Saving",
    icon: saveTime,
    description: "Efficiently manage your time and attendance",
    iconColor: "blue",
  },
];
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <Hero />
        <FeatureList features={featureCardContent} />
      </main>

      {/* Footer (Always at Bottom) */}
    </div>
  );
};

export default HomePage;
