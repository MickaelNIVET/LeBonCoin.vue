<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>

  <button>
    <RouterLink :to="{ name: 'publish' }">
      <font-awesome-icon :icon="['far', 'plus-square']" />
      Déposer une annonce
    </RouterLink>
  </button>
</template>

<style scoped>
button {
  background-color: var(--btn-color);
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
</style>