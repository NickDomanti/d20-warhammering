export default defineAppConfig({
  ui: {
    card: {
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
      ],
    },
  },
});
