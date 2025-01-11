<template>
  <div>
    <h2>Web Development</h2>
    <div class="accordion" id="web">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne-web">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne-web"
            aria-expanded="false"
            aria-controls="collapseOne-web"
          >
            Collapsible Item #1
          </button>
        </h2>
        <div
          id="collapseOne-web"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne-web"
          data-bs-parent="#web"
        >
          <div class="accordion-body">This is the first item's accordion body.</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo-web">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo-web"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Collapsible Item #2
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo-web"
          data-bs-parent="#web"
        >
          <div class="accordion-body">This is the second item's accordion body.</div>
        </div>
      </div>
    </div>
  </div>
</template>
