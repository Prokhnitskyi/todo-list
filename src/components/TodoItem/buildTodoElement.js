export function buildTodoElement({item, blueprint, color}) {
  const todo = blueprint.cloneNode(true);
  todo.querySelector('.todo').dataset.uuid = item.uuid;
  todo.querySelector(
    '.todo').style.border = `2px solid ${color}`;
  todo.querySelector('.todo__title').textContent = item.title;
  todo.querySelector('.todo__description').textContent = item.description;
  todo.querySelector('.todo__priority-value').textContent = item.priority;
  if (item.URL) {
    todo.querySelector('.todo__url a').textContent = item.URL;
    todo.querySelector('.todo__url a').href = item.URL;
  } else {
    todo.querySelector('.todo__url').remove();
  }
  if (item.dueDate) {
    const time = item.dueDate;
    todo.querySelector('.todo__due-date time').
      setAttribute('datetime', time);
    todo.querySelector('.todo__due-date time').textContent = `${time} UTC`;
  } else {
    todo.querySelector('.todo__due-date').remove();
  }
  todo.querySelector('.todo__tags').innerHTML = item.tags.map(tag => (
    `<span class="todo__tag">${tag}</span>`
  )).join('');

  if (item.completed) {
    todo.querySelector('.todo__completed').classList.add('todo__completed--active');
  }
  if (item.flag) {
    todo.querySelector('.todo__flag').classList.add('todo__flag--active');
  }

  return todo;
}