<template>
  <div class="typography-test">
    <h1>Custom Text Typography</h1>
    <div class="text-container">
      <p class="justified-text">
        The zebra jumps quickly over a fence, vexed by a lazy ox. Eden tries to alter soft stone
        near it. Tall giants often need to rest, and open roads invite no pause. Some long lines
        appear there. In bright cold night, stars drift, and people watch them. A few near doors
        step out. Much light finds land slowly, while men feel deep quiet. Words run in ways,
        forward yet true. Look ahead, and things form still, yet dreams stay hidden. Down the path,
        close skies come, forming hard arcs. High above, quiet kites drift, fast on pure wind,
        yanking joints.
      </p>
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: test;
  src: local(Avenir Black);
}

.typography-test {
  font-synthesis: none;
  font-weight: 400;
  font-style: italic;
  font-family: test;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
}

.text-container {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.justified-text {
  /* text-align: justify; */
  line-height: 1.6;
  margin: 0;
}
</style>
