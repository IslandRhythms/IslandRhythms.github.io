<template>
  <div>
    <h2>Game Development</h2>
    <div class="accordion" id="game">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne-game">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne-game"
            aria-expanded="false"
            aria-controls="collapseOne-game"
          >
            Collapsible Item #1
          </button>
        </h2>
        <div
          id="collapseOne-game"
          class="accordion-collapse collapse"
          aria-labelledby="headingOne-game"
          data-bs-parent="#game"
        >
          <div class="accordion-body">This is the first item's accordion body.</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo-game">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo-game"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Collapsible Item #2
          </button>
        </h2>
        <div
          id="collapseTwo-game"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo-game"
          data-bs-parent="#game"
        >
          <div class="accordion-body">This is the second item's accordion body.</div>
        </div>
      </div>
    </div>
  </div>
</template>
