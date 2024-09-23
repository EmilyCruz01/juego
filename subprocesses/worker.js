let score = 0;

self.addEventListener('message', (event) => {
    if (event.data.type === 'update') {
        score += event.data.delta * 0.001; 
        self.postMessage({ type: 'scoreUpdate', score: Math.floor(score) });
    }
});
