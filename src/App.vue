<template>
  <div id="app">
    <Plantt msg="Zazer" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Plantt from './components/Plantt.vue';

@Component({
    components: { Plantt },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
    font-family: sans-serif;
    color: #2c3e50;
}
</style>
