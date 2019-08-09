<template>
  <div v-if="character" :class="$style.characterDescription">
    <table :class="$style.textInfoTable">
      <tbody>
        <template v-for="(value, key) in character">
          <tr :class="$style.textInfoTableRow" :key="key" v-if="!hide[key]">
            <td :class="$style.textInfoTableTdTitle">{{ titleMap[key] }}:</td>
            <td>
              {{ getCharacterValue(key) }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_CHARACTERS, GET_PLANETS } from '../store';

export default {
  data() {
    return {
      /** Titles for keys in Character object */
      titleMap: {
        birthYear: 'Birth year',
        eyeColor: 'Eye color',
        gender: 'Gender',
        height: 'Height',
        homeworldId: 'Home planet',
        id: 'ID',
        mass: 'Mass',
        name: 'Name',
        skinColor: 'Skin color',
      },
      /** Is field should be hidden */
      hide: {
        id: true,
      },
    };
  },
  methods: {
    ...mapActions({ getCharacters: GET_CHARACTERS, getPlanets: GET_PLANETS }),
  },
  computed: {
    ...mapGetters(['getCharactersById', 'characters', 'planets', 'getPlanetsById']),
    /** Selected character */
    character() {
      return this.getCharactersById(+this.$route.params.id);
    },
    /** Get value for key in character */
    getCharacterValue() {
      return (key) => {
        if (key !== 'homeworldId') {
          return this.character[key];
        }
        const planet = this.getPlanetsById(this.character.homeworldId);
        return planet ? planet.name : '';
      };
    },
  },
  mounted() {
    if (!this.characters.length) {
      this.getCharacters();
    }
    if (!this.planets.length) {
      this.getPlanets();
    }
  },
};
</script>
<style module>
.textInfoTableTdTitle {
  font-weight: bold;
}
.textInfoTable td {
  padding: 0.5rem;
}
.textInfoTable {
  border-collapse: collapse;
  width: 100%;
}
.textInfoTableRow {
  border-bottom: 0.1rem solid #ff4c4c;
}
.textInfoTableRow:hover {
  opacity: 0.5;
}
.characterDescription {
  margin: 0 auto;
  padding: 3rem;
  width: 40%;
}
@media screen and (max-width: 1000px) {
  .characterDescription {
    width: 100%;
    padding: 0;
  }
}
</style>
