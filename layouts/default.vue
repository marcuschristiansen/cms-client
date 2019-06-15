<template>
    <top-nav></top-nav> 
</template>

<script>
import TopNav from '~/components/nav/TopNav'

export default {
  middleware: ['init'],
  components: {
    TopNav
  }
}
</script>
