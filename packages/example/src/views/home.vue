<template>
  <div class="sans-serif typography-test">
    <h1 class="sans-serif-bold">Lorem Ipsum Typography</h1>
    <div class="text-container">
      <h2 class="sans-serif-bold">Lorem Ipsum</h2>
      <p class="justified-text p1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <h3 class="sans-serif-bold">De Finibus Bonorum et Malorum</h3>
      <div class="sans-serif-italic">
        <p class="justified-text p2">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt.
        </p>
      </div>

      <h3 class="sans-serif-bold">De Finibus Bonorum et Malorum</h3>
      <div class="columns">
        <div class="sans-serif-italic">
          <p class="justified-text p3">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
        </div>

        <div class="test">
          <p class="justified-text p4 test">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root:lang(en) {
  --sans-serif-line-height: calc(var(--sans-serif-ascent) + var(--sans-serif-descent) + var(--sans-serif-line-gap));
  --sans-serif-bottom: var(--sans-serif-descent);
  --sans-serif-top: calc(var(--sans-serif-ascent) - var(--sans-serif-cap-height));
}

:root:lang(en) {
  background: yellow;
}

* {
  --computed-font-size: (var(--capital-height) / var(--sans-serif-cap-height));
  --computed-content-area: (var(--sans-serif-line-height) * var(--computed-font-size));
  --computed-vertical-align: ((var(--sans-serif-bottom) - var(--sans-serif-top)) * var(--computed-font-size));
  --computed-line-height: (
    (var(--line-height) * var(--capital-height)) - var(--computed-vertical-align)
  );
}

.typography-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1,
h2,
h3 {
  margin-bottom: 1.5rem;
  text-align: center;
}

h2 {
  font-size: 2em;
  color: #333;
}

h3 {
  font-size: 1.5em;
  color: #444;
  margin-top: 2rem;
}

.text-container {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.justified-text {
  text-align: justify;
  margin-bottom: 1.5rem;
}

.p1 {
  --line-height: 1.6;
  --capital-height: 12;

  font-size: calc(var(--computed-font-size) * 1px);
  line-height: calc(var(--computed-line-height) * 1px);
  /* vertical-align: calc(var(--computed-vertical-align) * -1px); */
}

.p2 {
  --line-height: 2.5;
  --capital-height: 14;

  font-size: calc(var(--computed-font-size) * 1px);
  line-height: calc(var(--computed-line-height) * 1px);
  /* vertical-align: calc(var(--computed-vertical-align) * -1px); */
}

.p3,
.p4 {
  --line-height: 2;
  --capital-height: 18;

  font-size: calc(var(--computed-font-size) * 1px);
  line-height: calc(var(--computed-line-height) * 1px);
}

.justified-text:last-child {
  margin-bottom: 0;
}

.columns {
  display: flex;
}
</style>
