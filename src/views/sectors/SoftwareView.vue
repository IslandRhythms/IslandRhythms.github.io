<template>
  <div>
    <h2>Software Development</h2>
    <div class="accordion" id="software">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne-software">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne-software"
            aria-expanded="false"
            aria-controls="collapseOne-software"
          >
            Collapsible Item #1
          </button>
        </h2>
        <div
          id="collapseOne-software"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne-software"
          data-bs-parent="#software"
        >
          <div class="accordion-body">This is the first item's accordion body.</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo-software">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo-software"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Collapsible Item #2
          </button>
        </h2>
        <div
          id="collapseTwo-software"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo-software"
          data-bs-parent="#software"
        >
          <div class="accordion-body">This is the second item's accordion body.</div>
        </div>
      </div>
    </div>
  </div>
</template>
