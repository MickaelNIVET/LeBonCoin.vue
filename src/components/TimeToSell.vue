<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue';
</script>

<template>
    <div class="bloc">
        <img src="../assets/onde-corail.svg" alt="onde-corail" class="corail">

        <div class="content">
            <p>C'est le moment de vendre</p>
            <BtnPublishOffer />
        </div>

        <img src="../assets/feuille-bleue.svg" alt="feuille-bleue" class="bleue">

    </div>
</template>

<style scoped>
.bloc {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    border-radius: 12px;
    background-color: var(--beige);
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
}

@media (max-width: 768px) {
    .bloc {
        justify-content: center;
        padding: 0 10px;
    }
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 20px;
    z-index: 5;
}

@media (max-width: 900px) {
    .content {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }
}

p {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 1; /* Force font center */
    white-space: nowrap;
}

img.corail {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: auto;
    max-width: 200px;
    object-fit: cover; /* Change from contain to cover to eliminate small gaps */
    z-index: 1;
    pointer-events: none;
    display: block; /* Remove baseline gaps */
}

img.bleue {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: auto;
    max-width: 250px;
    object-fit: cover;
    z-index: 1;
    pointer-events: none;
    display: block;
}

@media (max-width: 768px) {
    img {
        display: none;
    }
}
</style>