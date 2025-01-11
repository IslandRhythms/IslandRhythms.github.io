<script>
export default {
  data() {
    return {
      example: {
        title: '',
        timeFrame: '',
        imgLink: '',
        origin: '',
      },
      education: [
        {
          title: 'Bachelor of Science in Computer Science',
          timeFrame: 'Aug 2016 - May 2020',
          imgLink: '/University-Of-Miami-Symbol.png',
          origin: 'University of Miami',
        },
      ],
      experience: [
        {
          title: 'Software Engineer',
          timeFrame: 'Jan 2021',
          imgLink: '/MeanIT.png',
          origin: 'MeanIt Software',
        },
      ],
    }
  },
}
</script>

<template>
  <div class="about">
    <h1>Education</h1>
    <div class="card" v-for="ed in education" :key="ed.imgLink">
      <div class="card-content">
        <img :src="ed.imgLink" class="card-img-left" />
        <div class="card-body">
          <h5 class="card-title">{{ ed.title }}</h5>
          <p class="card-text">{{ ed.origin }}</p>
          <p class="card-text">
            <small class="text-muted">{{ ed.timeFrame }}</small>
          </p>
        </div>
      </div>
    </div>
    <h1>Experience</h1>
    <div class="card">
      <div class="card-content" v-for="ex in experience" :key="ex.imgLink">
        <img src="/MeanIT.png" class="card-img-left" />
        <div class="card-body">
          <h5 class="card-title">{{ ex.title }}</h5>
          <p class="card-text">{{ ex.origin }}</p>
          <p class="card-text">
            <small class="text-muted">{{ ex.timeFrame }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-content {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Center items vertically */
}

.card-img-left {
  width: 100px; /* Set a fixed width for the image */
  height: auto; /* Maintain aspect ratio */
  margin-right: 1rem; /* Add space between image and text */
  margin-left: 1rem;
}

.card-body {
  flex: 1; /* Allow the text to take the remaining space */
}
</style>
