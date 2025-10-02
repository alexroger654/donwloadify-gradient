

import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function FeaturesDetailsTwo() {
  const features = [
    {
      title: "Instagram Video Downloader",
      description: "Download unlimited Instagram videos without any restrictions. Whether it’s a short clip or a long post, this tool helps you save your favorite content quickly and in the highest quality, ready to watch anytime you want.",
      image_url: "/assets/video.png",
      layout: "image_last",
      id: "video"
    },
    {
      title: "Instagram Photo Downloader",
      description: "Save as many Instagram photos as you like with no limits or hidden barriers. From single images to full collections, this tool makes it easy to keep your favorite memories safely stored on your device forever.",
      image_url: "/assets/photo.png",
      layout: "image_first",
      id: "photo"
    },
    {
      title: "Instagram Carousel Downloader",
      description: "Easily download complete Instagram carousel posts containing multiple photos and videos. This tool lets you grab entire collections at once, so you never miss a single piece of content you love.",
      image_url: "/assets/carosel.png",
      layout: "image_last",
      id: "carousel"
    },
    {
      title: "Instagram IGTV Downloader",
      description: "Download IGTV videos from Instagram without restrictions or quality loss. Whether you’re saving tutorials, shows, or long-form clips, this tool ensures you keep everything accessible for offline viewing anytime.",
      image_url: "/assets/igtv.png",
      layout: "image_first",
      id: "igtv"
    },
    {
      title: "Instagram Reels Downloader",
      description: "Download Instagram Reels instantly and in high definition with no limits. From trending short clips to creative content, this tool lets you save and enjoy videos whenever and wherever you like.",
      image_url: "/assets/reels.png",
      layout: "image_last",
      id: "reels"
    }
  ];


  const pathname = usePathname();


  const getFeatures = () => {
    if (pathname === "/") {
      return features;
    } else {
      return features
      .filter((feature) => feature.id === pathname.replace("/", ""))
      .map((feature) => ({
        ...feature,
        // Force one layout when not homepage (for example always text first, image last)
        layout: "image_last"
      }));
    }
  };






  // =================================

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
          {  getFeatures().map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md flex flex-col md:flex-row items-center mb-8 ${feature.layout === "image_first" ? "lg:flex-row-reverse" : ""
                }`}
            >
              {/* Text Block */}
              <div className="flex-1 p-6 py-10">
                <h2 className="text-4xl text-center lg:text-left font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2">
                  {feature.title}
                </h2>
                <p className="text-gray-600 text-center lg:text-left text-md lg:text-lg mt-4">
                  {feature.description}
                </p>
              </div>

              {/* Image Block */}
              <div className={`flex-1 bg-gradient-to-r from-purple-500 to-pink-500 ${feature.layout === "image_first" ? "rounded-l-xl" : "rounded-r-xl"
                } flex justify-center items-center p-4`}>
                <Image
                  src={feature.image_url}
                  alt={feature.title}
                  width={250}
                  height={150}
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}

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


        </div>
      </div>
    </section>
  );
}

