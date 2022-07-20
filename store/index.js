export const state = () => ({
  projects: {
    '29aa939b-2a8f-408c-8517-4984f2e4ba31': {
      title: 'Project Eco',
      people: { status: 'Group Project', icon: 'groups' },
      type: {status: 'Website', icon:'web'},
      image: 'projecteco.png',
      longdescription:
        '### This is markdown about project eco\\ cool, eh; \\ it was a complete failure.',
      timeframedescriptor: 'December 2021 or sth',
      longimages: ['projecteco1.jpg', 'projecteco2.jpg', 'projecteco3.jpg'],
    },
    'becb58f5-f1b3-4af5-9c7c-87dc208793ba': {
      title: 'Sheels Banding',
      people: { status: 'Commercial Project', icon: 'work' },
      type: {status: 'App', icon:'smartphone'},
      image: 'sheelsbanding.png',
      longdescription:
        `
        #### This is markdown about Sheels
        
        I worked on the Sheels App from thistime to thattime.
        It is based on react native
        it uses aws with laravel
        
        
        `,
      timeframedescriptor: 'jan 2021 or sth',
      longimages: ['projecteco1.jpg', 'projecteco2.jpg', 'projecteco3.jpg'],
    },
  },
})
