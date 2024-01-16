<template>
    <div class="main-login">
        <div class="left-login">
            <h1>Faça o Login</h1><h1>Se junte ao TalkHub</h1>
            <img src="@/assets/img/chat-animate.svg" class="left-login-img" alt="">
        </div>
        <div class="right-login">
            <div class="card-login">
                <h1 class="h1">Login</h1>
                <div class="textfield">
                    <label for="usuario">Usuário</label>
                    <input type="text" name="usuario" placeholder="Usuário">
                </div>
                <div class="textfield">
                    <label for="password">Senha</label>
                    <input type="password" name="password" placeholder="Senha">
                </div>
                <button class="btn-login">Login</button>
                <div>
                <router-link to="/register" class="reset">
                    <h5 class="registre">Não tem login? se registre</h5>
                </router-link>
                <router-link to="/forget-password" class="reset">
                    <h5 class="mt-3">Esqueci Senha?</h5>
                </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
body *{
    box-sizing: border-box;
}
.main-login{
    width: 100vw;
    height: 100vh;
    background-color: rgb(34, 34, 34);
    display: flex;
    justify-content: center;
    align-items: center;
}

.left-login{
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.reset{
    text-decoration: none;
}
.left-login > h1 {
    font-size: 3vw;
    color: #77ffc0;
}

.left-login-img{
width: 35vw;
}

.right-login{
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-login{
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px 35px;
    background-color: rgb(43, 42, 42);
    border-radius: 20px;
    box-shadow: 0px 10px 40px #00000056;
}

.h1{
    color: #00ff88;
    font-weight: 800;
    margin: 0;
    
}
h5{
    color: #1b7a4e;
    text-align: center;
    cursor: pointer;
}
h5:hover{
    color: #00ff88;
}
.textfield{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.textfield > input {
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 15px;
    background-color: rgb(54, 54, 54);
    color: #f0ffffde;
    font-size: 12pt;
    box-shadow: 0px 10px 40px #00000056;
    outline: none;
    box-sizing: border-box;
}
.textfield > label{
    color: #f0ffffde;
    margin-bottom: 10px;
    margin-top: 15px;
}
.textfield > input::placeholder{
    color: #f0ffff94;
}
.btn-login {
    width: 100%;
    padding: 16px 0px;
    margin: 25px;
    border: none;
    border-radius: 8px;
    outline: none;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 3px;
    color: #2b134B;
    background: #00ff88;
    box-shadow: 0px 10px 40px -12px #00ff8052;
}

@media only screen and (max-width: 950px){
    .card-login{
        width: 85%;
    }
}

@media only screen and (max-width: 600px){
    .main-login{
        flex-direction: column;
    }
    .left-login > h1 {
        width: 100%;
        height: auto;
    }
    .left-login {
        width: 100%;
        height: auto;
    }

    .right-login{
        width: 100%;
        height: auto;
    }
    .left-login-img{
        width: 50vw;
    }
    .card-login{
        width: 90%;
    }
}
</style>
  