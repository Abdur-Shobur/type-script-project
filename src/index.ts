import { v4 as uuidV4 } from 'uuid';
// console.log(uuidV4());
type Task = {
  id: string;
  tittle: string;
  createdAt: Date;
  completed: boolean;
};
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#input');

const tasks: Task[] = loadTask();
tasks.forEach(addListItem);
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    input?.value === '' ||
    input?.value === undefined ||
    input?.value === null
  )
    return;

  const data: Task = {
    id: uuidV4(),
    createdAt: new Date(),
    completed: false,
    tittle: input?.value,
  };
  tasks.push(data);
  saveTask();
  addListItem(data);

  input.value = '';
});

function addListItem(res: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkBox = document.createElement('input');
  checkBox.addEventListener('change', () => {
    res.completed = checkBox.checked;
    saveTask();
  });
  checkBox.type = 'checkbox';
  checkBox.checked = res.completed;
  label.append(checkBox, res?.tittle);
  item.append(label);
  list?.append(item);
}

function saveTask() {
  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function loadTask(): Task[] {
  let loadT = localStorage.getItem('Tasks');
  if (loadT === null) return [];
  return JSON.parse(loadT);
}
