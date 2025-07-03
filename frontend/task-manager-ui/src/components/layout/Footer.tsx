import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              🏛️ HMCTS Task Manager
            </h3>
            <p className="text-gray-300 text-sm">
              A digital service for caseworkers to efficiently manage their tasks 
              and streamline court administration processes.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help & Support
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Technical Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {currentYear} Her Majesty's Courts and Tribunals Service (HMCTS). 
              All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <span className="text-xs text-gray-500">Built with React & TypeScript</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Version 1.0.0</span>
                <div className="w-2 h-2 bg-green-500 rounded-full" title="Service Online"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;