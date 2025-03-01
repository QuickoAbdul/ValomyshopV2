<template>
  <div class="flex space-x-4 p-4">
    <div v-for="(weapon, index) in weapons" :key="index" class="relative">
      <div
        class="bg-gray-100 border-gray-400 border-2 text-black px-6 py-2 rounded-lg cursor-pointer 
        hover:bg-gray-600 hover:text-white"
        @click="toggleDropdown(index)">
        {{ weapon.name }}
      </div>
      <transition
        enter-active-class="transition duration-500 ease-in-out transform opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-300 ease-in transform opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4">
      <div
        v-if="dropdownIndex === index"
        class="absolute top-full left-0 mt-2 bg-gray-700 text-white rounded-lg shadow-lg w-40 z-50">
        <ul>
          <li 
            v-for="(option, i) in weapon.options" 
            :key="i" 
            class="px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
            @click="selectWeapon(weapon.name, option)">
            {{ option }}
            <img v-if="weapon.images[i]" :src="weapon.images[i]" alt="Weapon Image" class="w-full h-10" />
          </li>
        </ul>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useWeaponStore } from '@/store/weapons.js';

export default {
  data() {
    return {
      weapons: [
        { name: "Rifle", options: ["Vandal", "Phantom", "Guardian", "Bulldog"], images: [] },
        { name: "Heavy", options: ["Ares", "Odin"], images: [] },
        { name: "ShotGun", options: ["Bucky", "Judge"], images: [] },
        { name: "SideArm", options: ["Classic", "Shorty", "Frenzy", "Ghost", "Sheriff"], images: [] },
        { name: "Sniper", options: ["Marshal", "Operator"], images: [] },
        { name: "SMG", options: ["Stinger", "Spectre"], images: [] },
        { name: "Melee", options: ["Melee"], images: [] },
      ],
      dropdownIndex: null,
    };
  },
  async created() {
    const weaponStore = useWeaponStore();
    await weaponStore.fetchWeaponsGeneral();
    this.assignWeaponImages();
  },
  methods: {
    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? null : index;
    },

    selectWeapon(type, weapon) {
      const weaponStore = useWeaponStore();
      weaponStore.setWeaponFilter(type, weapon);
      this.dropdownIndex = null; // Ferme le dropdown après la sélection
    },

    // Associe les images à chaque option d'arme
    assignWeaponImages() {
      const weaponStore = useWeaponStore();
      
      this.weapons.forEach(weapon => {
        weapon.images = [];
        weapon.options.forEach(option => {
          const matchedWeapon = weaponStore.weaponsGeneral.find(w => w.displayName === option);
          if (matchedWeapon) {
            weapon.images.push(matchedWeapon.killStreamIcon || null);
          } else {
            weapon.images.push(null);
          }
        });
      });
    }
  },
};
</script>
