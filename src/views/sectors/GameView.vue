<script>
export default {
  data() {
    return {
      example: {
        title: '',
        description: '',
        link: '',
      },
      game: [
        {
          title: 'The Grim Shredder',
          description: `A game I created using unity during my introduction to game programming class.`,
          link: 'https://github.com/IslandRhythms/CSC329',
          location: 'Github Repo',
        },
        {
          title: 'XCOM 2 Modding',
          description: `A collection of mods I have made to enhace the QOL while playing XCOM 2. Very challenging as documentation for how to mod this game is very poor.
          Every item shown in the steam list has a github repo on my profile`,
          link: 'https://steamcommunity.com/profiles/76561198216752133/myworkshopfiles/',
          location: 'Steam',
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <h2>Game Development</h2>
    <div class="accordion" id="game">
      <div class="accordion-item" v-for="project in game" :key="project.title">
        <h2 class="accordion-header" :id="project.title">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#${project.link}`"
            aria-expanded="false"
            :aria-controls="project.link"
          >
            {{ project.title }}
          </button>
        </h2>
        <div
          :id="project.link"
          class="accordion-collapse collapse"
          :aria-labelledby="project.title"
          data-bs-parent="#game"
        >
          <div class="accordion-body">
            {{ project.description }} <br />
            <a :href="project.link">{{ project.location }}</a>
            <div v-if="project.title == 'The Grim Shredder'">
              <iframe src="https://itch.io/embed/637364" height="167" width="552" frameborder="0">
                <a href="https://theislandrhythm.itch.io/the-grim-shredder"
                  >The Grim Shredder by TheIslandRhythm</a
                >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
