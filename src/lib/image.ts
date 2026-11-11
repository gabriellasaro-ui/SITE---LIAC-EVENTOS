import type { Photo } from '@/content/photos'

/**
 * Props de blur para o next/image com `fill`: mostra a miniatura borrada da foto enquanto ela carrega.
 * O `objectFit` vai no style (além da classe) porque o Next usa esse valor para enquadrar o blur.
 */
export function blurProps(photo: Pick<Photo, 'blurDataURL'>, fit: 'cover' | 'contain' = 'cover') {
  return { placeholder: 'blur', blurDataURL: photo.blurDataURL, style: { objectFit: fit } } as const
}
