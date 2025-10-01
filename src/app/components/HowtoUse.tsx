import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Download, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation';









export default function HowtoUse({ content, activeTab }: { content: any, activeTab: string }) {

  const pathname = usePathname();


  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-3 lg:mb-6 sm:text-6xl">
            How to download Instagram {pathname == "/" ? 'videos' : pathname?.split('/')[1]}?
          </h1>
          <p className="text-md lg:text-xl text-slate-600 max-w-2xl mx-auto">
            See below the three easy steps to use this Instagram picture downloader. It saves time and energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="relative overflow-hidden border-2 py-6 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Copy the URL
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-lg p-6 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-orange-200 transition-colors duration-300">
                <div className="bg-white rounded-md p-3 mb-4 shadow-sm border border-slate-200">
                  <code className="text-sm text-slate-700 font-mono">instagram.com/p/CmcRCI...</code>
                </div>
                <Link2 className="w-12 h-12 mx-auto text-purple-600" strokeWidth={1.5} />
              </div>
              <CardDescription className="text-base text-slate-600 leading-relaxed">
                Open a post on where there is your favorite Instagram picture and copy the link.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2  py-6 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Paste the link
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-lg p-6 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-orange-200 transition-colors duration-300">
                <div className="bg-white rounded-md p-3 mb-4 shadow-sm border border-slate-200 flex items-center justify-between">
                  <code className="text-sm text-slate-700 font-mono">instagram.com/p/C...</code>
                  <Copy className="w-4 h-4 text-slate-400" />
                </div>
                <Copy className="w-12 h-12 mx-auto text-pink-600" strokeWidth={1.5} />
              </div>
              <CardDescription className="text-base text-slate-600 leading-relaxed">
                Paste the link to the input line on the Instagram image downloader page. Remember to have the FastDl web page already opened.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 py-6 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Download
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-lg p-6 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-orange-200 transition-colors duration-300">
                <Button className="mb-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white shadow-lg">
                  Download
                </Button>
                <Download className="w-12 h-12 mx-auto text-orange-600" strokeWidth={1.5} />
              </div>
              <CardDescription className="text-base text-slate-600 leading-relaxed">
                Click the Download button to save the file to your device. Download what fits your needs.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
