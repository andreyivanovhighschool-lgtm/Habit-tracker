// Масив за съхранение на навиците
let habits = [];
let nextId = 1;

// Функция за рендиране на списъка
function render() {
  const list = document.getElementById('habit-list');
  const emptyMsg = document.getElementById('empty-msg');

  list.innerHTML = '';

  // Ако няма навици, показваме съобщение
  if (habits.length === 0) {
    list.appendChild(emptyMsg);
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';

    // Цикъл за всеки навик
    for (let i = 0; i < habits.length; i++) {
      const h = habits[i];

      const card = document.createElement('div');
      card.className = 'habit-card' + (h.done ? ' done' : '');

      const checkBtn = document.createElement('button');
      checkBtn.className = 'check-btn';
      checkBtn.textContent = h.done ? '✓' : '';
      checkBtn.setAttribute('data-id', h.id);
      checkBtn.onclick = function() { toggle(h.id); };

      const nameSpan = document.createElement('span');
      nameSpan.className = 'habit-name';
      nameSpan.textContent = h.name;

      const delBtn = document.createElement('button');
      delBtn.className = 'del-btn';
      delBtn.textContent = '×';
      delBtn.setAttribute('data-id', h.id);
      delBtn.onclick = function() { deleteHabit(h.id); };

      card.appendChild(checkBtn);
      card.appendChild(nameSpan);
      card.appendChild(delBtn);
      list.appendChild(card);
    }
  }

  updateProgress();
}

// Обновяване на прогрес бара
function updateProgress() {
  const done = habits.filter(function(h) { return h.done; }).length;
  const total = habits.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById('prog-bar').style.width = pct + '%';
  document.getElementById('prog-label').textContent =
    done + ' / ' + total + ' изпълнени (' + pct + '%)';
}

// Добавяне на навик
function addHabit() {
  const input = document.getElementById('habit-input');
  const name = input.value.trim();

  if (name === '') return; // Ако полето е празно, не правим нищо

  habits.push({ id: nextId, name: name, done: false });
  nextId++;
  input.value = '';
  render();
}

// Превключване на статус (изпълнен / неизпълнен)
function toggle(id) {
  for (let i = 0; i < habits.length; i++) {
    if (habits[i].id === id) {
      habits[i].done = !habits[i].done;
      break;
    }
  }
  render();
}

// Изтриване на навик
function deleteHabit(id) {
  habits = habits.filter(function(h) { return h.id !== id; });
  render();
}

// Enter клавиш за добавяне
document.getElementById('habit-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addHabit();
  }
});

// Стартираме с начален рендер
render();