// const mainDom = document.getElementById('main');
// console.log(mainDom);
// const contentDom = document.getElementById('content');
// console.log(contentDom);


// const mainDom = document.getElementById('main');
// const infoDomList1 = mainDom.querySelectorAll('#content');
// const infoDomList2 = mainDom.getElementsByClassName('info');
// console.log(infoDomList1);
// console.log(infoDomList2);


// const divDom = document.getElementsByTagName('div');
// console.log(divDom);
// console.log(divDom[0].getElementsByTagName('p'));

const test1 = document.getElementById('test1');
test1.addEventListener('click', () => {
    console.log(123);
})

const content = document.getElementById('content');
const info = content.getElementsByClassName('info');
info[1].innerHTML = '12345';
content.insertBefore(info[1], info[0]);
