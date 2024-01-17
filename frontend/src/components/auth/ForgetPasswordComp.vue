<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import PreLoader from '../loading/PreLoader.vue';
const userStore = useUserStore();
const router = useRouter();
const email = ref('');
const loading = ref(false);

const sendResetCode = async () => {
    try {
        loading.value = true;
        await userStore.sendResetCode({ email: email.value });
        loading.value = false;
        router.push('/reset-password');
    } catch (error) {
        console.error('Erro ao enviar código de recuperação:', error);
    } 
};
</script>
<template>
    
    <div class="wrapper">
        <pre-loader v-if="loading"/>

        <div class="container">
            <div class="tittle-section">
                <h2 class="title">Forget Password</h2>
                <p class="para">Insira seu email para que o sistema possa enviar um código de recuperação de senha, assim você poderá resetar sua senha. </p>
            </div>
            <form @submit.prevent="sendResetCode" class="from">
                <div class="input-group">
                    <label for="email" class="label-tittle">Insira seu email</label>
                    <input v-model="email" type="email" name="email" placeholder="Insira seu email">
                    <span class="icon">&#9993;</span>
                </div>

                <div class="input-group">
                    <button type="submit" @click.prevent="sendResetCode" class="submit-btn">Enviar email</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped> 
.wrapper{
    background-color: #151616;
    widows: 100%;
    height: 100vh;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    width: 500px;
    background-color: white;
    padding: 30px;
    border-radius: 16px;
    background-color: (0,0,0,0,0.08) 0px 4px 12px;
}


.tittle-section {
    margin-bottom: 30px;
}

.title{
    color: #38475a;
    font-size: 25px;
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 10px;
}
.para{
    color: #38475a;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
    text-transform: capitalize;
}
.input-group{
    position: relative;
}
.input-group .label-tittle {
    color: #38475a;
    text-transform: capitalize;
    margin-bottom: 11px;
    font-size: 14px;
    display: block;
}
.input-group input {
    width: 100%;
    background-color: none;
    color: #38475a;
    height: 50px;
    font-size: 16px;
    font-weight: 300;
    border: 1px solid #EAECF0;
    padding: 9px 18px 9px 52px;
    outline: none;
    border-radius: 8px;
    margin-bottom: 20px;
}

.input-group input::placeholder{
    color: #38475a;
    font-size: 16px;
    font-weight: 400;
}

.input-group .icon{
    position: absolute;
    color: #0e0f11;
    left: 13px;
    top: calc(50% - 11px);
    text-align: center;
    font-size: 23px;
}

.submit-btn{
    width: 100%;
    background-color: #202020;
    border: 1px solid transparent;
    border-radius: 8px;
    font-size: 16px;
    color: white;
    padding: 13px 24px;
    font-weight: 500;
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;
}
.submit-btn:hover{
    opacity: 0.9;
}
</style>