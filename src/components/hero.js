import Button from "./button";
const Hero = () => {
  return (
    <section className="text-center py-40 bg-gradient-to-b from-[#DDEBFE] to-transparent">
      <h2 className="text-3xl md:text-5xl font-bold">
        Welcome to AttendanceTracker
      </h2>
      <p className="text-gray-600 mt-2">
        Keep track of your attendance with ease
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <Button label="Login" to="login" />
        <Button label="Sign Up" to="signup" />
      </div>
    </section>
  );
};

export default Hero;
