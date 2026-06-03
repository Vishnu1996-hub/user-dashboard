import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Simulate logout processing (e.g., invalidate token, update audit logs, etc.)
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Clear auth token from cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
      },
      { status: 200 }
    )

    // Clear the auth token cookie
    response.cookies.set('auth-token', '', {
      path: '/',
      maxAge: 0,
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
