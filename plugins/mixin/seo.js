const seo = {
  computed: {},
  methods: {
    $initHead(title, description, keywords) {
      return {
        title: title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: description.slice(0, 100)
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: keywords
          }
        ]
      };
    }
  }
};
export default seo;
