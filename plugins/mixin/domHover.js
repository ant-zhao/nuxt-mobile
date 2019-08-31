const domHover = {
  computed: {
    $uploadUrl() {}
  },
  methods: {
    $domHover(ref, className) {
      className.split(';').forEach(item => {
        if (this.$refs[ref] && this.$refs[ref].classList) {
          this.$refs[ref].classList.add(item)
        }
      })
    },
    $domRemoveClass(ref, className) {
      className.split(';').forEach(item => {
        if (this.$refs[ref] && this.$refs[ref].classList) {
          this.$refs[ref].classList.remove(item)
        }
      })
    }
  }
}

export default domHover
