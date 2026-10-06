import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Automatically picks up UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN
const redis = Redis.fromEnv();
const PROJECTS_KEY = 'portfolio_projects';

export async function GET() {
  try {
    const data = await redis.get(PROJECTS_KEY);
    // Fallback to empty array if no data has been saved yet
    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Save the updated array/object directly to Redis
    await redis.set(PROJECTS_KEY, body);

    return NextResponse.json({ success: true, message: 'Saved successfully' });
  } catch (error) {
    console.error('Error saving projects:', error);
    return NextResponse.json({ error: 'Failed to save projects' }, { status: 500 });
  }
}