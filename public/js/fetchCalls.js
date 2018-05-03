saveProject = async (projectName) => {
  try {
    const initResponse = await fetch('http://localhost:3000/api/v1/projects', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({title: projectName})
    });
    const newProject = initResponse.json();
  } catch (err) {
    return err.message;
  }
}

getProjects = async () => {
  try {
    const initResponse = await fetch('http://localhost:3000/api/v1/projects');
    const projectList = initResponse.json();

    return projectList;
  } catch {
    return err.message;
  }
}
