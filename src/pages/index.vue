<script setup lang="ts">
definePage({
  meta: {
    constant: true,
    hideInMenu: true,
  },
  redirect: import.meta.env.VITE_ROUTE_HOME || '/home',
})
</script>
