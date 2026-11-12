export type Color = 'yellow' | 'white' | 'blue-dark' | 'blue-medium';

// Elke kleur bevat zijn eigen tekstkleur en onderrand
export const colors: Record<Color, string> = {
  yellow:
    'bg-yellow text-blue-dark shadow-[0_4px_0_0_var(--color-yellow-shadow)]',
  white: 'bg-white text-blue-dark shadow-[0_4px_0_0_var(--color-grey-light)]',
  'blue-dark':
    'bg-blue-dark text-white shadow-[0_4px_0_0_var(--color-darkest-blue)]',
  'blue-medium':
    'bg-blue-medium text-white shadow-[0_4px_0_0_var(--color-blue-dark)]',
};
