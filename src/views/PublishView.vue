<script setup>
import { ref, inject, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';


const GlobalStore = inject('GlobalStore')
const router = useRouter()

const title = ref('');
const description = ref('');
const price = ref(null);
const pictures = ref(null);
const errorMessage = ref('')
const isCreating = ref(false)

const handleSubmit = async () => {

    try {
        isCreating.value = true;
        if (title.value && description.value && price.value && pictures.value) {
            const formData = new FormData();

            for (const key in pictures.value) {
                if (Object.hasOwnProperty.call(pictures.value, key)) {
                    formData.append('files.pictures', pictures.value[key]);
                }
            }

            const stringifiedInfos = JSON.stringify({
                title: title.value,
                description: description.value,
                price: price.value,
                owner: GlobalStore.userInfos.value.id
            });

            formData.append('data', stringifiedInfos)

            const { data } = await axios.post('https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${GlobalStore.userInfos.value.token}`
                    }
                }
            )

            console.log('response ===>', data);
            router.push({ name: 'offer', params: { id: data.data.id } })
        } else {
            errorMessage.value = 'Veuillez remplir tous les champs'
        }

    } catch (error) {
        console.log(error);

    }
    isCreating.value = false;
}

const imagesPreview = computed(() => {
    const tab = []
    for (const key in pictures.value) {
        if (Object.hasOwnProperty.call(pictures.value, key)) {
            tab.push(URL.createObjectURL(pictures.value[key]))
        }
    }
    return tab
})

const selectPictures = (event) => {


    errorMessage.value = ''
    const numOfFiles = event.target.files.length;


    if (numOfFiles <= 10) {
        pictures.value = event.target.files
    } else {
        errorMessage.value = 'Vous ne pouvez pas sélectionner plus de 10 images'
    }

}
</script>

<template>
    <main>
        <div class="container">
            <h1>Déposer une annonce</h1>
            <form @submit.prevent="handleSubmit">
                <label for="title">Titre de l'annonce</label><input type="text" name="title" id="title" v-model="title"
                    @input="errorMessage = ''">
                <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici.</p>

                <label for="description">Description de l'annonce</label><textarea name="description" id="description"
                    cols="30" rows="10" v-model="description" @input="errorMessage = ''"></textarea>
                <p>Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à ajouter tout
                    élément permettant de prouver l’authenticité de votre article: numéro de série, facture, certificat,
                    inscription de la marque sur l’article, emballage etc. Indiquez dans le texte de l’annonce si vous
                    proposez un droit de rétractation à l’acheteur. En l’absence de toute mention, l’acheteur n’en
                    bénéficiera pas et ne pourra pas demander le remboursement ou l’échange du bien ou service proposé
                </p>

                <label for="price">Votre prix de vente</label>

                <div>
                    <input type="number" name="price" id="price" v-model="price" @input="errorMessage = ''">
                    <p>€</p>
                </div>

                <input type="file" name="pictures" id="pictures" multiple @input="selectPictures">


                <div>
                    <img v-for="url in imagesPreview" :src="url" :key="url" alt="Aperçu de l'image" />
                </div>

                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                <p v-if="isCreating">Création de l'annonce en cours...</p>
                <button v-else>Déposer mon annonce</button>

            </form>
        </div>
    </main>
</template>

<style scoped></style>