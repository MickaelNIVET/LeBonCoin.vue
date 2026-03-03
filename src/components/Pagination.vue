<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['title', 'sort', 'priceMin', 'priceMax', 'page', 'numOfPages'])

const changePage = (num) => {
    const queries = { ...props }
    delete queries.numOfPages
    queries.page = num
    router.push({ name: 'home', query: queries })
    window.scrollTo({ top: 0 })
}

</script>

<template>
    <section>
        <font-awesome-icon :icon="['fas', 'angle-left']" @click="changePage(page - 1)" v-if="page > 1" />
        <font-awesome-icon :icon="['fas', 'angle-left']" v-else class="disabled" />
        <div>
            <p v-for="num in numOfPages" :key="num" @click="changePage(num)" :class="{ active: num === page }">
                {{ num }}
            </p>
        </div>
        <font-awesome-icon :icon="['fas', 'angle-right']" @click="changePage(page + 1)" v-if="page < numOfPages" />
        <font-awesome-icon :icon="['fas', 'angle-right']" v-else class="disabled" />
    </section>
</template>

<style scoped>
section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 50px 0px 20px 0px;
}

section div {
    display: flex;
    gap: 10px;

}


section div p {
    font-size: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    color: #152233;
    border-radius: 3px;
}

section div p.active {
    background-color: #152233;
    color: white;
}

section svg {
    font-size: 20px;
    cursor: pointer;
    color: #152233;
}

section svg.disabled {
    color: var(--light-grey);
    cursor: default;
}
</style>