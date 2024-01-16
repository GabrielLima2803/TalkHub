<script setup>
import HomeComp from '@/components/home/HomeComp.vue';
import FooterHome from '@/components/home/FooterHome.vue'
import HeaderHome from '@/components/home/HeaderHome.vue'

</script>

<template>
<div class="bg">
<header-home/>
<home-comp/>
<footer-home/>
</div>
</template>

<style>
.bg{
  background-color: rgb(34, 34, 34);

}
</style>