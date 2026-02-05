export const getScripts = async () => {
    try {
        const response = await fetch('./api/get-states', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
            const json = await response.json();
            return json.filter(entity => entity.entity_id.startsWith('script.'));
                        
        } else {
            if (response.status === 404) return { error: `404 - not found` };
            const errBody = await response.json();
            return { error: `Error: ${response.status} - ${errBody.error || 'Check Add-on Logs'}` };
        }
    } catch (err) {
        return { error: `Fatal: Could not reach backend` };
    }
}

export const runScript = async (entity_id) => {
    try {
        const response = await fetch('./api/run-script', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity_id })
        });

        if (response.status === 200) {
            return await response.json();           
        } else {
            if (response.status === 404) return { error: `404 - not found` };
            const errBody = await response.json();
            return { error: `Error: ${response.status} - ${errBody.error || 'Check Add-on Logs'}` };
        }
    } catch (err) {
        return { error: `Fatal: Could not reach backend` };
    }
}