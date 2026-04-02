<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue';

const props = defineProps({
  offerInfos: Object,
})

const formatDate = computed(() => {
  return props.offerInfos.attributes.publishedAt.split('T')[0].split('-').reverse().join('/');
})

const formatPrice = computed(() => {

  const price = props.offerInfos.attributes.price

  const priceStr = price.toString()

  let newStr = ""

  for (let i = priceStr.length - 1; i >= 0; i--) {
    if (i === priceStr.length - 4) {
      newStr = priceStr[i] + " " + newStr
    } else {
      newStr = priceStr[i] + newStr
    }
  }

  return newStr
})

</script>

<template>
  <RouterLink :to="{ name: `offer`, params: { id: offerInfos.id } }" class="offerCard">
    <div class="cardContent">
      <div class="ownerInfos">
        <img :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url" alt="" class="avatar"
          v-if="offerInfos.attributes.owner.data.attributes.avatar.data">
        <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
      </div>

      <div class="imageContainer">
        <img v-if="offerInfos.attributes.pictures.data && offerInfos.attributes.pictures.data.length > 0"
          :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" class="mainImg" />
          <font-awesome-icon :icon="['far', 'heart']" class="mobileHeart" />
      </div>
      
      <div class="offerInfos">
        <p class="title">{{ offerInfos.attributes.title }}</p>
        <p class="price">{{ formatPrice }} €</p>

        <div class="cardBottom">
          <p class="dateText mobilesOnly">{{ formatDate }}</p>
          <font-awesome-icon :icon="['far', 'heart']" class="heartIcon desktopsOnly" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.desktopsOnly {
  display: block;
}

.mobilesOnly {
  display: none;
}

@media (max-width: 580px) {
  .desktopsOnly {
    display: none !important;
  }
  .mobilesOnly {
    display: block !important;
  }
}

.heartIcon.desktopsOnly {
  display: none; /* Reference screenshot doesn't show the heart icon on cards */
}

.avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}

.offerCard .mainImg {
  width: 100%;
  height: 240PX;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.offerCard {
  width: calc((100% - 60px) / 5);
  text-decoration: none;
  color: inherit;
}

.mobileHeart {
  display: none;
}

@media (max-width: 1200px) {
  .offerCard {
    width: calc((100% - 45px) / 4);
  }
}

@media (max-width: 900px) {
  .offerCard {
    width: calc((100% - 30px) / 3);
  }
}

@media (max-width: 768px) {
  .offerCard {
    width: calc((100% - 15px) / 2);
  }
}

@media (max-width: 580px) {
  .offerCard {
    width: 100%;
    margin-bottom: 0px;
    border-bottom: 1px solid #e6eaee;
    padding: 15px 0;
  }

  .cardContent {
    flex-direction: row !important;
    gap: 12px !important;
    height: auto !important;
    align-items: stretch;
  }

  .offerCard .mainImg {
     width: 110px;
     height: 110px;
     min-width: 110px;
     margin-bottom: 0;
     border-radius: 8px;
  }
  
  .imageContainer {
    position: relative;
    order: 1; /* Ensure image is first */
  }
  
  .mobileHeart {
    display: block;
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
    filter: drop-shadow(0 0 2px rgba(0,0,0,0.5));
    font-size: 18px;
  }

  .ownerInfos {
    display: none !important;
  }

  .offerInfos {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px 0;
    order: 2; /* Ensure info is second */
  }
  
  .title {
    font-size: 15px !important;
    line-height: 1.2;
    margin-bottom: 4px !important;
    color: #1a1a1a;
  }
  
  .price {
    font-size: 16px !important;
    color: #1a1a1a;
  }
  
  .dateText {
    font-size: 11px !important;
    color: #757575 !important;
  }
  
  .heartIcon {
    display: none;
  }
}

.cardContent {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.title {
  font-weight: bold;
  margin-bottom: 10px;
}

.price {
  font-weight: bold;
  margin-bottom: 10px;
}

.ownerInfos {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  height: 35px;

}

.ownerInfos p {
  font-size: 14px;
  font-weight: bold;
  color: inherit;
}

.cardBottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.dateText {
  font-size: 12px;
  color: var(--grey);
}

.heartIcon {
  color: var(--grey);
  font-size: 20px;
}
</style>
