<script setup>

import { onMounted, ref, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BtnPublishOffer from '../components/BtnPublishOffer.vue';

const globalStore = inject('GlobalStore')
const userInfos = ref(null)
const router = useRouter()


onMounted(async () => {
    try {

        const { data } = await axios.get('https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users/me?populate[0]=offers&populate[1]=offers.pictures&populate[2]=avatar', {
            headers: {
                Authorization: `Bearer ${globalStore.userInfos.value.token}`
            }
        })

        console.log("data>>>", data);
        userInfos.value = data

    } catch (error) {
        console.log(error);

    }
})

const totalOffers = computed(() => {
    const numOfOffers = userInfos.value?.offers?.length
    if (numOfOffers === 0) {
        return "Vous n'avez aucune annonce en ligne"
    } else if (numOfOffers === 1) {
        return "1 annonce en ligne"
    } else {
        return `${numOfOffers} annonces en ligne`
    }
})

const deleteOffer = async (id) => {
    try {
        const { data } = await axios.delete(`https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${id}`, {
            headers: {
                Authorization: `Bearer ${globalStore.userInfos.value.token}`
            }
        })

        console.log("response delete>>>", data);

        // Mise à jour de la liste des offres après suppression
        router.go() // Rafraîchit la page pour afficher les offres mises à jour

    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <main>
        <p v-if="!userInfos" class="container">Chargement...</p>
        <div v-else class="container">
            <div class="avatar">
                <img :src="userInfos?.avatar?.url" alt="" v-if="userInfos?.avatar?.url" />
                <div v-else class="letter">{{ userInfos?.username?.charAt(0) }}</div>

                <div class="userInfos">
                    <h2>{{ userInfos?.username }}</h2>
                    <p>{{ userInfos?.email }}</p>
                </div>
            </div>

            <div class="numOfOffers" v-if="userInfos?.offers?.length === 0">
                <p>Vous n'avez aucune annonce en ligne</p>
                <BtnPublishOffer />
            </div>


            <div class="totalOffers" v-else>
                <p>{{ totalOffers }} </p>

                <div class="blocOffers">
                    <div class="offers" v-for="offer in userInfos?.offers" :key="offer.id">


                        <img :src="offer.pictures[0]?.url" :alt="offer.title">
                        <h2>{{ offer.title }}</h2>



                        <p>{{ offer.price }} €</p>
                        <font-awesome-icon :icon="['fas', 'trash']" @click="deleteOffer(offer.id)" />



                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    min-height: calc(100vh - 110px - 80px);
}

.avatar {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    margin-top: 160px;
    border: solid 1px var(--grey);
    padding: 20px;
    border-radius: 20px;

}

.avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;


}

.letter {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: var(--grey);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #fff;
}

.userInfos h2 {
    display: flex;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;
    margin-top: 20px;

}

.numOfOffers {

    font-size: 18px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}



.totalOffers {
    display: flex;
    flex-wrap: wrap;
}

.totalOffers p {
    font-size: 18px;
    font-weight: bold;
}

.totalOffers div {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}

.blocOffers {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

}

.blocOffers h2 {
    flex: 2
}

.blocOffers p {
    flex: 1
}

.blocOffers svg {
    flex: 0.5;
    color: var(--btn-color);
    cursor: pointer;
}

.offers {
    width: 100%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    gap: 20px;
}


.offers img {

    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
}

.offers p {
    color: #89380F;
}
</style>