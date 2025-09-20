<script>
export default {
  data() {
    return {
      example: {
        title: '',
        description: '',
        link: '',
      },
      web: [
        {
          title: 'MyKeySig',
          description: `Using the spotify api, this project would allow a user to enter a song, playlist, or album and it would return the most recurring key.
          As of late 2024, spotify revoked access from developers to their part of the api that allowed this application to work and so it is no longer functional.`,
          link: 'https://github.com/IslandRhythms/MyKeySig',
          location: 'Github Repo',
        },
        {
          title: 'Udemy Website',
          description: `An ecommerce website I made while following a udemy course. Deployed to heroku but since heroku decided to revoke free access to their services,
          the website can no longer be viewed online.`,
          link: 'https://github.com/IslandRhythms/UdemyWebsite',
          location: 'Github Repo',
        },
        {
          title: 'My Website',
          description: `My personal website that I use to show off my projects and history. Technologies Used: Vue, Vue router, Vite`,
          link: 'https://github.com/IslandRhythms/IslandRhythms.github.io',
          location: 'Github Repo',
          home: 'https://islandrhythms.github.io/',
        },
      ],
    }
  },
}
</script>

<template>
  <div class="sector-view">
    <h2 class="text-center">Web Development</h2>
    <div class="accordion" id="web">
      <div class="accordion-item" v-for="project in web" :key="project.title">
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
          data-bs-parent="#web"
        >
          <div class="accordion-body">
            {{ project.description }} <br />
            <a :href="project.link">{{ project.location }}</a> <br />
            <div v-if="project.home">
              <a :href="project.home">Online View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sector-view {
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  box-sizing: border-box;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .sector-view {
    min-width: 280px;
    padding: 0 1rem;
    max-width: 100%;
  }
}
</style>
