import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export function CachedImage({ src, className = '', ...props }: CachedImageProps) {
  const { getCachedImage, cacheImage } = useStore();
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      setIsLoading(true);
      
      // Check if image is in cache
      const cachedImage = getCachedImage(src);
      if (cachedImage && isMounted) {
        setImageSrc(cachedImage);
        setIsLoading(false);
        return;
      }

      try {
        // Create a new image object to preload
        const img = new Image();
        
        // Fetch the image
        const response = await fetch(src);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        // Preload the image before showing it
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = objectUrl;
        });
        
        if (isMounted) {
          // Cache the image
          cacheImage(src, objectUrl);
          setImageSrc(objectUrl);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        if (isMounted) {
          setImageSrc(src); // Fallback to original source
          setIsLoading(false);
        }
      }
    };

    loadImage();
    
    return () => {
      isMounted = false;
    };
  }, [src, getCachedImage, cacheImage]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        {...props}
        src={imageSrc || src}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
} 