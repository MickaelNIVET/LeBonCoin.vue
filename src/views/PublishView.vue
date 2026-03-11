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
                    élément permettant de prouver l’authenticité de votre article: numéro de série, facture,
                    certificat,
                    inscription de la marque sur l’article, emballage etc. Indiquez dans le texte de l’annonce si
                    vous
                    proposez un droit de rétractation à l’acheteur. En l’absence de toute mention, l’acheteur n’en
                    bénéficiera pas et ne pourra pas demander le remboursement ou l’échange du bien ou service
                    proposé
                </p>





                <label for="price">Votre prix de vente</label>

                <div class="priceBloc">
                    <input type="number" name="price" id="price" v-model="price" @input="errorMessage = ''">
                    <p>€</p>
                </div>


                <a>Ajoutez des photos</a>
                <label class="filesInput" for="pictures">

                    <font-awesome-icon :icon="['fas', 'camera']" />
                    <span>Sélectionnez jusqu'à 10 photos</span>
                </label>
                <input type="file" name="pictures" id="pictures" multiple @input="selectPictures">


                <div class="imagesPreview">
                    <img v-for="url in imagesPreview" :src="url" :key="url" alt="Aperçu de l'image" />
                </div>


                <p v-if="isCreating">Création de l'annonce en cours...</p>
                <button v-else>Déposer mon annonce</button>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

            </form>
        </div>
    </main>
</template>

<style scoped>
main {
    padding: 40px 0;
    background-color: var(--input-grey);
}

.container {
    background-color: white;
    padding: 20px;
    border-radius: 20px;

}

h1 {
    font-size: 22px;
    margin-bottom: 30px;
    font-weight: bold;
}

form {

    display: flex;
    flex-direction: column;
}

label {
    margin: 30px 0 10px 0;
}

p {
    font-size: 12px;
    color: var(--grey);
    margin-top: 5px;
    width: 770px;
}

input,
textarea {
    border: solid 1px var(--grey);
    border-radius: 10px;
    width: 770px;
}

input[type="text"] {
    height: 45px;

}

textarea {
    height: 215px;
}

.priceBloc {
    height: 45px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;

}

.priceBloc input {
    width: 190px;
    border: solid 1px var(--grey);
    height: 100%;
    border-radius: 15px 0 0 15px;

}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.priceBloc p {
    width: 45px;
    height: 100%;
    border: solid 1px var(--grey);
    border-left: none;
    border-radius: 0 15px 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-top: 0;

}

input[type="file"] {
    display: none;
}


.filesInput {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #094171;
    cursor: pointer;
    border: solid 1px #094171;
    width: 150px;
    height: 150px;
    border-radius: 15px;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    padding: 10px;
    line-height: 20px;
    margin-top: 10px;

}



.filesInput span {
    font-size: 16px;
}

.filesInput svg {
    font-size: 35px;
}

button {
    background-color: var(--btn-color);
    color: white;
    margin-top: 20px;
    border: none;
    border-radius: 10px;
    padding: 10px 15px;
    align-self: flex-end;
    font-weight: bold;
    margin-top: 40px;
}

.imagesPreview {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.imagesPreview img {
    width: calc((100% - 40px) / 5);
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 10px;
}

.error {
    color: var(--btn-color);
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
    margin-bottom: 20px;
}
</style>