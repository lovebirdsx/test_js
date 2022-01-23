import { XMLHttpRequest } from 'xmlhttprequest';

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
    }
};
xhttp.open("GET", "https://www.sqlite.org/about.html", true);
xhttp.send();