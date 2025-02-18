<template>
  <div class="flex space-x-4 p-4">
    <div v-for="(weapon, index) in weapons" :key="index" class="relative">
      <div
        class="bg-gray-100 border-gray-400 border-2 text-black px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-600 hover:text-white"
        @click="toggleDropdown(index)"
      >
        {{ weapon.name }}
      </div>
      <div
        v-if="dropdownIndex === index"
        class="absolute top-full left-0 mt-2 bg-gray-700 text-white rounded-lg shadow-lg w-40 z-50"
      >
        <ul>
          <li v-for="(item, i) in weapon.options" :key="i" class="px-4 py-2 hover:bg-gray-600 cursor-pointer">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weapons: [
        { name: "Rifle", options: ["Vandal", "Phantom", "Guardian", "Bulldog" ] },
        { name: "Heavy", options: ["Ares", "Odin"] },
        { name: "ShotGun", options: ["Bucky", "Judge"] },
        { name: "SideArm", options: ["Classic", "Shorty", "Frenzy", "Ghost", "Sheriff"] },
        { name: "Sniper", options: ["Marshal", "Operator"] },
        { name: "SMG", options: ["Stinger", "Spectre"] },
        { name: "Melee", options: ["Knife"] },
      ],
      dropdownIndex: null,
    };
  },
  methods: {
    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? null : index;
    },
  },
};
</script>

<style>
/* Custom Scrollbar for better UI */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 6px;
}
</style>