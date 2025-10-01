// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-center text-sm text-white py-8">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2">Fast2DL</span>
      </div>

      {/* Navigation Links */}
      <div className="space-x-3 mb-3">
        <a href="#" className="hover:text-purple-600">Video </a> 
        <a href="#" className="hover:text-purple-600">Photo </a> 
        <a href="#" className="hover:text-purple-600">Reels </a> 
        <a href="#" className="hover:text-purple-600">Story </a> 
        <a href="#" className="hover:text-purple-600">Viewer </a> 
        <a href="#" className="hover:text-purple-600">Igtv </a> 
        <a href="#" className="hover:text-purple-600">Carousel </a>
      </div>

      <div className="space-x-3 mb-3">
        <a href="#" className="hover:text-purple-600">About FastDL </a> 
        <a href="#" className="hover:text-purple-600">Contact </a> 
        <a href="#" className="hover:text-purple-600">Privacy Policy </a> 
        <a href="#" className="hover:text-purple-600">Terms & Conditions </a>
      </div>

      <div className="space-x-3 mb-6">
        <a href="#" className="hover:text-purple-600">Background Remover </a> 
        <a href="#" className="hover:text-purple-600">Pinterest Video Downloader </a>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 pt-4">
        <p className="text-gray-300">
          © 2025 <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent  font-medium">FastDL</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
