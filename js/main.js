'use strict';

const addButton = document.getElementById('add'),
      unfinishedTask = document.getElementById('unfinished'),
      finishedTask = document.getElementById('finished'),
      valueTitle = document.getElementById('input-title'),
      buttonSort = document.getElementById('sort-priority'),
      valueTask = document.getElementById('input-task'),
      container = document.querySelector('.container');

addButton.onclick = (e) => {
  e.preventDefault();
  let task = valueTask.value,
      title = valueTitle.value;

  if (task) {
    addItem(title,task);
    valueTask.value = '';
    valueTitle.value = '';
  } else {alert('Add task, please.')}
};

buttonSort.onclick = sortPriority;


function sortPriority() {
  let unfinishedArr = [],
      finishedArr = [];

  // unfinishedTask
  for(let i=0; i<unfinishedTask.children.length; i++) {
    let el = unfinishedTask.children[i],
        select = el.querySelector('.todo__select');

    unfinishedArr.push({
      value: select.value,
      elem: el
    });
  }

  unfinishedArr.sort(function(a, b) {
    return a.value - b.value;
  });

  for (let i = 0; i < unfinishedArr.length; i++) {
    unfinishedTask.appendChild(unfinishedArr[i].elem);
  }

  // finishedTask
  for(let i=0; i<finishedTask.children.length; i++) {
    let el = finishedTask.children[i],
        select = el.querySelector('.todo__select');

    finishedArr.push({
      value: select.value,
      elem: el
    });
  }

  finishedArr.sort(function(a, b) {
    return a.value - b.value;
  });

  for (var i = 0; i < finishedArr.length; i++) {
    finishedTask.appendChild(finishedArr[i].elem);
  }
};

function addItem(title,task,completed) {
  let ul = (completed) ? finishedTask : unfinishedTask,
      li = document.createElement('li'),
      buttons = document.createElement('div'),
      // info = document.createElement('div'),
      name = document.createElement('span'),
      currentData = document.createElement('span'),
      edit = document.createElement('button'),
      remove = document.createElement('button'),
      input= document.createElement('input'),
      complete = document.createElement('button'),
      select = document.createElement('select'),
      
      data = new Date(),
      day = data.getDate(),
      m = data.getMonth() + 1,
      y = data.getFullYear(),
      h = data.getHours(),
      min = data.getMinutes();

  select.classList.add('todo__select');
  select.innerHTML = `<select name="priority" id="priority">
                        <option value="3">Hight</option>
                        <option value="2">Medium</option>
                        <option value="1">Low</option>
                      </select>`;

  input.type = 'text';
  input.classList.add('todo__task');
  input.innerText = task;
  input.placeholder = task;
  input.disabled = true;

  name.innerText = title;
  name.classList.add('todo__title');
  
  currentData.innerText = h + ":" + min + " " + day + ":" + m + ":" + y;
  currentData.classList.add('todo__date');

  li.append(name,currentData,select,input,buttons);
  li.classList.add('todo__item');

  buttons.classList.add('buttons');
  buttons.append(edit,remove,complete);

  remove.classList.add('button','remove');
  remove.onclick = removeItem;
  remove.innerText = 'Del';

  complete.classList.add('button','complete');
  complete.onclick = completeItem;
  complete.innerText = 'Complete'

  edit.classList.add('button','edit');
  edit.onclick = editItem;
  edit.innerText = 'Edit';
  
  ul.appendChild(li);
}

function removeItem() {
  let li = this.parentNode.parentNode,
      ul = li.parentNode;

  ul.removeChild(li);
}

function completeItem() {
  let li = this.parentNode.parentNode,
      ul = li.parentNode,
      id = ul.id;
  
  let currentUl = (id === 'unfinished') ? finishedTask : unfinishedTask; 

  ul.removeChild(li);
  currentUl.appendChild(li);
};

function editItem() {
  let li = this.parentNode.parentNode,
      input =  li.querySelector('input[type=text]');
  if(input.disabled) {
    input.disabled = false;
    input.value = input.placeholder;
    this.innerText = 'Save';
  } else {
    input.placeholder = input.value;
    input.disabled = true;
    this.innerText = 'Edit';
  }
}