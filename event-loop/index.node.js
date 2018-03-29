const fs = require('fs');
(() => {
    setTimeout(() => {
        console.log(1);
        // setTimeout(() => {
        //     console.log(1);
        // });
        process.nextTick(() => {
            console.log(11);
        });
    });
    setImmediate(() => {
        console.log(2);
        process.nextTick(() => {
            console.log(22);
        });
    });
    setImmediate(() => {
        console.log(3);
        process.nextTick(() => {
            console.log(33);
        });
    });
    setImmediate(() => {
        console.log(4);
        Promise.resolve().then(() => {
            console.log(5);
            Promise.resolve().then(() => {
                console.log(5);
                Promise.resolve().then(() => {
                    console.log(5)
                });
            });
        });
        setImmediate(() => {
            console.log(6);
            process.nextTick(() => {
                console.log(66);
            });
        });
        process.nextTick(() => {
            console.log(44);
        });
    });
    // process.nextTick(() => {
    //     console.log(3);
    //     // process.nextTick(() => {
    //     //     console.log(33);
    //     // })
    // });
    // Promise.resolve().then(() => {
    //     console.log(4);
    //     Promise.resolve().then(() => {
    //         console.log(4);
    //         Promise.resolve().then(() => {
    //             console.log(4)
    //         });
    //     });
    // });
    // fs.readFile('./index.js', () => {
    //     setTimeout(() => console.log(1));
    //     setImmediate(() => console.log(2));
    //     process.nextTick(() => {
    //         console.log(33);
    //     });
    // });
})()
