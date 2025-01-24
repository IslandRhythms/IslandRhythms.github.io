<script>
export default {
  data() {
    return {
      example: {
        title: '',
        timeFrame: '',
        imgLink: '',
        origin: '',
        skills: [],
      },
      education: [
        {
          title: 'Bachelor of Science in Computer Science',
          timeFrame: 'Aug 2016 - May 2020',
          imgLink: '/University-Of-Miami-Symbol.png',
          origin: 'University of Miami',
          skills: ['Java', 'C', 'C#', 'Unity', 'Python', 'SQL', 'Linux command line'],
        },
      ],
      experience: [
        {
          title: 'Software Engineer',
          timeFrame: 'Jan 2021',
          imgLink: '/MeanIT.png',
          origin: 'MeanIt Software',
          skills: [
            'Javascript',
            'Vue.js',
            'HTML',
            'CSS',
            'Bootstrap',
            'TailwindCSS',
            'Express.js',
            'Node.js',
            'NPM',
            'MongoDB',
            'Mongoose.js',
            'Mocha.js',
            'Cloudinary',
            'Stripe.js',
            'Twilio',
            'Persona',
            'Netlify',
            'Webpack',
            'Postman',
            'Git',
            'GitBash',
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <div class="about">
    <div class="text-center about-intro">
      On this page, I'll share the background and experiences that have shaped my career as a web developer.
      From my education to my professional journey,
      this is where you can learn more about the path I've taken to build the skills and expertise I bring to my work today.
    </div>
    <div class="resume">
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
            <p class="card-text"><strong>Skills:</strong> {{ ed.skills.join(', ') }}</p>
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
            <p class="card-text"><strong>Skills:</strong> {{ ex.skills.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.resume {
  max-width: 600px;
  margin: auto;
}

.about-intro {
  max-width: 500px;
  margin: auto;
}

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
