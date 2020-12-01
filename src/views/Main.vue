<template>
  <div>
    <h2>Main {{ $route.params.color }}</h2>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$route.params.color) {
      this.$router.push("/red");
    }
  },
};
</script>