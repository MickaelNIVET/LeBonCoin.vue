<script setup>
import { RouterLink } from 'vue-router'
import { computed, nextTick } from 'vue';

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
    <div>
      <div class="ownerInfos">
        <img :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url" alt="" class="avatar"
          v-if="offerInfos.attributes.owner.data.attributes.avatar.data">
        <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
      </div>

      <img v-if="offerInfos.attributes.pictures.data && offerInfos.attributes.pictures.data.length > 0"
        :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
      <p>{{ offerInfos.attributes.title }}</p>
      <p>{{ formatPrice }} €</p>


      <div class="date">
        <p>{{ formatDate }}</p>
        <font-awesome-icon :icon="['far', 'heart']" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}


.offerCard>div>img {
  width: 100%;
  height: 240PX;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}


.offerCard {
  width: calc((100% - 60px)/ 5);
}

.offerCard>div {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.offerCard>div>p {
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

.date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.date p {
  font-size: 12px;
  color: var(--grey);
}

.date svg {
  color: var(--grey);
  font-size: 20px;
}


.offerInfos {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
