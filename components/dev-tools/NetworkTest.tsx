'use client'

import { useState } from 'react'

export default function NetworkTest() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testDirectAPI = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const url = 'https://mhagshobzzmhejpfyact.supabase.co/rest/v1/hangeul?select=*&limit=1'
      const headers = {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWdzaG9ienptaGVqcGZ5YWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODY1ODEsImV4cCI6MjA3MzU2MjU4MX0.HaeZKJL4ADSqibrLosRC7TA1FVZGJYiHjTP_xLKUc1w',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWdzaG9ienptaGVqcGZ5YWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODY1ODEsImV4cCI6MjA3MzU2MjU4MX0.HaeZKJL4ADSqibrLosRC7TA1FVZGJYiHjTP_xLKUc1w'
      }

      console.log('Testing direct API call...')
      const response = await fetch(url, { headers })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setResult(`✅ Direct API 성공! 데이터: ${JSON.stringify(data)}`)
      console.log('Direct API success:', data)
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      setResult(`❌ Direct API 실패: ${errorMsg}`)
      console.error('Direct API error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-4">
      <h3 className="text-xl font-bold mb-4">직접 API 테스트</h3>
      
      <button
        onClick={testDirectAPI}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? '테스트 중...' : '직접 API 호출'}
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
}
