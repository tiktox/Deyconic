import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{ width, height }}
      >
        <span className="text-gray-500">Error loading image</span>
      </div>
    );
  }

  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      className={`${className} ${isLoading ? 'animate-pulse' : ''}`}
      loading={priority ? 'eager' : 'lazy'}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      threshold={200}
      placeholderSrc={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`}
    />
  );
};

export default OptimizedImage;