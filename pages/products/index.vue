<template>
  <div>
    <div class="flex flex-wrap justify-center gap-8 bg-white">
      <Produit
        v-for="skin in weaponStore.displayedWeaponSkins"
        :key="skin.uuid"
        :title="skin.displayName"
        :image="weaponStore.getFullRender(skin)"
        :contentTier="weaponStore.contentTiers[skin.contentTierUuid] || 'N/A'"
      />
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
        v-for="pageNumber in weaponStore.totalPages"
        :key="pageNumber"
        @click="weaponStore.currentPage = pageNumber"
        :class="{ 'active': pageNumber === weaponStore.currentPage }"
      >
        {{ pageNumber }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWeaponStore } from '@/store/weapons.js'
import Produit from '~/components/weaponcard.vue'

// ✅ Initialiser le store
const weaponStore = useWeaponStore()

// ✅ Charger les données au montage du composant
onMounted(() => {
    weaponStore.fetchWeaponSkins();
    weaponStore.fetchVandalSkins();
})
</script>

<style scoped>
.pagination button {
  margin: 5px;
  padding: 8px 12px;
  border: none;
  background-color: #ddd;
  cursor: pointer;
  transition: 0.3s;
}
.pagination button:hover {
  background-color: #bbb;
}
.pagination button.active {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}
</style>
