import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWeaponStore = defineStore('weaponStore', () => {
  const weaponSkins = ref([])
  const contentTiers = ref({})
  const vandalSkins = ref([])
  const currentPage = ref(1)
  const productsPerPage = 24

  // ✅ Récupération des skins d'armes avec `fetch`
  const fetchWeaponSkins = async () => {
    try {
      const response = await fetch('https://valorant-api.com/v1/weapons/skins')
      if (!response.ok) throw new Error('Erreur lors du chargement des skins')

      const data = await response.json()
      weaponSkins.value = data.data

      // ✅ Charger les content tiers après les skins
      await fetchContentTiers()
    } catch (error) {
      console.error('Erreur lors de la récupération des skins :', error)
    }
    }

  // ✅ Récupération des content tiers avec `fetch`
  const fetchContentTiers = async () => {
    try {
      const response = await fetch('https://valorant-api.com/v1/contenttiers')
      if (!response.ok) throw new Error('Erreur lors du chargement des content tiers')

      const data = await response.json()
      data.data.forEach(tier => {
        contentTiers.value[tier.uuid] = tier.displayName 
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des content tiers :', error)
    }
  }
    
    // ✅ Extraire l'image du skin
  const getFullRender = (skin) => {
    return skin.chromas?.length ? skin.chromas[0].fullRender : null
  }

  // ✅ Skins affichés selon la pagination
  const displayedWeaponSkins = computed(() => {
    const startIndex = (currentPage.value - 1) * productsPerPage
    return weaponSkins.value.slice(startIndex, startIndex + productsPerPage)
  })

  // ✅ Nombre total de pages
  const totalPages = computed(() => Math.ceil(weaponSkins.value.length / productsPerPage))

 

  return {
    weaponSkins,
    contentTiers,
    currentPage,
    productsPerPage,
    fetchWeaponSkins,
    displayedWeaponSkins,
    totalPages,
    getFullRender
  }
})
