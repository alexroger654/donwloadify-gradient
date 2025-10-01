import { Video } from 'lucide-react'
import React from 'react'

export default function Navbar({ gradient }: { gradient: string }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}>
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              FastDL
            </h1>
          </div>

          <nav className="hidden md:flex space-x-6 font-semibold">
            <a
              href="#home"
              className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600  hover:via-pink-500 hover:to-orange-400 hover:bg-clip-text hover:text-transparent transition duration-500"
            >
              Home
            </a>
            <a
              href="#how-to-use"
              className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600  hover:via-pink-500 hover:to-orange-400 hover:bg-clip-text hover:text-transparent transition duration-500"
            >
              How to Use
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600  hover:via-pink-500 hover:to-orange-400 hover:bg-clip-text hover:text-transparent transition duration-500"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600  hover:via-pink-500 hover:to-orange-400 hover:bg-clip-text hover:text-transparent transition duration-500"
            >
              FAQ
            </a>
            <a
              href="#related-tools"
              className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600  hover:via-pink-500 hover:to-orange-400 hover:bg-clip-text hover:text-transparent transition duration-500"
            >
              Related Tools
            </a>
          </nav>

        </div>
      </div>
    </header>

  )
}
