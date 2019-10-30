function home(id) {

    var homeContent = `
      <p>
        This is the Home Page Content.
      </p>
    
      <p>
        To test, click on ...
      </p>
    `;
    document.getElementById(id).innerHTML = homeContent;
}