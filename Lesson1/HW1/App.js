// -Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
// -створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ,
// відповідно перший - onlineUsers, другий - inPersonUsers;
// -створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
// але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
// -напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.

const path = require('path');
const fs = require('fs');

const onlineUsers = [
    {name: "Andrii", age: 22, city: "Lviv"},
    {name: "Bogdan", age: 32, city: "Kyiv"},
    {name: "Roman", age: 28, city: "Odesa"}
];
const inPersonUsers = [
    {name: "Oleg", age: 23, city: "Rivne"},
    {name: "Sasha", age: 45, city: "Lutsk"},
    {name: "Marta", age: 55, city: "Kharkiv"}
];


const arrayToString = (array) => {
    return array.map(
        function (el) {
            let arr = [];
            for (const property in el) {
                arr.push(`${property}: ${el[property]}`);
            }
            return arr.join('\n')
        }
    ).join('\n')
};

fs.mkdir(path.join(__dirname, 'main'), (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.mkdir(path.join(__dirname, 'main', 'online'), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.writeFile(path.join(__dirname, 'main', 'online', 'fileOnline.txt'), arrayToString(onlineUsers), (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    })
    fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'fileInperson.txt'), arrayToString(inPersonUsers), (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        })
    })
})

// const swapData = (pathFrom, pathTo) => {
//     fs.readFile(pathFrom, "utf-8", ((err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.writeFile(pathTo, data, err => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//         })
//     }))
// };
//
// swapData(path.join(__dirname,'main','online','fileOnline.txt'),
//     path.join(__dirname,'main','inPerson','fileInperson.txt') )
// swapData(path.join(__dirname,'main','inPerson','fileInperson.txt'),
//     path.join(__dirname,'main','online','fileOnline.txt') )