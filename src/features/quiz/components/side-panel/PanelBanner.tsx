import type { ReactNode } from 'react';
import Image, { type ImageProps } from 'next/image';

import { Avatar } from '@/components/Avatar';

type PanelBannerProps = {
  bannerSrc: ImageProps['src'];
  avatarSrc: ImageProps['src'];
  children: ReactNode;
};

export function PanelBanner({
  bannerSrc,
  avatarSrc,
  children,
}: PanelBannerProps) {
  return (
    <div className="relative">
      <div className="relative h-44 overflow-hidden rounded-t-lg">
        <Image
          src={bannerSrc}
          alt=""
          loading="eager"
          fill
          sizes="340px"
          className="object-cover"
        />
        <div className="bg-blue-dark/50 absolute inset-0" />
        <div className="relative flex gap-2 p-2">{children}</div>
      </div>
      <div className="absolute top-18 left-1/2 -translate-x-1/2">
        <Avatar src={avatarSrc} />
      </div>
    </div>
  );
}
