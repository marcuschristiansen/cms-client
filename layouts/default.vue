<template>
  <div>
    <top-nav></top-nav> 
    <nuxt/>
  </div>
</template>

<script>
import TopNav from '~/components/nav/TopNav'

export default {
  middleware: ['init', 'guest'],
  components: {
    TopNav
  }
}
</script>
