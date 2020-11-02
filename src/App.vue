<template>
  <div id="app" class="app">

    <main-header/>
    <router-view/>
    <main-footer/>

  </div>
</template>

<script>
import mainHeader from "@/components/mainHeader";
import mainFooter from "@/components/mainFooter";

export default {
  name: 'App',
  components: {mainHeader, mainFooter}
}
</script>
