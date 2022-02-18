const path = require('path')
const fs = require('fs')

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл,
//     в вас вийде невеликий callback hell,
// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//     старий файл видаліть після того як все завершиться. Також вийде callback hell
//
// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать -
// це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки,
//     вам потрібно їх перейменувати і додати до назви префікс _new


// fs.writeFile(path.join(__dirname, 'file.txt'), 'Some Data', (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.readFile(path.join(__dirname, 'file.txt'), (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.writeFile(path.join(__dirname, 'file2.txt'), data, (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//     })})});




// fs.writeFile(path.join(__dirname, 'file3.txt'), 'Some Data3', (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.readFile(path.join(__dirname, 'file3.txt'), 'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.mkdir(path.join(__dirname, 'New_Dir'), (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             fs.writeFile(path.join(__dirname, 'New_Dir', 'file4.txt'), data, (err) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 fs.unlink(path.join(__dirname, 'file3.txt'), (err) => {
//                     if (err) {
//                         console.log(err);
//                         throw err;
//                     }
//                 })
//             })
//         })
//     })
// })



// fs.mkdir(path.join(__dirname, 'Dir1'), (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.mkdir(path.join(__dirname, 'Dir1', 'Dir11'), (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
//     fs.mkdir(path.join(__dirname, 'Dir1', 'Dir12'), (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
//     fs.writeFile(path.join(__dirname, 'Dir1', 'file.txt'), 'Some Data', (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
//
// })


const funcCheck = (Path) => {
    fs.readdir(Path, (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        data.forEach(value => {
            if(value.includes('.txt')){
                fs.truncate(path.join(`${Path}`,`${value}`),(err)=>{
                    if(err){
                        console.log(err)
                        throw err
                    }
                })
            }else {
                fs.rename(path.join(`${Path}`,`${value}`),path.join(`${Path}`,`_new${value}`),(err)=>{
                    if(err){
                        console.log(err)
                        throw err
                    }
                })
            }

        })

    })
}
funcCheck(path.join(__dirname, 'Dir1'))