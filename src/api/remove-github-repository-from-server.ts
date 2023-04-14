const removeGithubRepositoryFromServer = (id: number) =>
  fetch(`http://localhost:8080/repo/${id}`, {
    method: 'DELETE',
  });

export default removeGithubRepositoryFromServer;
