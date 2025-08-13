'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error('Error boundary caught:', error)
  }, [error])

  const getErrorMessage = () => {
    if (error.message.includes('404')) {
      return "The page you're looking for doesn't exist."
    }
    if (error.message.includes('401') || error.message.includes('403')) {
      return "You don't have permission to view this page."
    }
    if (error.message.includes('500')) {
      return 'Our servers are having some trouble. Please try again later.'
    }
    return 'Something went wrong. Please try again.'
  }

  const getErrorAction = () => {
    if (error.message.includes('401')) {
      return (
        <button
          onClick={() => router.push('/login')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login to continue
        </button>
      )
    }
    if (error.message.includes('404')) {
      return (
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
      )
    }
    return (
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">{getErrorMessage()}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {getErrorAction()}
          <Link
            href="/contact"
            className="mt-4 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
          >
            Contact Support
          </Link>
        </div>

        {/* Development error details - only shown in dev mode */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer">
              Error Details
            </summary>
            <div className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
              <p className="font-mono text-red-600">{error.message}</p>
              {error.digest && (
                <p className="mt-2 font-mono text-gray-700">
                  Digest: {error.digest}
                </p>
              )}
              <p className="mt-2 font-mono text-gray-700">
                {error.stack}
              </p>
            </div>
          </details>
        )}
      </div>
    </div>
  )
}