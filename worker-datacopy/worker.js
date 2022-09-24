self.addEventListener('message', function (event) {
    if (event.data === 'ready') {
        this.postMessage('ready');
    } else {
        this.postMessage(event.data);
    }
});

// Uncaught DOMException: Failed to construct 'Worker': Script at 'file:///Users/hgsgtk/src/github.com/hgsgtk/js-snippets/worker-datacopy/worker.js' cannot be accessed from origin 'null'.