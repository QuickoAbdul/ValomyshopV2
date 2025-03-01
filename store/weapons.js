import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWeaponStore = defineStore('weaponStore', () => {
  const weaponSkins = ref([])
  const contentTiers = ref({})
  const themes = ref({})
  const currentPage = ref(1)
  const productsPerPage = 24
  const weaponsGeneral = ref([])
  const selectedWeaponType = ref(null)
  const selectedWeapon = ref(null)
  const weaponSkinsMap = ref({})

  // ✅ Récupération des armes en general `fetch`
  const fetchWeaponsGeneral = async () => {
    try {
      const response = await fetch('https://valorant-api.com/v1/weapons')
      if (!response.ok) throw new Error('Erreur lors du chargement des armes')

      const data = await response.json()
      weaponsGeneral.value = data.data

      // Organiser les skins par arme
      data.data.forEach(weapon => {
        if (weapon.skins) {
          weaponSkinsMap.value[weapon.displayName] = weapon.skins
        }
      })

    } catch (error) {
      console.error('Erreur lors de la récupération des armes :', error)
    }
  }

  // ✅ Récupération des content tiers avec `fetch`
  const fetchContentTiers = async () => {
    try {
      const response = await fetch('https://valorant-api.com/v1/contenttiers')
      if (!response.ok) throw new Error('Erreur lors du chargement des content tiers')

      const data = await response.json()
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
      if (!response.ok) throw new Error('Erreur lors du chargement des themes')

      const data = await response.json()
      themes.value = data.data.reduce((acc, theme) => {
        acc[theme.uuid] = {
          displayName: theme.displayName,
          displayIcon: theme.displayIcon
        }
        return acc
      }, {})

    } catch (error) {
      console.error('Erreur lors de la récupération des themes :', error)
    }
  }

  // ✅ Extraire l'image du skin
  const getFullRender = (skin) => {
    return skin.chromas?.length ? skin.chromas[0].fullRender : null
  }

  // ✅ Filtrer les skins par type d'arme et arme spécifique
  const setWeaponFilter = (type, weapon) => {
    selectedWeaponType.value = type
    selectedWeapon.value = weapon
    currentPage.value = 1 // Reset pagination when filter changes
  }

  // ✅ Skins filtrés et affichés selon la pagination
  const displayedWeaponSkins = computed(() => {
    let filteredSkins = []

    if (selectedWeapon.value) {
      // Si une arme spécifique est sélectionnée, prendre ses skins directement
      filteredSkins = weaponSkinsMap.value[selectedWeapon.value] || []
    } else if (selectedWeaponType.value) {
      // Si un type est sélectionné, prendre tous les skins des armes de ce type
      const weaponsOfType = weaponsGeneral.value
        .filter(weapon => weapon.category.includes(selectedWeaponType.value))
        .map(weapon => weapon.displayName)

      filteredSkins = weaponsOfType.reduce((acc, weaponName) => {
        if (weaponSkinsMap.value[weaponName]) {
          acc.push(...weaponSkinsMap.value[weaponName])
        }
        return acc
      }, [])
    } else {
      // Si aucun filtre, afficher tous les skins
      filteredSkins = Object.values(weaponSkinsMap.value).flat()
    }

    const startIndex = (currentPage.value - 1) * productsPerPage
    return filteredSkins.slice(startIndex, startIndex + productsPerPage)
  })

  // ✅ Nombre total de pages
  const totalPages = computed(() => {
    const totalSkins = selectedWeapon.value
      ? (weaponSkinsMap.value[selectedWeapon.value]?.length || 0)
      : selectedWeaponType.value
        ? displayedWeaponSkins.value.length
        : Object.values(weaponSkinsMap.value).flat().length

    return Math.ceil(totalSkins / productsPerPage)
  })

  return {
    weaponSkins,
    contentTiers,
    themes,
    currentPage,
    productsPerPage,
    fetchWeaponsGeneral,
    weaponsGeneral,
    displayedWeaponSkins,
    totalPages,
    getFullRender,
    setWeaponFilter,
    selectedWeaponType,
    selectedWeapon,
    fetchThemes,
    fetchContentTiers
  }
})
