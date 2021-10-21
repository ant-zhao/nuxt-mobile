export default ({ app }) => {
    app.router.afterEach((to, from) => {
        if(process.browser) {
            // chrome
            document.body.scrollTop = 0;
            // firefox
            document.documentElement.scrollTop = 0;
            // safari
            window.pageYOffset = 0;
        }
    });
};
