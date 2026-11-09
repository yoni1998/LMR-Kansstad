import Image, { type ImageProps } from 'next/image';

type AvatarProps = {
  src: ImageProps['src'];
  alt: string;
  className?: string;
  eager?: boolean;
};

export function Avatar({
  src,
  alt,
  className = '',
  eager = false,
}: AvatarProps) {
  return (
    <div
      className={`shadow-raised relative aspect-square w-30 overflow-hidden rounded-full bg-white ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="120px"
        className="object-cover"
        loading={eager ? 'eager' : 'lazy'}
      />
    </div>
  );
}
