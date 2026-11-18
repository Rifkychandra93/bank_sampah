import logoImg from '../../assets/logo.png';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  alt?: string;
  hideText?: boolean;
  subtitle?: string;
}

export function Logo({
  className = '',
  imgClassName = 'h-8 sm:h-9 w-auto',
  alt = 'Bank Sampah EcoTrust',
  hideText = false,
  subtitle
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={logoImg}
        alt={alt}
        className={`object-contain shrink-0 ${imgClassName}`}
        loading="eager"
        decoding="async"
      />
      {!hideText && (
        <div className="flex flex-col text-left leading-none">
          <span className="font-black text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
            Bank Sampah
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
              EcoTrust
            </span>
            {subtitle && (
              <>
                <span className="text-[9px] text-slate-400 dark:text-slate-500">•</span>
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {subtitle}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;
