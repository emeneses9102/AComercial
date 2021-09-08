<template>
  <div class="d-flex flex-column ml-75 navbar__datetime">
    <span>{{ date }}</span>
    <span class="navbar__time">{{ time }}</span>
  </div>
</template>

<script>
export default {
  name: 'DateTime',
  data() {
    return {
      interval: null,
      date: null,
      time: null,
    }
  },
  created() {
    this.interval = setInterval(() => {
      const objDate = new Date()
      this.date = objDate.toLocaleDateString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        formatMatcher: 'best fit',
      })
      this.time = objDate.toLocaleTimeString([], {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
      })
    })
  },
  destroyed() {
    clearInterval(this.interval)
  },
}
</script>

<style lang="scss">
.navbar__datetime {
  font-family: 'Courier New', Courier, monospace;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.navbar__time {
  font-size: 1.5rem;
}
</style>
