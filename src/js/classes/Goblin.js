import goblinImage from "../../img/goblin.png";

export default class Goblin {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const img = document.createElement("img");
    img.className = "goblin";
    img.src = goblinImage;
    img.alt = "Гоблин";
    img.draggable = false;

    img.onerror = () => {
      console.warn("Не удалось загрузить изображение гоблина.");
      img.style.backgroundColor = "#e74c3c";
      img.style.borderRadius = "50%";
      img.style.width = "80%";
      img.style.height = "80%";
      img.style.margin = "10%";
      img.alt = "Гоблин (текст)";
    };

    return img;
  }

  getElement() {
    return this.element;
  }
}
