<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Lorem Ipsum</RouterLink>
    |
    <RouterLink to="/typography">Custom Text</RouterLink>
  </nav>
  <RouterView />
</template>

<style>
nav {
  padding: 2rem;
  text-align: center;
  background-color: #ffffff;
}

nav a {
  margin: 0 1rem;
  color: #666;
  text-decoration: none;
  font-weight: 500;
}

nav a.router-link-active {
  color: #42b883;
}
</style>
