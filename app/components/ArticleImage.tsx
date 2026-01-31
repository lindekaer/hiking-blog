import Image from "next/image";

interface ArticleImageProps {
  src: string;
  description: string;
}

export default function ArticleImage({ src, description }: ArticleImageProps) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={description}
        width={720}
        height={540}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 66vw"
      />
      <figcaption className="mt-4 text-sm text-gray-600 text-center">
        {description}
      </figcaption>
    </figure>
  );
}
