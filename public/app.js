var title = document.getElementById('title');
var text = document.getElementById('text');
var form = document.getElementById('submit-form');

function onFormSubmit(e) {
    e.preventDefault();

    window.fetch('http://picklejoke.me/jokes', {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({title: title.value, text: text.value})
    }).then(resp => {
        resp.json().then(j => {
            // create a new element
            var responseDiv = document.createElement('div');
            // set inner html
            responseDiv.innerHTML = j.message;
            form.appendChild(responseDiv);
        });
    });


}

form.addEventListener('submit', onFormSubmit);
