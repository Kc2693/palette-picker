$( document ).ready(async function() {
    makeColorWheel();
    const projectList = await getProjects();
    fillProjectSelect(projectList);
    displayProjects(projectList);
});

$("#generate-new").click(function() {
  makeColorWheel();
})

$("#save-new-project").submit(async function(event) {
  event.preventDefault();
  await saveProjectToDb();
  displayNewProject();
  const projectList = await getProjects();
  resetProjectSelect();
  await fillProjectSelect(projectList);
})

$(".save-pal-form").submit(async function(event) {
  event.preventDefault();
  const palette = await makePaletteObject();
  savePalette(palette);
  displayProjects(projectList);
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

function makePaletteObject() {
  let palette = {};
  palette["title"] = $("#new-palette-name").val();
  palette["project_id"] = $('.project-list').val();

  for (let i=0; i<=4; i++) {
    palette["color" + i] = $("#d" + i).css("border-top-color")
  }
  return palette
}

function saveProjectToDb() {
  const projectName = $(".project-name-field").val()
  saveProject(projectName);
}

function fillProjectSelect(projects) {
  let defaultOption = `<option value="" disabled selected hidden>Save to project...</option>`;
  $('.project-list').append(defaultOption);

  projects.forEach((project) => {
    let newOption = `<option value=${project.id}>${project.title}</option>`;
    $('.project-list').append(newOption);
  })
}

function resetProjectSelect() {
  $('.project-list').empty();
}

async function displayProjects(projects) {
  const palettes = await getPalettes();
  const projectsDone = await projects.map((project) => {
    return (`
      <div class="project-divs">
        <h6 class="project-title">${project.title}</h6>
        <div>${makeProjectPalettes(palettes, project.id)}</div>
      </div>
      `)
  })
  $('.project-palette-list-container').append(projectsDone)
}

function makeProjectPalettes(palettes, projectId) {
  const projectPalettes = matchPaletteToProject(palettes, projectId);

  return projectPalettes.map((palette, i) => {
    let palColorsArr = paletteColorsArray(palette)
    let palColorElems = paletteColorsElements(palColorsArr)
    return(`
      <div class="palette-container id='c${palette.id}'">
        <h6 class="pal-title"> ${palette.title} </h6>
        ${palColorElems}
        <span class="delete-palette-btn">X</span>
      </div>
    `)
    }).join('')
}

function matchPaletteToProject(palettes, projectId) {
  const connected = palettes.filter((palette) => {
      if (projectId === palette.project_id) {
        return palette
      }
  })
  return connected;
}

function paletteColorsArray(palette) {
  let keys = Object.keys(palette)

  return keys.reduce((accu, key) => {
    if (key.includes('color')) {
    accu.push(palette[key])
    }
    return accu
  },[])
}

function paletteColorsElements(palColors) {
  return palColors.map((color) => {
    return(`
      <span class="pal-colors" style="background-color:${color}"></span>
      `)
  }).join('')
}

function displayNewProject() {
  let newProject = $('.project-name-field').val()
  let newDisplay = `<h6>${newProject}</h6>`;
  $('.project-palette-list-container').append(newDisplay)
}
