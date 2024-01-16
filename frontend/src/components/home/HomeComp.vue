<script setup>
</script>

<template>
    <div id="body">
        <div>
            <div>
                <main>
                    <aside class="">
                        <h2 class="mb-5"><span>Bem-Vindo</span></h2>
                        <p>
                            Bem-vindo ao TalkHub, uma plataforma inovadora de conversação que vai além do chat convencional,
                            conectando pessoas e ideias de forma intuitiva e segura. Com login protegido, interface
                            personalizável e integração eficiente, o TalkHub oferece uma experiência de comunicação
                            conectada. Junte-se a nós para explorar o futuro da conversação online. </p>
                            <div>
                            <router-link to="/register">
                            <button class="btn-registre">Registre-se</button>
                            </router-link>
                            </div>
                            <h2 class="mt-5"><span>Redes Sociais</span></h2>
                            <p class="mt-5">Redes sociais do criado do sistema:</p>
                            <div>
                                <a href="https://github.com/GabrielLima2803"  target="_blank" class="reset" >
                                <i class="bi bi-github" id="github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/gabriel-lima-5a04a2294/"  target="_blank" class="reset">
                                <i class="bi bi-linkedin" id="linkedin"></i>
                                </a>
                            </div>
                    </aside>

                    <article>
                        <img src="../../assets/img/chat-bot-animate.svg" alt="mulher-roxa">
                    </article>
                </main>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
#body {
    background-color: rgb(34, 34, 34);
    color: white;
    width: 100%;
    height: 100vh;
    padding: 15px;
}


h1 {
    font-weight: 200;
}

main {
    display: flex;
    flex-direction: row;
    margin-top: 50px;
}

h2 {
    font-size: 56px;
    line-height: 10px;
}

span {
    color: #77ffc0;
}

p {
    line-height: 20px;
    max-width: 500px;
    text-transform: capitalize;
}

img {
    margin-top: -50px;
    margin-left: 30px;
    width: 650px;
}

form {
    display: flex;
    flex-direction: column;
    width: 70%;
}

form [type="submit"] {
    height: 50px;
    width: 50%;
    background-color: #77ffc0;
    color: white;
    font-weight: bold;
}

form [type="submit"]:hover {
    cursor: pointer;
}

input {
    margin-top: 20px;
    height: 20px;
    padding: 15px;
    border-radius: 20px;
    border: none;
    font-size: 15px;
}
.btn-registre{
    width: 100%;
    padding: 16px 0px;
    border: none;
    border-radius: 8px;
    margin-top: 15px;
    outline: none;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 3px;
    color: #2b134B;
    background: #00ff88;
    box-shadow: 0px 10px 40px -12px #00ff8052;
}
#github {
    font-size: 44px;
    margin-right: 10px;
    cursor: pointer;
}
#linkedin {
    font-size: 40px;
    cursor: pointer;
}
.reset{
    color: white;
}
#github:hover, #linkedin:hover{
    color: #00ff88;
    transition: 0.6s;
}
.btn-registre:hover{
    opacity: 0.5;
    transition: 0.6s;
}

@media screen and (max-width: 760px) {

    header {
        flex-direction: column;
    }

    main {
        flex-direction: column;
    }

    h2 {
        font-size: 38px;
    }

    form {
        margin: 0 auto;
        width: 100%;
    }

    input {
        align-self: center;
    }

    img {
        display: none;
    }

    ul {
        text-align: center;
    }
}</style>