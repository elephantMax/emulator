<template>
  <div id="app">
    <h1>Traffic Light Emulator</h1>
    <h3 class="timer">{{ timer }}</h3>
    <div class="lights">
      <Light v-for="light in lights" :key="light.url" :light="light" />
    </div>
  </div>
</template>

<script>
import Light from "@/components/Light";

export default {
  name: "App",
  components: { Light },
  data: () => ({
    lights: [
      { color: "red", url: "/red", duration: 10, active: false },
      { color: "yellow", url: "/yellow", duration: 3, active: false },
      { color: "green", url: "/green", duration: 15, active: false },
    ],
    direction: JSON.parse(localStorage.getItem("status")).direction,
    activeLight: 0,
    timer: JSON.parse(localStorage.getItem("status")).timer,
    color: JSON.parse(localStorage.getItem("status")).color,
  }),
  mounted() {
    setTimeout(() => {
      //no params case
      if (!this.$route.params.color) {
        this.$router.push("/red");
        this.activeLight = 0;
        this.lights[this.activeLight].active = true;
        this.timer = this.lights[this.activeLight].duration
        this.direction = "bottom";
      }
      else{
        const availableColors =  ['red', 'yellow', 'green'];
        if(!availableColors.includes(this.$route.params.color)) this.$router.push('/red')
      }
      //set data
      this.lights.forEach((item, index) => {
        if (this.$route.path === item.url) {
          this.activeLight = index;
          this.lights[this.activeLight].active = true;
          !this.timer
            ? (this.timer = this.lights[this.activeLight].duration)
            : (this.timer = this.timer);
          if (this.color !== this.lights[this.activeLight].color) {
            this.timer = this.lights[this.activeLight].duration;
            this.color = this.lights[this.activeLight].color;
          }
        }
      });
      this.timeout = setInterval(() => {
        this.timer--;
        if (this.timer <= 3) {
          if (this.timer % 2 === 0)
            this.lights[this.activeLight].active = false;
          else this.lights[this.activeLight].active = true;
        }

        if (this.timer < 0) {
          if (this.direction === "bottom") {
            if (this.activeLight >= 2) {
              this.direction = "top";
              this.activeLight -= 1;
            } else this.activeLight += 1;
          } else {
            if (this.activeLight === 0) {
              this.direction = "bottom";
              this.activeLight += 1;
            } else this.activeLight--;
          }
          this.lights.forEach((light) => (light.active = false));
          this.lights[this.activeLight].active = true;
          this.$router.push(this.lights[this.activeLight].url);
          this.timer = this.lights[this.activeLight].duration;
          this.color = this.lights[this.activeLight].color;
        }
        localStorage.setItem(
          "status",
          JSON.stringify({
            color: this.color,
            timer: this.timer,
            direction: this.direction,
          })
        )
      }, 1000);
    }, 50);
  },
  beforeDestroy() {
    this.timer = null;
  }
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
  font-size: 55px;
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
</style>


