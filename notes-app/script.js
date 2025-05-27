const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('search');
const userNameInput = document.getElementById('userName');

let notes = [];

addNoteBtn.addEventListener('click', () => {
  const date = new Date().toLocaleString();
  const newNote = { title: 'Note Title', content: '', date };
  notes.push(newNote);
  saveNotes();
  renderNotes(notes);
});

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(notesToRender) {
  notesContainer.innerHTML = '';
  notesToRender.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';

    const titleInput = document.createElement('input');
    titleInput.className = 'title';
    titleInput.value = note.title;
    titleInput.addEventListener('input', (e) => {
      notes[index].title = e.target.value;
      saveNotes();
    });

    const contentArea = document.createElement('textarea');
    contentArea.className = 'content';
    contentArea.value = note.content;
    contentArea.addEventListener('input', (e) => {
      notes[index].content = e.target.value;
      saveNotes();
    });

    const dateP = document.createElement('p');
    dateP.className = 'date';
    dateP.textContent = `Created: ${note.date}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes(notes);
    });

    noteDiv.appendChild(titleInput);
    noteDiv.appendChild(contentArea);
    noteDiv.appendChild(dateP);
    noteDiv.appendChild(deleteBtn);

    notesContainer.appendChild(noteDiv);
  });
}

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchText) ||
    note.content.toLowerCase().includes(searchText)
  );
  renderNotes(filteredNotes);
});
