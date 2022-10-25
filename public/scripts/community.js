function createCommunity(fields) {
    fetch('/api/communities', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }

function deleteCommunity(fields) {
  fetch(`/api/communities/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse)
}