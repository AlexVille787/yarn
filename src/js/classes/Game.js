import Goblin from "./Goblin";
import Score from "./Score";
import Board from "./Board";

export default class Game {
  constructor() {
    this.board = new Board();
    this.goblin = new Goblin();
    this.score = new Score();
    this.misses = 0;
    this.maxMisses = 5;
    this.isRunning = false;
    this.intervalId = null;
    this.currentPosition = null;
    this.goblinVisible = false;
    this.isProcessing = false; // Флаг для предотвращения множественных кликов
    this.clickHandler = this.handleCellClick.bind(this);
  }

  init() {
    this.board.createGrid();
    this.score.render();
    this.setupEventListeners();
    this.start();
  }

  setupEventListeners() {
    this.board.getCells().forEach((cell) => {
      cell.addEventListener("click", this.clickHandler);
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isProcessing = false;
    this.misses = 0;
    this.score.reset();
    this.showGoblin();
    this.intervalId = setInterval(() => {
      this.nextTurn();
    }, 1000);
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.hideGoblin();
    this.score.render();
  }

  nextTurn() {
    if (!this.isRunning || this.isProcessing) return;

    // Если гоблин был видим и его не поймали - засчитываем промах
    if (this.goblinVisible && this.currentPosition !== null) {
      this.misses++;
      this.score.addMiss();

      // Показываем эффект промаха на ячейке
      const cell = this.board.getCell(this.currentPosition);
      if (cell) {
        cell.classList.add("miss");
        setTimeout(() => {
          cell.classList.remove("miss");
        }, 300);
      }

      this.hideGoblin();

      // Проверяем, не достигнут ли лимит промахов
      if (this.misses >= this.maxMisses) {
        this.endGame();
        return;
      }
    }

    // Показываем гоблина в новой позиции
    this.showGoblin();
  }

  showGoblin() {
    if (!this.isRunning) return;
    if (this.isProcessing) return;

    // Получаем все доступные позиции
    const availablePositions = this.board.getAvailablePositions(
      this.currentPosition,
    );

    // Если гоблин был видим, скрываем его
    if (this.goblinVisible) {
      this.hideGoblin();
    }

    // Если нет доступных позиций - выходим
    if (availablePositions.length === 0) {
      return;
    }

    // Выбираем случайную позицию
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const newPosition = availablePositions[randomIndex];

    // Показываем гоблина
    this.board.placeGoblin(newPosition, this.goblin.getElement());
    this.currentPosition = newPosition;
    this.goblinVisible = true;
  }

  hideGoblin() {
    if (this.currentPosition !== null) {
      this.board.removeGoblin(this.currentPosition);
      this.currentPosition = null;
      this.goblinVisible = false;
    }
  }

  handleCellClick(event) {
    const cell = event.currentTarget;
    const index = parseInt(cell.dataset.index, 10);

    // Проверяем условия для попадания
    if (!this.isRunning) return;
    if (this.isProcessing) return;
    if (!this.goblinVisible) return;
    if (index !== this.currentPosition) return;

    // Блокируем обработку
    this.isProcessing = true;

    // ПОПАДАНИЕ! 🎯
    this.score.addHit();

    // Показываем эффект попадания
    cell.classList.add("hit");
    setTimeout(() => {
      cell.classList.remove("hit");
    }, 300);

    // Скрываем гоблина
    this.hideGoblin();

    // Разблокируем обработку и НЕ показываем гоблина сразу
    // Он появится только по следующему тику таймера
    setTimeout(() => {
      this.isProcessing = false;
    }, 200);
  }

  endGame() {
    this.stop();
    this.board.showGameOver(this.score.getHits());
  }
}
