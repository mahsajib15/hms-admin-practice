import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/rooms`;
    console.log('Proxy route - API URL:', apiUrl);
    console.log('Proxy route - Environment variables:', {
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
    });
    
    // Log headers for debugging
    const headers = {
      'Content-Type': 'application/json',
      ...(request.headers.get('authorization') 
        ? { 'Authorization': request.headers.get('authorization') } 
        : {})
    };
    console.log('Proxy route - Request headers:', headers);
    
    const response = await fetch(apiUrl, {
      headers,
      cache: 'no-store'
    });
    
    console.log('Proxy route - Response status:', response.status);
    
    const data = await response.json();
    console.log('Proxy route - Response data:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from API', details: error.message },
      { status: 500 }
    );
  }
}