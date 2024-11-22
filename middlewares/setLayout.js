export default function setLayout(req, res, next) {
    const originalRender = res.render;
    
    res.render = function(view, options = {}) {
        const urlPath = req.originalUrl.split('/')[1];
        
        let layout;
        switch(urlPath) {
            case 'auth':
                layout = 'auth';
                break;
            case 'admin':
                layout = 'admin';
                break;
            default:
                layout = 'main';
        }
        
        if (!options.layout) {
            options.layout = layout;
        }

        console.log(options.layout);
        
        originalRender.call(this, view, options);
    };
    
    next();
}