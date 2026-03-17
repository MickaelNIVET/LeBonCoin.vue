<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue';
</script>

<template>
    <div class="bloc">
        <img src="../assets/onde-corail.svg" alt="onde-corail">

        <div>
            <p>C'est le moment de vendre</p>
            <BtnPublishOffer />
        </div>

        <img src="../assets/feuille-bleue.svg" alt="feuille-bleue">

    </div>
</template>

<style scoped>
.bloc {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 20px;
    background-color: var(--beige);
    margin-bottom: 30px;

}

.bloc>div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

p {
    font-size: 20px;
    font-weight: bold;
}

img {
    border-radius: 20px;
}
</style>