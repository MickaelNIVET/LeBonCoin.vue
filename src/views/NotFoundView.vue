<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <main>
        <div class="container">
            <div>
                <h1>404</h1>

                <p>Perdu dans les </p>
                <p>RAYONS !</p>
            </div>
            <p>Désolé, on a cherché dans tous les coins, on n'a pas trouvé la bonne page</p>

            <router-link :to="{ name: 'home' }"> <font-awesome-icon :icon="['fas', 'arrow-left']" /> Retour à
                l'accueil</router-link>
        </div>

    </main>
</template>

<style scoped>
.container {
    height: calc(100vh - 110px - 80px);
    background-image: url(../assets/notfound.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 100px;
}

h1 {
    font-size: 48px;
    font-weight: bold;
    color: var(--btn-color);
    margin-bottom: 20px;
}

h1+p {
    font-size: 48px;
    font-weight: bold;
    color: var(--text-color);
}

h1+p+p {
    font-size: 62px;
    text-shadow: 0px 0px 4px var(--btn-color);
    color: white;

}
</style>