import { promises as fs } from 'fs';

//tasks 1,2
const jsonPath = 'data.json';

const users =[
    {name: 'Mike', age: 25},
    {name: 'Bob', age: 32},
    {name: 'Nikola', age: 17},
];

const data = JSON.stringify(users);

fs.writeFile(jsonPath, data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});


//tasks 3,4
async function updateData() {
    try {
        const readData = await fs.readFile(jsonPath);
    
        const parsedData = JSON.parse(readData);
        console.log(parsedData);
        const fileExists = await isExist(jsonPath);
        if (fileExists) {
            console.log(`File ${jsonPath} exist`)
        }else{
        console.error(`File ${jsonPath} does not exist`);
        };

        const newData = [
            {name: 'Anna', age: 24},
            {name: 'Tom', age: 52},
        ];
        parsedData.push(...newData);    

        const newJson = JSON.stringify(parsedData);

        await fs.writeFile(jsonPath, newJson);

        console.log('Data was update in file');
    } catch (err) {
        console.error(err);
    }
};

updateData();

//task 5

async function isExist(jsonPath) {
    try {
        await fs.stat(jsonPath);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
        return false;
        } else {
        throw err;
        }
    }
};