$( document ).ready(async function() {
    makeColorWheel();
    const projectList = await getProjects();
    fillProjectSelect(projectList);
    displayProjects(projectList);
});

$("#generate-new").click(function() {
  makeColorWheel();
})

$("#save-new-project").submit(function() {
  saveProjectToDb();
})

$("#pal-save").click(function(event) {
  event.preventDefault();
  let palette = {};
  palette["title"] = $("#palette-name").val();
  for (let i=0; i<=4; i++) {
    palette["color" + i] = $("#d" + i).css("border-top-color")
  }
  console.log(palette);
})

function makeColorWheel() {
  for (var i=0; i<5; i++) {
    let fillColor = randomHexColor();
    let b = i*71
		let color = `
    <div class="color-slice" id="d${i}" style="border-top-color: ${fillColor}; transform: rotate(${i + b}deg);">
      <div class="color-slice-info" id="lock${i}">🔒</div>
    </div>`;

	  $('#colorwheel').append(color)
  };
}

function randomHexColor() {
  return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}

function colorSliceInfo(slice) {
   slice.append(`<div class="color-slice-info">🔒</div>`)
}

function fillProjectSelect(projects) {
  projects.forEach((project) => {
    let newOption = `<option value=${project.title}>${project.title}</option>`
    $('.project-list').append(newOption)
  })
}

function displayProjects(projects) {
  projects.forEach((project) => {
    let newDisplay = `<h6>${project.title}</h6>`;
    $('.project-palette-list-container').append(newDisplay)
  })
}

function saveProjectToDb() {
  const projectName = $(".project-name-field").val()
  saveProject(projectName);
}
