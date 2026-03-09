<script setup>

import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { useCycleList } from '@vueuse/core'

const props = defineProps({
    id: String,
})

const formatDate = computed(() => {
    return offerInfos.value.attributes.publishedAt.split('T')[0].split('-').reverse().join('/');
})

const cycleList = computed(() => {
    if (offerInfos.value.attributes.pictures.data) {
        const { state, next, prev } = useCycleList(offerInfos.value.attributes.pictures.data)

        return { state, next, prev }
    } else {
        return {}
    }
})
const offerInfos = ref(null)

onMounted(async () => {

    try {

        const { data } = await axios.get(
            `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures&populate[1]=owner.avatar`
        );

        //console.log("Response offerView >>>", data.data.attributes.owner.data.attributes.avatar.data.attributes.url);

        offerInfos.value = data.data;


    } catch (error) {
        console.log("catch offerView >>>", error);
    }

})

</script>
<template>
    <main>
        <p v-if="offerInfos === null" class="container"> Chargement en cours...</p>
        <div class="container" v-else>
            <div class="leftCol">
                <div class="caroussel">
                    <font-awesome-icon :icon="['fas', 'angle-left']" @click="cycleList.prev()"
                        v-if="offerInfos.attributes.pictures.data?.length > 1" />
                    <img :src="cycleList.state.value.attributes.url" alt="">
                    <font-awesome-icon :icon="['fas', 'angle-right']" @click="cycleList.next()"
                        v-if="offerInfos.attributes.pictures.data?.length > 1" />
                </div>


                <div class="infoBox">
                    <p>{{ offerInfos.attributes.title }}</p>
                    <p>{{ offerInfos.attributes.price }} €</p>
                    <p>{{ formatDate }}</p>
                </div>

                <div class="separator" aria-hidden="true"></div>

                <h2>Description</h2>

                <p class="description">{{ offerInfos.attributes.description }}</p>

                <div class="separator" aria-hidden="true"></div>

                <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                <span>Le Plessis-Robinson (92350)</span>
            </div>

            <div class="rightCol">
                <div class="ownerInfos">

                    <img v-if="offerInfos.attributes.owner.data.attributes.avatar.data"
                        :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url" alt="">
                    <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
                </div>

                <p class="identity"> <font-awesome-icon :icon="['fas', 'check-double']" /> Pièce d’identité vérifiée</p>
                <p class="msg"> <font-awesome-icon :icon="['far', 'clock']" /> Répond généralement en 1 heure</p>

                <div class="separator" aria-hidden="true"></div>

                <button class="one">Acheter</button>
                <button class="two">Message</button>
            </div>
        </div>
    </main>
</template>

<style scoped>
img {
    height: 200px;
    width: 200px;
}

.container {
    display: flex;
    gap: 20px;
    padding: 50px 0px;
}

h2 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
}

.description {
    margin-bottom: 40px;
}

.caroussel {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.caroussel svg {
    font-size: 20px;
    font-weight: lighter;
    cursor: pointer;
}


.leftCol {
    width: 65%;
}

.leftCol img {
    width: 100%;
    height: 350px;
    object-fit: contain;
    margin-bottom: 20px;
}

span {
    margin-left: 7px;
}

.infoBox {
    margin-bottom: 50px;
}

.infoBox p {
    margin-bottom: 20px;
}

.infoBox p:first-child {
    font-size: 24px;
    font-weight: bold;

}

.infoBox p:nth-child(2) {
    font-size: 18px;
    font-weight: bold;
}

.infoBox p:nth-child(3) {
    color: var(--grey);
    font-size: 12px;
}


/*---------------*/
.rightCol {
    width: 35%;
    height: 365px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.rightCol img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
}

.ownerInfos {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.ownerInfos p {
    font-weight: bold;
    font-size: 18px;
}

.identity {
    background-color: var(--light-brown);
    border-radius: 20px;
    margin-bottom: 20px;
    padding: 5px;
    font-size: 12px;
    color: var(--brown);
    width: fit-content;
}

.msg {
    font-size: 14px;
    margin-bottom: 40px;
}

.separator {
    height: 1px;
    background-color: #E6EAEE;
    margin: 16px 0;
    width: 100%;
}

button {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 15px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 10px;
    color: white;
}

.one {
    background-color: var(--btn-color);
}

.two {
    background-color: var(--dark-blue);
}
</style>
