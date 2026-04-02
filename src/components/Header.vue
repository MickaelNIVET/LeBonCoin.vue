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

const changeValue = (event) => {
  if (event.target.value === '') {
    const queries = { ...route.query }
    delete queries.title
    router.push({ name: 'home', query: queries })
  }
}

</script>

<template>
  <header>
    <div class="container">
      <div class="headerContent">
        <div class="mobileMenuBtn">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </div>

        <RouterLink :to="{ name: 'home' }" class="logoContainer">
          <img src="../assets/logo.svg" alt="logo" />
        </RouterLink>

        <div class="mainNav desktopsOnly">
          <BtnPublishOffer />

          <form @submit.prevent="handleSubmit" class="searchForm">
            <font-awesome-icon :icon="['fas', 'search']" class="mobileSearchIcon" />
            <input type="text" name="search" id="search" placeholder="Rechercher sur leboncoin" v-model="search"
              @input="changeValue" />
            <button class="desktopsOnly"><font-awesome-icon :icon="['fas', 'search']" /></button>
          </form>
        </div>

        <div class="rightPart desktopsOnly">
          <RouterLink :to="{ name: 'login' }" v-if="!GlobalStore.userInfos.value">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>Se connecter</p>
          </RouterLink>

          <div v-else class="disconnectPart">
            <div>
              <RouterLink :to="{ name: 'profile' }">
                <font-awesome-icon :icon="['far', 'user']" />
                <p>{{ GlobalStore.userInfos.value.username }}</p>
              </RouterLink>
            </div>
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" @click="disconnectUser" />
          </div>
        </div>
      </div>

      <div class="category">
        <span>Immobilier</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Véhicules</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Locations de vacances</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Emploi</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Mode</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Maison & Jardin</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Famille</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Electronique</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Loisirs</span>
        <font-awesome-icon :icon="['fas', 'circle']" class="dot" />
        <span>Autres</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  height: auto;
  min-height: 50px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  border-bottom: var(--light-grey) 1px solid;
  z-index: 100;
}

.desktopsOnly {
  display: flex !important;
}

@media (max-width: 768px) {
  .desktopsOnly {
    display: none !important;
  }
}

.mobileMenuBtn {
  display: none;
  font-size: 20px;
  color: var(--dark-blue);
  cursor: pointer;
}

@media (max-width: 768px) {
  .mobileMenuBtn {
    display: block;
    position: absolute;
    left: 15px;
    top: 15px;
  }
}

.logoContainer {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .logoContainer {
    width: 100%;
    justify-content: center;
    padding: 10px 0;
  }
}

.headerContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  position: relative;
}

@media (max-width: 768px) {
  .headerContent {
    flex-wrap: wrap;
  }
}

.mainNav {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  justify-content: center;
}

@media (max-width: 768px) {
  .mainNav {
    width: 100%;
    order: 3;
    margin-top: 5px;
  }
}

.disconnectPart {
  display: flex;
  gap: 20px;
  align-items: center;
}

.disconnectPart>div>a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

/* Removed unused middlePart class */

.searchForm {
  background-color: var(--input-grey);
  padding: 1px 2px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex: 1;
}

@media (max-width: 768px) {
  .searchForm {
    background-color: #f4f4f4;
    padding: 2px 15px;
    border-radius: 9999px;
    /* Pill shape */
    margin: 0 10px;
  }
}

.mobileSearchIcon {
  display: none;
  color: #757575;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .mobileSearchIcon {
    display: block;
  }
}

input {
  flex: 1;
  border: none;
  background-color: transparent;
  padding: 8px;
  font-size: 16px;
  color: var(--text-input);
}

@media (max-width: 768px) {
  input {
    padding: 8px 0;
  }
}

input:focus {
  outline: none;
}

.searchForm button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.searchForm button svg {
  background-color: var(--btn-color);
  color: white;
  padding: 7px;
  border-radius: 10px;
  box-sizing: content-box;
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
  margin-bottom: 10px;
  color: #1a1a1a;

}

.category span {
  flex-shrink: 0;

}

.category .dot {
  display: block;
  font-size: 4px;
  color: #757575;
  margin: 0 10px;
}

@media (max-width: 768px) {
  .category {
    font-size: 13px;
    margin-top: 0;
    margin-bottom: 10px;
    overflow-x: auto;
    white-space: nowrap;
    gap: 10px;
    padding: 0 10px 5px 10px;
    justify-content: flex-start;

  }

  .category::-webkit-scrollbar {
    display: none;
  }

  .category .dot {
    display: block;
    font-size: 4px;
    color: #757575;
    margin: 0 5px;
  }
}

img {

  width: 140px;
  margin-right: 30px;
}

@media (max-width: 768px) {
  img {
    width: 120px;
  }
}
</style>
