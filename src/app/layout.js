// app/layout.tsx
import { Suspense } from 'react';

async function DailyBackground() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/generate-daily-background`, { 
      // next: { revalidate: 86400 } // 24 hours
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch daily background');
    }
    
    const { imageUrl } = await res.json();
    
    return { imageUrl };
  } catch (error) {
    console.error('Background fetch error:', error);
    return { imageUrl: null };
  }
}

export default async function RootLayout({ children }) {
  const { imageUrl } = await DailyBackground();

  return (
    <html lang="en">
      <body 
        style={{ 
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          backgroundColor: imageUrl ? 'black' : 'white' // Fallback background color
        }}
      >
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}