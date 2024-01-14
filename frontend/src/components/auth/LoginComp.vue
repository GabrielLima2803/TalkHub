<template>
    <div id="template">
        <div class="container-login">
            <h3>Login TalkHub</h3>
            <div class="container-inputs">
                <div class="form-floating mb-3">
                <input type="email" class="form-control input" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email ou Username</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control input" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            </div>
            <button>Login</button>
        </div>
    </div>
</template>
  
<script setup>
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#template {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    user-select: none;
    background-color: #191f26;
    background-size: cover;
}

.container-login {
    text-align: center;
    background-color: white;
    height: 30em;
    width: 25em;
    border-radius: 10px;
}

.input-box {
    margin-bottom: 20px;
    width: 30px;
}

label {
    display: block;
    margin-bottom: 8px;
}

input {
    padding: 10px;
    font-size: 16px;
    width: 80%;
    display: flex;
    justify-content: center;

    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.container-inputs{

}
</style>
  