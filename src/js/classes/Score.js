export default class Score {
  constructor() {
    this.hits = 0;
    this.misses = 0;
    this.container = document.getElementById("scoreContainer");
    this.hitsElement = null;
    this.missesElement = null;
  }

  render() {
    if (this.container) {
      this.container.innerHTML = `
        <div class="score">
          <div class="score-item">
            <span class="score-label">Попаданий:</span>
            <span class="score-value hits">${this.hits}</span>
          </div>
          <div class="score-item">
            <span class="score-label">Промахов:</span>
            <span class="score-value misses">${this.misses} / 5</span>
          </div>
        </div>
      `;

      this.hitsElement = this.container.querySelector(".hits");
      this.missesElement = this.container.querySelector(".misses");
    }
  }

  addHit() {
    this.hits++;
    if (this.hitsElement) {
      this.hitsElement.textContent = this.hits;
    }
  }

  addMiss() {
    this.misses++;
    if (this.missesElement) {
      this.missesElement.textContent = `${this.misses} / 5`;
    }
  }

  reset() {
    this.hits = 0;
    this.misses = 0;
    this.render();
  }

  getHits() {
    return this.hits;
  }

  getMisses() {
    return this.misses;
  }
}
