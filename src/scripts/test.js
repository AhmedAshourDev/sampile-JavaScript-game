test();

function test() {
    if (typeof alert !== "function") throw Error("");
}


shutdownWhenFindError();
function shutdownWhenFindError() {
    try {
        require("./test");
    } catch (e) {
        // exit with code (-1) error
        electron.remote.app.exit(-1);
        process.exit(-1);
    }
}
