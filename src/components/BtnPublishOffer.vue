<script setup>

</script>

<template>

    <button>
          <font-awesome-icon :icon="['far', 'plus-square']" />
          Déposer un annonce
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