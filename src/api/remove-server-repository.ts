const removeServerRepository = (id: string) =>
  fetch(`http://localhost:8080/repo/${id}`, { method: 'DELETE' });

export default removeServerRepository;
