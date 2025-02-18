const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Side - Branding */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold">MyApp</h2>
          <p className="text-gray-400 text-sm">
            © 2025 MyApp. All Rights Reserved.
          </p>
        </div>

        {/* Center - Links */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            Features
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        {/* Right Side - Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
