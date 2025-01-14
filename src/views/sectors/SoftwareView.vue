<script>
export default {
  data() {
    return {
      example: {
        title: '',
        description: '',
        link: '',
        location: '',
      },
      software: [
        {
          title: 'Beat-Bot',
          description: `A discord bot I made for my discord server, as well as some friends servers, that has db integration with mongodb.
          Has games, utility, learning, music player, and a plethora of other categories that users can interact with. Currently hosted on a raspberry pi.
          Technologies used: Nodejs, Mongodb`,
          link: 'https://github.com/IslandRhythms/Beat-Bot',
          location: 'Github Repo',
        },
        {
          title: 'Unit Converter',
          description: `A simple java program uisng java swing that converts metric to metric, imperial to imperail, metric to imperial, and vice versa.
          3D printing requires converting inches to millimeters a lot so making an offline program to do that is quite helpful.`,
          link: 'https://github.com/IslandRhythms/UnitConverter',
          location: 'Github Repo',
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <h2>Software / App Development</h2>
    <div class="accordion" id="software">
      <div class="accordion-item" v-for="project in software" :key="project.title">
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
          data-bs-parent="#software"
        >
          <div class="accordion-body">
            {{ project.description }} <br />
            <a :href="project.link">{{ project.location }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
