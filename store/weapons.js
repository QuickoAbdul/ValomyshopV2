import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWeaponStore = defineStore('weaponStore', () => {
  const weaponSkins = ref([])
  const contentTiers = ref({})
  const themes = ref({})
  const vandalSkins = ref([])
  const currentPage = ref(1)
  const productsPerPage = 24
  const weaponsGeneral = ref([])

  // ✅ Récupération des armes en general `fetch`
  const fetchWeaponsGeneral = async () => {
    try {
      const response = await fetch('https://valorant-api.com/v1/weapons')
      if (!response.ok) throw new Error('Erreur lors du chargement des armes')

      const data = await response.json()
      weaponsGeneral.value = data.data

    } catch (error) {
      console.error('Erreur lors de la récupération des armes :', error)
    }
  }

  // ✅ Récupération SEULEMENT des skins d'armes 
  const fetchWeaponSkins = async () => {
    try {
      const response = await fetch('https://valorant-api.com/v1/weapons/skins')
      if (!response.ok) throw new Error('Erreur lors du chargement des skins')

      const data = await response.json()
      weaponSkins.value = data.data

      // ✅ Charger les content tiers après les skins
      await fetchThemes()
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

      // Transformer en objet indexé par UUID
      contentTiers.value = data.data.reduce((acc, tier) => {
        acc[tier.uuid] = {
          displayName: tier.displayName,
          displayIcon: tier.displayIcon
        }
        return acc
      }, {})

    } catch (error) {
      console.error('Erreur lors de la récupération des content tiers :', error)
    }
  }

  // ✅ Récupération des themes avec `fetch`
  const fetchThemes = async () => {
    try {
      const response = await fetch('https://valorant-api.com/v1/themes')
      if (!response.ok) throw new Error('Erreur lors du chargement des content tiers')

      const data = await response.json()

      // Transformer en objet indexé par UUID
      themes.value = data.data.reduce((acc, theme) => {
        acc[theme.uuid] = {
          displayName: theme.displayName,
          displayIcon: theme.displayIcon
        }
        return acc
      }, {})

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
    themes,
    currentPage,
    productsPerPage,
    fetchWeaponsGeneral,
    weaponsGeneral,
    fetchWeaponSkins,
    displayedWeaponSkins,
    totalPages,
    getFullRender
  }
})
