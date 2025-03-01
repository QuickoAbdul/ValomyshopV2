<template>
  <div>
    <Weaponsort></Weaponsort>
    <div class="flex flex-wrap justify-center gap-8 bg-white">
      <Produit
        v-for="skin in weaponStore.displayedWeaponSkins"
        :key="skin.uuid"
        :themename="weaponStore.themes[skin.themeUuid]?.displayName || 'N/A'"
        :title="skin.displayName"
        :imagesweapon="weaponStore.getFullRender(skin)"
        :contentTier="weaponStore.contentTiers[skin.contentTierUuid]?.displayName || 'N/A'"
        :contentTierLogo="weaponStore.contentTiers[skin.contentTierUuid]?.displayIcon || 'N/A'"
      />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8 mb-8">
      <div class="pagination flex flex-wrap gap-2 px-18">
        <button
          v-for="pageNumber in weaponStore.totalPages"
          :key="pageNumber"
          @click="weaponStore.currentPage = pageNumber"
          :class="[
            'px-4 py-2 rounded-lg transition-colors duration-200',
            pageNumber === weaponStore.currentPage
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          ]"
        >
          {{ pageNumber }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWeaponStore } from '@/store/weapons.js'
import Produit from '~/components/weaponcard.vue'
import WeaponSort from '~/components/weaponsort.vue'

// ✅ Initialiser le store
const weaponStore = useWeaponStore()

// ✅ Charger les données au montage du composant
onMounted(async () => {
  await weaponStore.fetchWeaponsGeneral()
  await weaponStore.fetchThemes()
  await weaponStore.fetchContentTiers()
})

console.log("weaponstore 1: " , weaponStore)
</script>

<style scoped>
.pagination button {
  text-align: center;
}
</style>
