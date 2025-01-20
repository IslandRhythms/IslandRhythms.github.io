<template>
  <div class="d-flex container justify-content-center align-items-center my-4 text-center w-50">
    Have questions, ideas, or just want to say hi? Fill out the form below, and I’ll get back to you
    as soon as possible. I’m looking forward to hearing from you!
  </div>
  <form action="https://formspree.io/f/xannvqvp" method="POST" class="container mt-4 w-50">
    <div class="mb-3">
      <label for="email" class="form-label">Your email:</label>
      <input type="email" name="email" id="email" class="form-control" required />
    </div>
    <div class="mb-3">
      <label for="message" class="form-label">Your message:</label>
      <textarea name="message" id="message" class="form-control" rows="4" required></textarea>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-primary">Send</button>
    </div>
  </form>
</template>
