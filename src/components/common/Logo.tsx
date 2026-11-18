import logoImg from '../../assets/logo.png';

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className = 'h-8 sm:h-9 w-auto', alt = 'EcoTrust' }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt={alt}
      className={`object-contain select-none ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}

export default Logo;
