export type ColorVariant =
  'primary' | 'secondary' | 'blue-dark' | 'blue-medium';

// Elke kleur bevat zijn eigen tekstkleur en onderrand
export const colorsVariants: Record<ColorVariant, string> = {
  primary:
    'bg-primary-yellow text-primary-blue-dark [--edge:var(--color-secondary-yellow)]',
  secondary:
    'bg-primary-white text-primary-blue-dark [--edge:var(--color-primary-grey-light)]',
  'blue-dark':
    'bg-primary-blue-dark text-primary-white [--edge:var(--color-darkest-blue)]',
  'blue-medium':
    'bg-primary-blue-medium text-primary-white [--edge:var(--color-primary-blue-dark)]',
};
