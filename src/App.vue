<template>
  <div id="app">
    <h1>Traffic Light Emulator</h1>
    <h3 class="timer">{{ timer }}</h3>
    <div class="lights">
      <div
        v-for="light in lights"
        :key="light.url"
        class="light"
        :class="`${light.color} ${light.active ? 'active' : ''}`"
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
      { color: "red", url: "/red", duration: 10, active: false },
      { color: "yellow", url: "/yellow", duration: 3, active: false },
      { color: "green", url: "/green", duration: 15, active: false },
    ];
    setTimeout(() => {
      if (!this.$route.params.color) {
        this.$router.push("/red");
        this.activeLight = 0;
        this.lights[this.activeLight].active = true
      }

      this.lights.forEach((item, index) => {
        if (this.$route.path === item.url) {
          this.activeLight = index
          this.lights[this.activeLight].active = true
        }
      });

      let counter = 0;

      this.timeout = setInterval(() => {
        this.timer = this.lights[this.activeLight].duration - counter;
        counter += 1;

        if(this.timer <= 3) {
          if(this.timer % 2 === 0) this.lights[this.activeLight].active = false
          else this.lights[this.activeLight].active = true
        }

        if (this.lights[this.activeLight].duration < counter) {
          this.activeLight >= 2 ? (this.activeLight = 0) : this.activeLight++;
          this.lights.forEach( light => light.active = false )
          this.lights[this.activeLight].active = true
          this.$router.push(this.lights[this.activeLight].url);
          counter = 1;
          this.timer = this.lights[this.activeLight].duration
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
  background-color: rgb(59, 56, 56);
  color: rgb(255, 255, 255);
}
* {
  box-sizing: border-box;
}
#app {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
.timer {
  font-size: 35px;
  margin: 10px 0;
}

.lights {
  width: 130px;
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


