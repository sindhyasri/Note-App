// Get references to DOM elements
const addNoteBtn = document.getElementById('addNoteBtn');
const noteContainer = document.getElementById('noteContainer');

// Load saved notes from localStorage
loadNotes();

// Add event listener for the Add Note button
addNoteBtn.addEventListener('click', addNote);

// Function to add a new note
function addNote() {
    const note = createNoteElement('');
    noteContainer.appendChild(note);
    saveNotes();
}

// Function to create a new note element
function createNoteElement(text) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.placeholder = 'Enter your note...';
    textarea.addEventListener('input', saveNotes);  // Save changes on input

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        noteDiv.remove();
        saveNotes();  // Save after deletion
    });

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(deleteBtn);

    return noteDiv;
}

// Function to save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note textarea').forEach(note => {
        notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(noteText => {
        const note = createNoteElement(noteText);
        noteContainer.appendChild(note);
    });
}
