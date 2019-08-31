const pageJump = {
  computed: {},
  methods: {
    $jumpLink(link, type = '') {
      if (!link || !process.browser) {
        return;
      }
      if (type == 'open') {
        window.open(link);
      } else {
        window.location.href = link;
      }
    }
  }
};
export default pageJump;
