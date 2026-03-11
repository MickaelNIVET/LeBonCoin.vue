<script setup>
import { inject, ref } from 'vue';
import BtnPublishOffer from './BtnPublishOffer.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()
const search = ref('')
const GlobalStore = inject('GlobalStore')
console.log(GlobalStore.userToken);

const disconnectUser = () => {
  GlobalStore.changeUserInfos(null)
  $cookies.remove('userInfos')

  router.push({ name: 'home' })
}

const handleSubmit = () => {
  console.log(search.value, route.query);

  const queries = { ...route.query }

  if (search.value) {
    queries.title = search.value
  } else {
    delete queries.title
  }

  queries.page = 1

  router.push({ name: 'home', query: queries })
}


</script>

<template>
  <header>
    <div class="container">
      <div class="topPart">
        <RouterLink :to="{ name: 'home' }">
          <img src="../assets/logo.svg" alt="logo" />
        </RouterLink>
        <div class="middlePart">
          <BtnPublishOffer />

          <form @submit.prevent="handleSubmit">
            <input type="text" name="search" id="search" placeholder="Rechercher sur Leboncoin" v-model="search" />
            <button><font-awesome-icon :icon="['fas', 'search']" /></button>

          </form>

        </div>

        <div>
          <div class="rightPart">
            <RouterLink :to="{ name: 'login' }" v-if="!GlobalStore.userInfos.value">
              <font-awesome-icon :icon="['far', 'user']" />
              <p>Se connecter</p>
            </RouterLink>

            <div v-else class="disconnectPart">

              <div>
                <font-awesome-icon :icon="['far', 'user']" />
                <p>{{ GlobalStore.userInfos.value.username }}</p>
              </div>

              <font-awesome-icon :icon="['fas', 'sign-out-alt']" @click="disconnectUser" />
            </div>
          </div>
        </div>
      </div>

      <div class="category">
        <span>Immobilier</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Véhicules</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Location de vacances</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Emploi</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Mode</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Maison & Jardin</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Famille</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Electronique</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Loisirs</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Autres</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  height: 110px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  border-bottom: var(--text-input) 1px solid;
}


.container>div {
  display: flex;
}

/*------Top part--------*/

.topPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.disconnectPart {
  display: flex;
  gap: 20px;
  align-items: center;
}

.disconnectPart>div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

/*------Middle part--------*/

.middlePart {
  display: flex;
  gap: 20px;
  align-items: center;

}

.middlePart>form {
  background-color: var(--input-grey);
  padding: 1px 2px;
  border-radius: 10px;
  display: flex;
  align-items: center;


}

input {
  width: 250px;
  border: none;
  background-color: var(--input-grey);
  padding: 8px;
  font-size: 16px;
  color: var(--text-input);

}

input::placeholder {
  color: var(--text-input);
}

input:focus {
  outline: none;
}

.middlePart>form svg {
  background-color: var(--btn-color);
  padding: 7px;
  border-radius: 10px;
  box-sizing: content-box;

}

.middlePart>form button {
  border: none;
  background-color: rgba(255, 99, 71, 0);
  cursor: pointer;
}

/*------Right part--------*/

.rightPart>a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 7px;
}


.rightPart p {
  font-size: 12px;

}

/*-------Category-------*/
.category {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 10px;

}

.category svg {
  font-size: 3px;
}

img {
  width: 140px;
}
</style>
