<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue';
import { RouterLink } from 'vue-router';

</script>

<template>
  <header>
    <div class="container">
      <div class="topPart">
        <RouterLink :to="{ name: 'home' }">
        <img src="../assets/logo.svg" alt="logo" />
        </RouterLink>
        <div  class="middlePart" >
          <BtnPublishOffer />
          <div>
            <input type="text" name="search" id="search" placeholder="Rechercher sur Leboncoin" />
            <font-awesome-icon :icon="['fas', 'search']" />
          </div>
        </div>

        <div>
          <div class="rightPart">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>Se connecter</p>
          </div>
           <!-- <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> -->
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


.container > div {
  display: flex;
}
/*------Top part--------*/

.topPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

/*------Middle part--------*/

.middlePart {
  display: flex;
  gap: 20px;
  align-items: center;
 
}

.middlePart > div {
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

.middlePart > div svg {
  background-color: var(--btn-color);
  padding: 7px;
  border-radius: 10px;
  box-sizing: content-box;
  
}

/*------Right part--------*/

.rightPart {
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
