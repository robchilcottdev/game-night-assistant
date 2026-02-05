import * as ApiService from './api-service.js';

document.getElementById('get-scripts-btn').onclick = async () => {
    const status = document.getElementById('status');
    const selectList = document.getElementById('select-list');

    status.innerText = "Processing...";

    const response = await ApiService.getScripts();

    if (response.error) return status.innerText = `${response.error}`;

    status.innerText = "OK";

    selectList.innerHTML = "";
    for (const script of response) {
        selectList.innerHTML += `<option value='${script.entity_id}'>${script.attributes.friendly_name}</option>`;
    }
};

document.getElementById('run-script-btn').onclick = async () => {
    const entity_id = document.getElementById('select-list').value;
    const response = await ApiService.runScript(entity_id);
    document.getElementById('status').innerText = response;
};