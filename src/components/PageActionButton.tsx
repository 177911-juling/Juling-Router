import type { ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';

export function PageActionButton({
  icon: Icon,
  spinning = false,
  children,
  className = '',
  ...props
}: ComponentProps<'button'> & { icon?: LucideIcon; spinning?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      className={`flex h-9 shrink-0 items-center justify-center text-sm text-cyber-text-secondary transition-colors enabled:hover:bg-cyber-elevated/60 enabled:hover:text-cyber-text disabled:text-cyber-text-muted disabled:opacity-50 outline-none ${children ? 'gap-1.5 px-2.5' : 'w-9'} ${className}`}
    >
      {Icon && (
        <Icon
          size={16}
          className={`shrink-0 ${spinning ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
