<template>
  <div id="app">
    <h1 style="color: blue; text-decoration: underline"><a href="/">Reve Interview System</a></h1>
    <br>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ShowInterview from './components/Interview/ShowInterview.vue';

@Component({
  components: {
    HelloWorld: ShowInterview
  },
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
