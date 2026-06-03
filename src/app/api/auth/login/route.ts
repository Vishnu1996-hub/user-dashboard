import { NextRequest, NextResponse } from 'next/server'
import { MOCK_CREDENTIALS, MOCK_USERS } from '@/lib/data/users'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Check against mock credentials
    const match = MOCK_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    )

    if (!match) {
      return NextResponse.json(
        { error: 'Invalid email or password. Try alice@example.com / password123' },
        { status: 401 }
      )
    }

    // Get user data
    const user = MOCK_USERS.find((u) => u.id === match.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Mock JWT token (in production, sign a real JWT)
    const mockToken = `mock-jwt-token-${user.id}-${Date.now()}`

    return NextResponse.json(
      {
        success: true,
        data: {
          user,
          token: mockToken,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
