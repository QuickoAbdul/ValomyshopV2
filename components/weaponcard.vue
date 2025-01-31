<template>
  <a 
    href="" 
    class="relative p-8 overflow-hidden text-white shadow-lg group rounded-3xl h-58 w-100 bg-white transition-all duration-300"
    :class="hoverBgColor"
  >
    <div class="absolute font-bold transition-all top-4 right-6 text-gray-800/30 group-hover:text-white z-20">
      {{ themename }}
    </div>
    <p class="text-2xl font-bold tracking-wider text-black z-20">{{ title }}</p>
    <ul class="flex flex-col gap-3 mt-4">
      <li class="px-4 py-1 text-sm font-semibold bg-white/30 rounded-xl w-fit text-black z-20  transition-all duration-300"
      :class="hoverTextBg">{{ contentTier }}</li>
    </ul>
    <img :src="contentTierLogo" alt="Pokeball icon"
      class="absolute transition-all duration-300 ease w-22 h-22 group-hover:rotate-60 bottom-2 left-4 z-20">
    <img class="absolute w-auto h-35 bottom-2 right-1 group-hover:scale-110 transition-all z-10" 
      :src="imagesweapon"
      alt="Picture of image weapon">
  </a>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    imagesweapon: { type: String, required: true },
    contentTier: { type: String, required: true },
    contentTierLogo: { type: String, required: true },
    themename: { type: String, required: true },
  },
  computed: {
    hoverBgColor() {
      const colors = {
        "Deluxe Edition": "hover:bg-emerald-200",
        "Exclusive Edition": "hover:bg-orange-200",
        "Premium Edition": "hover:bg-pink-200",
        "Select Edition": "hover:bg-blue-200",
        "Ultra Edition": "hover:bg-yellow-200",
      };
      return colors[this.contentTier] || "group-hover:bg-white"; // Blanc par défaut
    },
     hoverTextBg() {
      const colors = {
        "Deluxe Edition": "group-hover:bg-emerald-400",
        "Exclusive Edition": "group-hover:bg-orange-400",
        "Premium Edition": "group-hover:bg-pink-400",
        "Select Edition": "group-hover:bg-blue-400",
        "Ultra Edition": "group-hover:bg-yellow-400",
      };
      return colors[this.contentTier] || "group-hover:bg-white"; // Noir en background + texte blanc au hover
    },
  },
};
</script>
