export type Color = 'yellow' | 'white' | 'blue-dark' | 'blue-medium';

// Elke kleur bevat zijn eigen tekstkleur en onderrand
export const colors: Record<Color, string> = {
  yellow: 'bg-yellow text-blue-dark [--edge:var(--color-yellow-shadow)]',
  white: 'bg-white text-blue-dark [--edge:var(--color-grey-light)]',
  'blue-dark': 'bg-blue-dark text-white [--edge:var(--color-darkest-blue)]',
  'blue-medium': 'bg-blue-medium text-white [--edge:var(--color-blue-dark)]',
};
