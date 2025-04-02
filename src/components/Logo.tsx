import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex justify-center pt-8">
      <Image
        src="/images/logo.png"
        alt="1102 Architecture Logo"
        width={200}
        height={100}
        className="h-auto w-auto"
      />
    </div>
  );
} 