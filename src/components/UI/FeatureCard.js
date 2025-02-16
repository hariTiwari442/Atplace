const FeatureCard = (props) => {
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-all duration-300 w-[300px] h-[210px] max-w-sm mx-4 
                    hover:bg-gray-100 hover:-translate-y-2 hover:shadow-2xl font-inter"
    >
      <div className={`text-4xl ${props.iconColor} mb-4`}>
        <img
          src={props.icon}
          alt={props.alt}
          className="w-16 h-16 object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{props.title}</h3>
      <p className="text-gray-600 text-sm mt-2">{props.description}</p>
    </div>
  );
};

export default FeatureCard;
