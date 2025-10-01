import React from 'react'

export default function Features() {
  return (
      <section id="features" className="py-16 px-4 bg-white">
           <div className="max-w-6xl mx-auto">
             <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
               Why Choose FastDL?
             </h3>
             <div className="grid md:grid-cols-3 gap-8">
               <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
                 <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                 </div>
                 <h4 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h4>
                 <p className="text-gray-600">Download Instagram content in seconds with our optimized servers</p>
               </div>
   
               <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
                 <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                   </svg>
                 </div>
                 <h4 className="text-xl font-semibold text-gray-800 mb-2">100% Safe</h4>
                 <p className="text-gray-600">Secure and private. We don't store your data or downloaded content</p>
               </div>
   
               <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
                 <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                   </svg>
                 </div>
                 <h4 className="text-xl font-semibold text-gray-800 mb-2">All Devices</h4>
                 <p className="text-gray-600">Works on mobile, tablet, and desktop. Download anywhere, anytime</p>
               </div>
             </div>
           </div>
         </section>
   
  )
}
