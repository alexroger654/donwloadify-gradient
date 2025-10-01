import Image from 'next/image'
import React from 'react'

export default function FeaturesDetailsTwo() {
  return (
    <section id="features" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 lg:mb-12">
          <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-3 lg:mb-6 sm:text-6xl">
            Powerful Features for Everyone
          </h3>
          <p className="text-slate-600 text-md lg:text-xl max-w-2xl mx-auto">
            Our Instagram downloader is packed with features that make downloading content simple and efficient
          </p>
        </div>

        <div className="max-w-6xl mx-auto p-6">


          {/* First Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md flex flex-col md:flex-row items-center mb-8">
            <div className="flex-1 p-6 py-10 ">
              <h2 className="text-4xl text-center lg:text-left font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2">Unlimited Downloads</h2>
              <p className="text-gray-600 text-center lg:text-left text-md  lg:text-lg  mt-4">
                Download as many Instagram videos, reels, and photos as you like without worrying about limits or restrictions. Whether you want to save a single post or an entire collection, the tool lets you keep everything you need with complete freedom, anytime you choose.
              </p>
            </div>
            <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-xl flex justify-center items-center p-4">
              <Image
                src="/assets/unlimited-download.png" 
                alt="Save video"
                width={250}
                height={150}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md hidden lg:flex flex-col md:flex-row items-center   mb-8">
            <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-l-xl flex justify-center items-center p-4">
              <Image
                    src="/assets/high-quality.png" 
                alt="Video Downloader"
                width={250}
                height={150}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1 p-6">
              <h2 className="text-4xl text-center lg:text-left font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2">
                High Quality Downloads
              </h2>
              <p className="text-gray-600 text-center lg:text-left  text-lg  mt-4">
                Every file you download is provided in the highest quality available, including HD and even 4K when supported. This ensures that your saved content looks sharp and professional, exactly as it appeared when first uploaded on Instagram.
              </p>
            </div>
          </div>


          {/* 3rd Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md flex flex-col md:flex-row items-center mb-8">
            <div className="flex-1 p-6 py-10 ">
              <h2 className="text-4xl text-center lg:text-left font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2">Private & Secure</h2>
              <p className="text-gray-600 text-md  text-center lg:text-left lg:text-lg  mt-4">
              Your privacy always comes first. We never store your files, collect personal data, or track your download history. Everything you save stays completely secure on your own device, giving you peace of mind with every download.
              </p>
            </div>
            <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-xl flex justify-center items-center p-4">
              <Image
                  src="/assets/private-secure.png" 
                alt="Save video"
                width={250}
                height={150}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
