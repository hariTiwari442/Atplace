import FeatureCard from "./UI/FeatureCard";
const FeatureList = (props) => {
  console.log("I am from " + props.featureCardContent);
  return (
    <div className="flex flex-grow flex-wrap justify-evenly gap-0 px-6 md:px-16">
      {props.features.map((feature) => (
        <FeatureCard
          key={feature.key}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          iconColor={feature.iconColor}
          alt={feature.alt}
        />
      ))}
    </div>
  );
};
export default FeatureList;
