<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['sort', 'priceMin', 'priceMax', 'title', 'page'])

const priceMin = ref(props.priceMin)
const priceMax = ref(props.priceMax)
const sort = ref(props.sort)

watch(() => props.priceMin, (val) => { priceMin.value = val })
watch(() => props.priceMax, (val) => { priceMax.value = val })
watch(() => props.sort, (val) => { sort.value = val })

const router = useRouter()

const handleSubmit = () => {
    const queries = {}

    if (priceMin.value) queries.pricemin = priceMin.value  // 👈 minuscules
    if (priceMax.value) queries.pricemax = priceMax.value  // 👈 minuscules
    if (sort.value) queries.sort = sort.value
    if (props.title) queries.title = props.title

    queries.page = 1

    router.push({ name: 'home', query: queries })
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <p>Prix</p>
            <div class="priceBloc">
                <div>
                    <input type="number" name="priceMin" id="priceMin" placeholder="Minimum" min="0" v-model="priceMin">
                    <label for="priceMin">€</label>
                </div>
                <div>
                    <input type="number" name="priceMax" id="priceMax" placeholder="Maximum" :min="priceMin"
                        v-model="priceMax">
                    <label for="priceMax">€</label>
                </div>
            </div>
        </div>
        <div>
            <p>Tri</p>
            <div class="sortBloc">
                <label>
                    Prix croissant
                    <input type="radio" value="price:asc" id="priceAsc" v-model="sort">
                </label>
                <label>
                    Prix décroissant
                    <input type="radio" value="price:desc" id="priceDesc" v-model="sort">
                </label>
                <label>
                    Pas de tri
                    <input type="radio" value="" id="noSort" v-model="sort">
                </label>
            </div>
        </div>

        <button>Rechercher</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    width: 100%;
}

p {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
}

.priceBloc {
    display: flex;
    gap: 20px;
}

.priceBloc>div {
    display: flex;
    align-items: center;
    height: 43px;
}

.priceBloc input {
    width: 150px;
    height: 100%;
    padding: 0px 10px;
    border: none;
    border: 1px solid var(--light-grey);
    border-radius: 15px 0 0 15px;
}

.priceBloc label {
    width: 45px;
    height: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--light-grey);
    border-radius: 0 15px 15px 0;
    border-left: none;
}

.priceBloc ::placeholder {
    font-size: 16px;
}

.sortBloc {
    display: flex;
    gap: 20px;
}

.sortBloc label {
    display: flex;
    align-items: center;
    height: 43px;
    font-size: 16px;
    border-radius: 15px;
    background: white;
    cursor: pointer;
}

button {
    background-color: var(--btn-color);
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    height: 37px;
    padding: 0px 10px;
}
</style>