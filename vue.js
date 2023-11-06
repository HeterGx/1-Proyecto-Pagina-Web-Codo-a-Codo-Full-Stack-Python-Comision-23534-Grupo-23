


const app = Vue.createApp({
    data() {
      return {
        numero: "",
        historial: [],
        pokemon: null
      };
    },
    computed: {
      tipos() {
        return this.pokemon.types.map((tipo) => tipo.type.name).join(", ");
      }
    },
    methods: {
      async buscarPokemon() {
        const numero = this.numero.trim();
        if (!numero) return;

        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
          const data = await response.json();

          this.pokemon = data;
          this.historial.push({ id: data.id, nombre: data.name });

          if (this.historial.length > 5) {
            this.historial.shift();
          }
        } catch (error) {
          console.error("Error al buscar el Pokémon", error);
        }
      },
      seleccionarPokemon(id) {
        this.numero = id;
        this.buscarPokemon();
      },
      limpiarHistorial() {
        this.historial = [];
      }
    }
  });

  app.mount("#app");