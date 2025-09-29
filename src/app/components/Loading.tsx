import React from 'react';


const Loading= () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        {/* The loading spinner */}
        <div className="w-16 h-16 border-4 border-t-4 border-gray-500 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
        
        {/* The loading text */}
        <p className="mt-4 text-lg font-medium text-gray-700">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
