document.getElementById('generateBtn').addEventListener('click', () => {
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'This is a new paragraph';

    document.getElementById('content').appendChild(newParagraph);
});
