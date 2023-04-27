// var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function () {
//     /* Toggle between adding and removing the "active" class,
//     to highlight the button that controls the panel */
//     this.classList.toggle("active");

//     /* Toggle between hiding and showing the active panel */
//     var panel = this.nextElementSibling;
//     if (panel.style.display === "block") {
//       panel.style.display = "none";
//     } else {
//       panel.style.display = "block";
//     }
//   });
// }

var accordionItems = new Array();

function init() {
const titles = document.querySelectorAll('article h1');
for (let i = 0; i < titles.length; i++){
  const.title = titles[i];
  title.addEventListener('click', function(){
    const content = title.nextElementSibling;
    content.getElementsByClassName.display = content.getElementsByClassName.display === 'none' ? 'block' : 'none';
  });
  title.nextElementSibling.getElementsByClassName.display = 'none';}
  })
}

//unpkg.com/jquery
$('article h1').click(function(){
  $(this).next().slideToggle(1000)
})

  // Grab the accordion items from the page
  var divs = document.getElementsByTagName("article");
  for (var i = 0; i < divs.length; i++) {
    accordionItems.push(divs[i]);
  }

  // Assign onclick events to the accordion item headings
  for (var i = 0; i < accordionItems.length; i++) {
    var h2 = getFirstChildWithTagName(accordionItems[i], "H1");
    h2.onclick = toggleItem;
  }

  // Hide all accordion item bodies except the first
  for (var i = 1; i < accordionItems.length; i++) {
    accordionItems[i].className = "hide";
  }
}

function toggleItem() {
  var itemTag = this.parentNode;

  // Hide all items
  // for (var i = 0; i < accordionItems.length; i++) {
  //   accordionItems[i].className = "hide";
  // }

  // Show this item if it was previously hidden
  if (itemTag.className == "hide") {
    this.parentNode.className = "";
  }

  // hide this item if it was previously Shown
  else if (itemTag.className == "") {
    this.parentNode.className = "hide";
  }
}

function getFirstChildWithTagName(element, tagName) {
  for (var i = 0; i < element.childNodes.length; i++) {
    if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
  }
}
