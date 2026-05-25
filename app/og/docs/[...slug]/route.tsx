import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ogImagePath } from '@/lib/shared';

export const revalidate = false;

export async function GET() {
  const imagePath = path.join(process.cwd(), 'public', ogImagePath.slice(1));
  const imageBuffer = await readFile(imagePath);

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
