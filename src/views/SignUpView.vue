<script setup>
import { RouterLink , useRouter} from 'vue-router';
import { ref, inject} from 'vue';
import axios from 'axios';



const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref ('')
const isSubmitting = ref (false)
const displayPassword = ref (false)

const GlobalStore = inject('GlobalStore')

const router = useRouter()
console.log('GlobalStore ===>',GlobalStore);


const handleSubmit = async() => {
    console.log({
        username: username.value,
        email: email.value,
        password: password.value
    });

 if (username.value && email.value && password.value) {
    
    isSubmitting.value=true
    try {
    const {data} =await axios.post("https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register",{
    username: username.value,
    email: email.value,
    password: password.value
})

console.log("response ===>",data);
GlobalStore.changeUserInfos({username : data.user.username, token : data.jwt})

router.push({name : 'home'})
} catch (error) {
    console.log("catch ===>", error);
    errorMessage.value ='Un problème est survenu, veuillez essayer à nouveau';
}

    isSubmitting.value=false
 } else {
    errorMessage.value ='Veuillez remplir tous les champs';
    
 } 
 }
</script>




<template>
    <main>
        <div class="container">
            <form @submit.prevent="handleSubmit">
                <div class="top">
                <h2>Bonjour !</h2>
                <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>
            </div>

            
            <div class="infos"> 
                <label for="username">Nom <sup>*</sup></label>
                <input type="text" name="username" id="username" v-model="username" @input="errorMessage=''"/>
                    

                <label for="email">E-mail <sup>*</sup></label>
                <input type="email" name="email" id="email" v-model="email" @input="errorMessage=''" />
     
                
                <label for="password">Mot de passe <sup>*</sup></label>
                <div class="inputPassword">
                    <input 
                    :type="displayPassword ? 'text' : 'password'"
                     name="password" 
                     id="password" 
                     v-model="password"
                     @input="errorMessage=''"
                     />
                    <div> 
                        <font-awesome-icon 
                        :icon="['far', 'eye-slash']" 
                        v-if="!displayPassword" 
                        @click="displayPassword = !displayPassword"
                        />
                        <font-awesome-icon 
                        :icon="['far', 'eye']" 
                        v-else 
                        @click="displayPassword = !displayPassword"/>
                    </div>    
                </div>
            
            </div>
            
             <div class="button">
                <p v-if="isSubmitting">Inscription en cours...</p>
                <button v-else>S'inscrire <font-awesome-icon :icon="['fas', 'arrow-right']"/></button>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            </div>
                
             <div class="bottom">
                <p>Vous avez déjà un compte ? <span><RouterLink :to="{name:'login'}">Connectez-vous</RouterLink></span></p>
            </div>
            
            </form>    
        </div>
    </main>
</template>

<style scoped>

main {
    box-sizing: border-box;
    height: calc(100%vh - 110px - 80px);
    background-image: url("../assets/illustration.png");
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: bottom;
}

 .container{
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    height: 490px;
    width: 480px;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 50px;
    margin-top: 150px;
    background-color: white;
 }

 .container > div{
    display: flex;
    flex-direction: column;
 }

    /*------------------*/

 .top{
    margin-bottom: 30px;
 }

     /*------------------*/


 .infos{  
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
 }

 .infos sup {
    color: var(--grey);
 }

 .infos input{
    height: 45px;
    border-radius: 15px;
    border: solid 1px var(--grey)
 }

 #email {
    margin-bottom: 10px;
 }

 #username {
    margin-bottom: 10px;
 }

 

     /*------------------*/


.inputPassword {
    border: solid 1px var(--grey);
    display: flex;
    border-radius: 15px;
   margin-bottom: 10px;
 }

 .inputPassword > div {
    border-left: solid 1px var(--grey);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
 }

 .inputPassword > input {
    flex: 1;
    border: none;
 }


 .button{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
 }    

 .error {
    color: var(--btn-color);
 }

 button {
  width: 420px;
  padding: 1px 6px;
  background-color: var(--btn-color);
  color: white;
  border: none;
  padding: 15px 0px 15px 0px;
  border-radius: 15px;
  font-size: 13px;
  font-weight: bold;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  
}

button svg{
    font-weight: lighter;
}

    /*------------------*/


.bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.bottom span{
    font-weight: bold;
    text-decoration: underline;
}
</style>