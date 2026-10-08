import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <img
          src="https://ik.imagekit.io/lics6cm47/blanco-modified.png?updatedAt=1765489941274"
          alt="Deyconic Logo"
          width="32"
          height="32"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}