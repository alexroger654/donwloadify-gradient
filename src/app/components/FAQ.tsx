import React from 'react'

export default function Faq() {
  return (
    <section id="faq" className="py-16 px-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-5xl font-bold text-white  sm:text-6xl mb-4 lg:mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-white/90 text-md lg:text-xl">
              Find answers to common questions about our Instagram downloader
            </p>
          </div>

          <div className="space-y-4">
            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-lg lg:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-between hover:bg-purple-50 transition">
                <span>Is it free to download Instagram content?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-md font-semibold ">
                Yes, FastDL is completely free to use. You can download unlimited Instagram videos, photos, reels, and stories without any charges or subscription fees.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-lg lg:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-between hover:bg-purple-50 transition">
                <span>Do I need to install any software?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-md font-semibold">
                No installation required! FastDL is a web-based tool that works directly in your browser. Simply paste the Instagram link and download instantly.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-lg lg:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-between hover:bg-purple-50 transition">
                <span>Can I download private Instagram posts?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-md font-semibold">
                No, you can only download content from public Instagram accounts. Private accounts require you to be a follower and have permission to view their content.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-lg lg:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-between hover:bg-purple-50 transition">
                <span>What quality will the downloaded content be?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-md font-semibold">
                We download content in the highest quality available from Instagram. This includes HD videos, full-resolution photos, and original quality for all media types.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-lg lg:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-between hover:bg-purple-50 transition">
                <span>Is it safe to use this downloader?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-md font-semibold">
                Absolutely! FastDL is 100% safe and secure. We don't store your data, require login information, or install any malware. Your privacy and security are our top priorities.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-lg lg:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-between hover:bg-purple-50 transition">
                <span>Can I download multiple photos from a carousel post?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-md font-semibold">
                Yes! When you use the Carousel tab and paste a carousel post link, you'll be able to download all images and videos from that post in one go.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-lg lg:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-between hover:bg-purple-50 transition">
                <span>Does Instagram know when I download something?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-md font-semibold">
                No, Instagram doesn't notify content creators when someone downloads their content using third-party tools like FastDL. Your downloads are completely anonymous.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-lg lg:text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-between hover:bg-purple-50 transition">
                <span>Why isn't my download working?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-md font-semibold">
                Make sure you're using the correct Instagram URL, the account is public, and you have a stable internet connection. If issues persist, try clearing your browser cache or using a different browser.
              </div>
            </details>
          </div>
        </div>
      </section>

  )
}
