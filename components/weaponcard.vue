<template>
  <a href="" class="relative p-8 overflow-hidden text-white shadow-lg group rounded-3xl h-52 w-80 bg-red">
    <div class="absolute font-bold transition-all top-4 right-6 text-gray-800/30 group-hover:text-white">#001</div>
    <p class="text-2xl font-bold tracking-wider text-black">{{ title }}</p>
    <ul class="flex flex-col gap-3 mt-4">
      <li class="px-4 py-1 text-sm font-semibold bg-white/30 rounded-xl w-fit text-black">Arme</li>
      <li class="px-4 py-1 text-sm font-semibold bg-white/30 rounded-xl w-fit text-black">{{ contentTier }}</li>
    </ul>
    <img :src="contentTierLogo" alt="Pokeball icon"
      class="absolute transition-all duration-300 ease w-44 h-44 -right-3 -bottom-8 group-hover:rotate-45">
    <img class="absolute w-auto h-40 bottom-1 right-1 group-hover:scale-110 transition-all" :src="imagesweapon"
      alt="Picture of bulbasaur">
  </a>
</template> 

 <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      imagesweapon: {
        type: String,
        required: true,
      },
      contentTier: {
        type: String,
        required: true,
      },
      contentTierLogo: {
        type: String,
        required: true,
      }
    }
}
</script>