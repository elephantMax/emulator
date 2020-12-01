<template>
  <div id="app">
    <h1>Traffic Light Emulator</h1>
    <h3>Time Left: {{ timer }}</h3>
    <div class="lights">
      <div
        v-for="light in lights"
        :key="light.url"
        class="light"
        :class="`${light.color} ${light.url === $route.path ? 'active' : ''}`"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    lights: [],
    activeLight: 0,
    timer: 0,
    timeout: null,
  }),
  mounted() {
    this.lights = [
      { color: "red", url: "/red", duration: 10 },
      { color: "yellow", url: "/yellow", duration: 3 },
      { color: "green", url: "/green", duration: 15 },
    ];
    setTimeout(() => {
      this.lights.forEach((item, index) => {
        if (this.$route.path === item.url) this.activeLight = index
      });
      let counter = 0;
      this.timeout = setInterval(() => {
        this.timer = this.lights[this.activeLight].duration - counter;
        counter += 1;
        if (this.lights[this.activeLight].duration < counter) {
          this.activeLight >= 2 ? (this.activeLight = 0) : this.activeLight++;
          this.$router.push(this.lights[this.activeLight].url);
          counter = 0;
        }
      }, 1000);
    }, 50);
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}
* {
  box-sizing: border-box;
}
.lights {
  width: 120px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(30, 30, 31);
  padding: 20px;
}
.light {
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.5;
}
.red {
  background-color: red;
  box-shadow: 1px 1px 20px red;
}
.yellow {
  background-color: yellow;
  box-shadow: 1px 1px 20px yellow;
}
.green {
  background-color: rgb(3, 192, 3);
  box-shadow: 1px 1px 20px rgb(1, 200, 1);
}
.active {
  opacity: 1;
}
</style>


