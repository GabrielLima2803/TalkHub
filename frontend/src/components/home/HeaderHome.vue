<template>
   <header>
            <div id="title">
                <h1>TalkHub</h1>
            </div>

            <ul>
                <router-link to="/login" id="inscreva-se-btn">
                    <li>Já tem uma conta?</li>
                </router-link>
            </ul>
        </header>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(34, 34, 34);
    color: white;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
}

#title {
    flex-direction: column;
    line-height: 10px;
}
h1{
    letter-spacing: 5px;
    cursor: pointer;
}

li {
    display: inline-block;
    margin: 20px;
}
a {
    color: white;
}

a:hover {
    color: #77ffc0;
    transition: 0.3s all;
}

#inscreva-se-btn {
    border: 2px solid #77ffc0;
    padding: 10px;
    border-radius: 15px;
}

#inscreva-se-btn:hover {
    background-color: #77ffc0;
    color: black;
}

</style>