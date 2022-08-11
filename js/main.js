const change = (element, text) => {
  var active = document.getElementById('active');
  active.removeAttribute('id')
  element.setAttribute('id', 'active')
  // element.parentNode.parentNode.style.transition = "background-image 0.3s"
  element.parentNode.parentNode.style.backgroundImage = 
  `url(${element.children[0].src})`;
  element.parentNode.parentNode.children[0].children[0].innerHTML = text


  // element.addEventListener('transitionend', () => {
  //   element.parentNode.parentNode.style.backgroundImage = 
  //   `linear-gradient(
  //     rgba(0, 0, 0, 0.2), 
  //     rgba(0, 0, 0, 0.2)
  //   ),
  //   url(${element.children[0].src})`;
  // });
}