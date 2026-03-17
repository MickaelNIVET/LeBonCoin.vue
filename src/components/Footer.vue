<script setup>

</script>

<template>
    <footer>
        <p class="container">
            Made by <a href="https://www.lereacteur.io/"> Le Reacteur </a>
            with
            <a href="https://vuejs.org/"> Vue.js</a>
        </p>
    </footer>
</template>

<style scoped>
footer {
    height: 80px;
    background-color: var(--input-grey);
}

p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 16px;
    gap: 6px;
}

a {
    font-weight: bold;
}
</style>