export default defineAppConfig({
  ui: {
    card: {
      variants: {
        variant: {
          primary: { root: 'bg-primary text-white' },
          secondary: { root: 'bg-secondary text-white' },
        },
      },
      slots: {
        body: '!p-4',
      },
    },
    button: {
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'text-white',
        },
        {
          color: 'secondary',
          variant: 'solid',
          class: 'text-white',
        },
        {
          color: 'dark',
          variant: 'solid',
          class: 'text-white',
        },
        {
          color: 'night',
          variant: 'solid',
          class: 'text-white',
        },
      ],
    },
    badge: {
      compoundVariants: [
        {
          color: 'primary',
          class: 'text-white',
        },
        {
          color: 'secondary',
          class: 'text-white',
        },
        {
          color: 'dark',
          class: 'text-white',
        },
        {
          color: 'night',
          class: 'text-white',
        },
      ],
    },
  },
});
