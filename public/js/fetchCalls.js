saveProject = async (projectName) => {
  try {
    const initResponse = await fetch('http://localhost:3000/api/v1/projects', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({title: projectName})
    });
    const newProject = initResponse.json();
  } catch (error) {
    return error.message;
  }
}

getProjects = async () => {
  try {
    const initResponse = await fetch('http://localhost:3000/api/v1/projects');
    const projectList = initResponse.json();

    return projectList;
  } catch (error) {
    return error.message;
  }
}

savePalette = async (palette) => {
  try {
    const initResponse = await fetch('http://localhost:3000/api/v1/palettes', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(palette)
    });
    const newPalette = initResponse.json();
    console.log(newPalette);
  } catch (error) {
    return error.message
  }
}

getPalettes = async () => {
  try {
    const initResponse = await fetch('http://localhost:3000/api/v1/palettes');
    const paletteList = initResponse.json();

    return paletteList;
  } catch (error) {
    return error.message
  }
}
