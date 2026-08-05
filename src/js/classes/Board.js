export default class Board {
  constructor() {
    this.gridSize = 4;
    this.field = document.getElementById("gameField");
    this.cells = [];
  }

  createGrid() {
    this.field.innerHTML = "";
    this.cells = [];

    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      this.field.appendChild(cell);
      this.cells.push(cell);
    }
  }

  getCells() {
    return this.cells;
  }

  getCell(index) {
    return this.cells[index];
  }

  getAvailablePositions(currentPosition) {
    return this.cells
      .map((_, index) => index)
      .filter((index) => index !== currentPosition);
  }

  placeGoblin(position, goblinElement) {
    const cell = this.getCell(position);
    if (!cell) return;

    const goblinClone = goblinElement.cloneNode(true);
    cell.appendChild(goblinClone);
    cell.classList.add("has-goblin");
  }

  removeGoblin(position) {
    const cell = this.getCell(position);
    if (!cell) return;

    const goblin = cell.querySelector(".goblin");
    if (goblin) {
      goblin.remove();
    }
    cell.classList.remove("has-goblin");
  }

  showGameOver(finalScore) {
    const overlay = document.createElement("div");
    overlay.className = "game-over-overlay";
    overlay.innerHTML = `
      <div class="game-over-content">
        <h2>Игра окончена!</h2>
        <p>Вы пропустили 5 гоблинов</p>
        <p class="final-score">Счет: <span id="finalScore">${finalScore}</span></p>
        <button id="restartBtn">Играть снова</button>
      </div>
    `;
    this.field.appendChild(overlay);

    const restartBtn = overlay.querySelector("#restartBtn");
    restartBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }
}
