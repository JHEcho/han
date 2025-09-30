'use client'

import { useEffect, useState } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  className?: string
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto',
  className = ''
}: AdSenseProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    try {
      // AdSense 스크립트가 로드되었는지 확인
      if ((window as any).adsbygoogle) {
        // AdSense 초기화
        ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [isClient])

  // 서버 사이드에서는 플레이스홀더만 렌더링
  if (!isClient) {
    return (
      <div className={className}>
        <div 
          style={{ minHeight: '250px' }}
          className="flex items-center justify-center bg-gray-50 rounded-lg"
        >
          <span className="text-gray-400 text-sm">Loading ad...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4011742299641178"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}
