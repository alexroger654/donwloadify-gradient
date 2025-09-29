import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-white/8 to-white/5 rounded-full blur-3xl animate-float-slower"></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-white/6 to-white/12 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-r from-white/4 to-white/8 rounded-full blur-3xl animate-float-slow"></div>
      
      {/* Medium floating shapes */}
      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-white/7 to-white/4 rounded-full blur-2xl animate-float-medium"></div>
      <div className="absolute top-2/3 right-1/4 w-56 h-56 bg-gradient-to-r from-white/5 to-white/9 rounded-full blur-2xl animate-float-slow"></div>
      
      {/* Small floating dots */}
      <div className="absolute top-1/4 right-1/2 w-32 h-32 bg-gradient-to-r from-white/15 to-white/10 rounded-full blur-xl animate-float-fast"></div>
      <div className="absolute bottom-1/3 left-1/2 w-24 h-24 bg-gradient-to-r from-white/12 to-white/8 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-1/2 left-1/6 w-20 h-20 bg-gradient-to-r from-white/10 to-white/15 rounded-full blur-xl animate-float-medium"></div>
      
      {/* Additional ambient shapes */}
      <div className="absolute top-10 right-1/3 w-40 h-40 bg-gradient-to-r from-white/6 to-white/4 rounded-full blur-2xl animate-float-slower"></div>
      <div className="absolute bottom-10 left-1/2 w-60 h-60 bg-gradient-to-r from-white/8 to-white/6 rounded-full blur-3xl animate-float-slow"></div>
    </div>
  );
};

export default FloatingShapes;