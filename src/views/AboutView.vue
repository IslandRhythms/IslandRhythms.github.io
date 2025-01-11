<template>
  <div class="about">
    <h1>Education</h1>
    <div class="card">
      <img src="" />
      <div class="card-body">
        <h5 class="card-title">Bachelor of Science in Computer Science</h5>
        <p class="card-text">XYZ University</p>
        <p class="card-text"><small class="text-muted">Graduated: May 2020</small></p>
      </div>
    </div>
    <h1>Experience</h1>
    <ul class="list-group">
      <li class="list-group-item">
        <h5>Frontend Developer</h5>
        <p>ABC Corp, 2021 - Present</p>
        <p>Developed responsive web applications using React and Bootstrap.</p>
      </li>
      <li class="list-group-item">
        <h5>Web Developer Intern</h5>
        <p>DEF Tech, 2020 - 2021</p>
        <p>Assisted in creating landing pages and debugging UI issues.</p>
      </li>
    </ul>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-icon bg-primary"></div>
        <div class="timeline-content">
          <h5 class="mb-1">Graduated</h5>
          <p class="text-muted">May 2020</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-icon bg-success"></div>
        <div class="timeline-content">
          <h5 class="mb-1">Internship</h5>
          <p class="text-muted">2020 - 2021</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-icon bg-info"></div>
        <div class="timeline-content">
          <h5 class="mb-1">First Job</h5>
          <p class="text-muted">2021 - Present</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  padding-top: 50px;
  position: relative;
  padding-left: 30px;
  border-left: 2px solid #e0e0e0;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
}

.timeline-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  left: -10px;
  top: 0;
}

.timeline-content {
  margin-left: 40px;
}
</style>
