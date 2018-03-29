setTimeout(() => {
    console.log("la0");
    new Promise(function(resolve, reject) {
        resolve('1')
    }).then((data) => {
        console.log(data);
    });
    new Promise(function(resolve, reject) {
        resolve('2')
    }).then((data) => {
        console.log(data);
    });
});

setTimeout(() => {
    console.log('la1');
    new Promise(function(resolve, reject) {
        resolve('3')
    }).then((data) => {
        console.log(data);
    });
    new Promise(function(resolve, reject) {
        resolve('4')
    }).then((data) => {
        console.log(data);
    });
});
