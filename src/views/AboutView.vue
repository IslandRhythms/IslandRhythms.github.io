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
        bulletPoints:[]
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
          bulletPoints:[
            'Authored two articles weekly teaching new subjects published on https://masteringjs.io , contributing to community knowledge and engagement.',
            'Partnered with the lead maintainer of Mongoose.js to develop new features and release enhancements, supporting a library with over 1 million weekly downloads.',
            'Investigated and resolved over 1,000 bug reports for Mongoose.js, enhancing library reliability.',
            'Consulted with clients to deliver tailored solutions using the V.E.N.M. stack (Vue.js, Express.js, Node.js, MongoDB), aligning technology with business needs.'
          ]
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
      <div class="about-card-section">
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
      </div>
      <div class="about-card-section">
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
              <ul>
                <li v-for="point in ex.bulletPoints">
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.resume {
  max-width: 600px;
  min-width: 320px;
  margin: auto;
  margin-top: 2em;
  width: 100%;
  box-sizing: border-box;
}

.about-intro {
  max-width: 500px;
  min-width: 320px;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
}

.about-card-section {
  margin-bottom: 2em;
}

.about-card-section h1 {
  text-align: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 1rem;
}

.card-img-left {
  width: 100px; /* Set a fixed width for the image */
  height: auto; /* Maintain aspect ratio */
  margin-bottom: 1rem; /* Add space between image and text */
}

.card-body {
  flex: 1; /* Allow the text to take the remaining space */
  padding: 1rem;
}

/* Ensure cards don't get too cramped on small screens */
@media (max-width: 480px) {
  .resume {
    min-width: 280px;
    padding: 0 1rem;
    max-width: 100%;
  }
  
  .about-intro {
    min-width: 280px;
    padding: 0 1rem;
    max-width: 100%;
  }
}
</style>
